import { React, useRef, useState } from "react";
import { Survey } from "survey-react-ui";
import "./IADL.scss";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function SurveyComponentIADL(props) {
  const [visible, setVisible] = useState(true);
  const { json } = props;
  const componentRefIADL = useRef(null);
  const scale = 0.9;
  const maxWidthPercent = 95;
  const screenWidth = window.innerWidth;
  const maxWidth = (maxWidthPercent / 100) * screenWidth;

  const goBack = () => {
    props.setSelectedOption(null);
    props.setHeaderVisible(true);
  };

  const handlePrint = () => {
    html2canvas(componentRefIADL.current, {
      scale,
      width: maxWidth,
      height: componentRefIADL.current.offsetHeight + 200,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [275, 637],
      });
      pdf.addImage(imgData, "PNG", 6, 4);
      pdf.save("IADL_Form.pdf");
    });
    setVisible(false);
  };

  return (
    <div className="survey-container1" ref={componentRefIADL}>
      <div className="IADL">
        <h1>Instrumental Activities of Daily Living (IADL)</h1>
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
              <input type="date" />
            </div>
          </div>
          <p className="desc">
            For each category, choose the description that best describes the
            maximum performance (Only one answer can be ticked for each
            question).
          </p>
        </div>
      )}
      <Survey
        json={json}
        onComplete={handlePrint}
        completedHtml="<div><h1>Thank you for completing the IADL survey!</h1>  <h1>Your download has started.</h1> <h1>You can navigate back to complete more surveys.</h1></div>"
      />
      <div className="button_container">
        <button className="back" onClick={goBack}>
          Go Back
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="copyright">
        Source: Lawton MP and Brody EM: Assessment of older people:
        self-maintaining and instrumental activities of daily living.
        Gerontologist 9: 179–186, 1969. Copyright: Oxford University Press.
      </div>
    </div>
  );
}

export default SurveyComponentIADL;
