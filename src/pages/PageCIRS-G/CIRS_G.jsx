import { React, useRef, useState, useEffect } from "react";
import { Survey } from "survey-react-ui";
import "./CIRS_G.scss";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function SurveyComponentCIRS_G(props) {
  const [completionDate, setCompletionDate] = useState("");
  const [complete, setComplete] = useState(false);
  const { json } = props;
  const componentRefCIRS = useRef(null);
  const [visible, setVisible] = useState(true);

  const [categoriesEndorsed, setCategoriesEndorsed] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const severity = totalScore / categoriesEndorsed;

  const [numLevel2, setNumLevel2] = useState(0);
  const [numLevel3, setNumLevel3] = useState(0);
  const [numLevel4, setNumLevel4] = useState(0);

  const goBack = () => {
    props.setSelectedOption(null);
    props.setHeaderVisible(true);
  };

  const handlePrint = () => {
    setComplete(false);
    html2canvas(componentRefCIRS.current, {
      scale: Math.min(1, 1350 / componentRefCIRS.current.offsetWidth),
      width: 1500,
      height: componentRefCIRS.current.offsetHeight + 10,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [370, 600],
      });
      pdf.addImage(imgData, "PNG", 6, 4);
      pdf.save("CIRS-G_Form.pdf");
    });
    setVisible(false);
  };

  const handleValueChange = (event) => {
    const responses = event.valuesHash;
    const categoriesEnd = countCategoriesEndorsed(responses);
    const scoreTotal = countTotalScore(responses);
    const score2 = countLevel2(responses);
    const score3 = countLevel3(responses);
    const score4 = countLevel4(responses);
    setCategoriesEndorsed(categoriesEnd);
    setTotalScore(scoreTotal);
    setNumLevel2(score2);
    setNumLevel3(score3);
    setNumLevel4(score4);
    setComplete(true);
  };

  const countCategoriesEndorsed = (responses) => {
    let score = 0;
    for (const [question, answer] of Object.entries(responses)) {
      for (const [q, a] of Object.entries(answer)) {
        if (a !== 0) {
          score++;
        }
      }
    }
    return score;
  };

  const countTotalScore = (responses) => {
    let score = 0;
    for (const [question, answer] of Object.entries(responses)) {
      for (const [q, a] of Object.entries(answer)) {
        score += a;
      }
    }
    return score;
  };

  const countLevel2 = (responses) => {
    let score = 0;
    for (const [question, answer] of Object.entries(responses)) {
      for (const [q, a] of Object.entries(answer)) {
        if (a === 2) {
          score++;
        }
      }
    }
    return score;
  };
  const countLevel3 = (responses) => {
    let score = 0;
    for (const [question, answer] of Object.entries(responses)) {
      for (const [q, a] of Object.entries(answer)) {
        if (a === 3) {
          score++;
        }
      }
    }
    return score;
  };

  const countLevel4 = (responses) => {
    let score = 0;
    for (const [question, answer] of Object.entries(responses)) {
      for (const [q, a] of Object.entries(answer)) {
        if (a === 4) {
          score++;
        }
      }
    }
    return score;
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setCompletionDate(currentDate);
  })

  return (
    <div className="survey-container2" ref={componentRefCIRS}>
      <div className="CIRS-G">
        <h1>Cumulative Illness Rating Scale for Geriatrics (CIRS-G)</h1>
      </div>
      {visible && (
        <div className="intro">
          <div className="patient">
            <div className="id">
              <p>
                {" "}
                Fill in the patient ID or leave blank and place patient ID label
                here after printing:
              </p>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="date">
              <p>Signature:</p>
              <textarea cols="30" rows="5" />
              <p>Date of completion:</p>
              <input id="completionDate" type="date" defaultValue={completionDate}/>
            </div>
          </div>
         <div className="strategytitle">
           <h1>Rating Strategy:</h1>
           </div>
          <div className="strategy">
         
            <br />
            <br />
            <span>0 - No problem</span>
            <span>1 - Current mild problem or spanast significant problem</span>
            <span>
              2 - Moderate disability or morbidity / requires first line therapy
            </span>
            <span>
              3 - Severe / Constant significant disability / uncontrollable
              chronic problems
            </span>
            <span>
              4 - Extremely severe / immediate treatment required / end organ
              failure / severe impairment in function
            </span>
          </div>
          <h1 className="instructions">Instructions:</h1>
          <p className="desc">
            For each category, choose the description that best describes the
            maximum performance (Only one answer can be ticked for each
            question).
          </p>
        </div>
      )}
      <div className="surveydiv">
        <Survey
          json={json}
          onComplete={handlePrint}
          onValueChanged={handleValueChange}
          completedHtml="<div><h1>Thank you for completing the CIRS-G survey!</h1> </br> <h1>Your download has started.</h1> </br><h1>You can navigate back to complete more surveys.</h1></div>"
        />
      </div>
      <div className="button_container">
        <button className="back" onClick={goBack}>
          Go Back
        </button>
      </div>
      {complete && (
        <div className="results">
          <table className="ResultsCIRSG">
            <thead>
              <tr className="tablerow">
                <th>
                  <h1>Results</h1>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="tablerow">
                <td>Total number of categories endorsed:</td>
                <td>
                  <div className="row">{categoriesEndorsed}</div>
                </td>
              </tr>
              <tr className="tablerow">
                <td>Total Score:</td>
                <td>
                  <div className="row">{totalScore}</div>
                </td>
              </tr>
              <tr className="tablerow">
                <td>
                  Severity index (total score / total number of categories
                  endorsed):
                </td>
                <td>
                  <div className="row">{severity.toFixed(2)}</div>
                </td>
              </tr>
              <tr className="tablerow">
                <td>Number of categories at level 2 severity:</td>
                <td>
                  <div className="row">{numLevel2}</div>
                </td>
              </tr>
              <tr className="tablerow">
                <td>Number of categories at level 3 severity:</td>
                <td>
                  <div className="row">{numLevel3}</div>
                </td>
              </tr>
              <tr className="tablerow">
                <td>Number of categories at level 4 severity:</td>
                <td>
                  <div className="row">{numLevel4}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <div className="copyright">
        Reprinted from: Cumulative Illness Rating Scale-Geriatric. Miller et
        al., Psychiatry Res, 41,237-48, 1992. Copyright 1992, with permission
        from Elsevier.
      </div>
    </div>
  );
}

export default SurveyComponentCIRS_G;
