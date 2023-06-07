import { React, useState, useRef, useEffect } from "react";
import { Survey } from "survey-react-ui";
import "./ADL.scss";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function SurveyComponentADL(props) {

  const [completionDate, setCompletionDate] = useState("");
  const score_dict = { P1: 1, P0: 0 };
  const { json } = props;
  const [finalscore, setFinalscore] = useState(null);
  const [visible, setVisible] = useState(true);
  const componentRefADL = useRef(null);
  const scale = 0.9;
  const maxWidthPercent = 95;
  const screenWidth = window.innerWidth;
  const maxWidth = (maxWidthPercent / 100) * screenWidth;

  const handleChange = (event) => {
    const responses = event.valuesHash;
    const score = calculateScore(responses);
    setFinalscore(score);
  };

  function calculateScore(responses) {
    let score = 0;
    for (const [question, answer] of Object.entries(responses)) {
      for (const [q, a] of Object.entries(answer)) {
        score += score_dict[a];
      }
    }
    return score;
  }

  const goBack = () => {
    props.setSelectedOption(null);
    props.setHeaderVisible(true);
  };

  const handlePrint = () => {
    html2canvas(componentRefADL.current, {
      scale,
      width: maxWidth,
      height: componentRefADL.current.offsetHeight + 200,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [275, 457],
      });
      pdf.addImage(imgData, "PNG", 6, 4);
      pdf.save("ADL_Form.pdf");
    });
    setFinalscore(null);
    setVisible(false);
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setCompletionDate(currentDate);
  })

  return (
    <div className="survey-container" ref={componentRefADL}>
      <div className="ADL">
        <h1>Activities of Daily Living (ADL)</h1>
      </div>
      {visible && (
        <div className="intro">
          <div className="patient">
            <div className="id">
              <p>
                Fill in the patient ID or leave blank and place patient ID label
                here after printing:
              </p>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="date">
              <p>Signature:</p>
              <textarea cols="30" rows="5" />
              <p>Date of completion:</p>

              <input id="completionDate" type="date"  defaultValue={completionDate}/>
              
            </div>
          </div>

          <h2 className="header">
            For each category, choose the description that best describes the
            maximum functional performance (either 0 or 1)
          </h2>
          <br />
          <div className="ADL-form">
            <div className="bar"></div>
            <div className="titles">
              <div className="title">
                <p>Activities</p>
                <h4>Points (0 or 1)</h4>
              </div>
              <div className="title">
                <p>Independence</p>
                <h4>
                  (1 point) NO supervision, direction or personal assisstance
                </h4>
              </div>
              <div className="title">
                <p>Dependence</p>
                <h4>
                  (0 points) WITH supervision, direction or personal assisstance
                  or total care
                </h4>
              </div>
            </div>
            <div className="smallbar"></div>
          </div>
        </div>
      )}
      <Survey
        json={json}
        onValueChanged={handleChange}
        onComplete={handlePrint}
        completedHtml="<div><h1>Thank you for completing the ADL survey!</h1> </br><h1>Your download has started.</h1> </br><h1>You can navigate back to complete more surveys.</h1></div>"
      />
      <div className="button_container">
        <button className="back" onClick={goBack}>
          Go Back
        </button>
      </div>
      {finalscore !== null && (
        <div className="scores">
          <div className="totalScore">Total Score: {finalscore} / 6</div>
          <div className="values">
            <p>6 = High (Patient independent)</p>
            <p>0 = Low (Patient very dependent)</p>
          </div>
        </div>
      )}

      <br />
      <br />
      <br />
      <br />
      <div className="copyright">
        Quelle: Katz S, Ford AB, Moskowitz RW, Jackson BA and Jaffe MW: Studies
        of Illness in the Aged: The Index of ADL: A Standardized Measure of
        Biological and Psychosocial Function. JAMA 185: 914–919, 1963. Copyright
        1963, American Medical Association
      </div>
    </div>
  );
}

export default SurveyComponentADL;
