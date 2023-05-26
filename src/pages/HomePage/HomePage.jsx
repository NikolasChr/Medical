import { React, useState } from "react";
import SurveyComponentIADL from "../PageIADL/IADL";
import SurveyComponentADL from "../PageADL/ADL";
import SurveyComponentCIRS_G from "../PageCIRS-G/CIRS_G";
import "./HomePage.scss";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const surveyJsonADL = {
    elements: [
      {
        type: "matrix",
        name: "ADL",
        title: "Activities of Daily Living (ADL)",
        columns: ["P1", "P0"],
        rows: [
          {
            value: "bathing",
            text: "BATHING",
          },
          {
            value: "dressing",
            text: "DRESSING",
          },
          {
            value: "toileting",
            text: "TOILETING",
          },
          {
            value: "transferring",
            text: "TRANSFERRING",
          },
          {
            value: "continence",
            text: "CONTINENCE",
          },
          {
            value: "feeding",
            text: "FEEDING",
          },
        ],
        cells: {
          bathing: {
            P1: "(1 POINT) Bathes self completely or needs help in bathing only a single part of the body such as the back, genital area or disabled extremity.",
            P0: "(0 POINTS) Need help with bathing more than one part of the body,getting in or out of the tub or shower. Requires total bathing",
          },
          dressing: {
            P1: "(1 POINT) Get clothes from closets and drawers and puts on clothes and outer garments complete with fasteners. May have help tying shoes.",
            P0: "(0 POINTS) Needs help with dressing self or needs to be completely dressed.",
          },
          toileting: {
            P1: "(1 POINT) Goes to toilet, gets on and off, arranges clothes, cleans genital area without help.",
            P0: "(0 POINTS) Needs help transferring to the toilet, cleaning self or uses bedpan or commode.",
          },
          transferring: {
            P1: "(1 POINT) Moves in and out of bed or chair unassisted. Mechanical transfer aids are acceptable",
            P0: "(0 POINTS) Needs help in moving from bed to chair or requires acomplete transfer",
          },
          continence: {
            P1: "(1 POINT) Exercises complete self control over urination and defecation.",
            P0: "(0 POINTS) Is partially or totally incontinent of bowel or bladder",
          },
          feeding: {
            P1: "(1 POINT) Gets food from plate into mouth without help. Preparation of food may be done by another person.",
            P0: "(0 POINTS) Needs partial or total help with feeding or requires parenteral feeding.",
          },
        },
        validators: [
          {
            type: "expression",
            text: "Please provide an answer to the Bathing question !",
            expression: "{ADL.bathing} notempty",
            questions: ["bathing"],
          },
          {
            type: "expression",
            text: "Please provide an answer to the Dressing question !",
            expression: "{ADL.dressing} notempty",
            questions: ["dressing"],
          },
          {
            type: "expression",
            text: "Please provide an answer to the Toileting question !",
            expression: "{ADL.toileting} notempty",
            questions: ["toileting"],
          },
          {
            type: "expression",
            text: "Please provide an answer to the Transferring question !",
            expression: "{ADL.transferring} notempty",
            questions: ["transferring"],
          },
          {
            type: "expression",
            text: "Please provide an answer to the Continence question !",
            expression: "{ADL.continence} notempty",
            questions: ["continence"],
          },
          {
            type: "expression",
            text: "Please provide an answer to the Feeding question !",
            expression: "{ADL.feeding} notempty",
            questions: ["feeding"],
          },
        ],
      },
    ],
  };
  const surveyJsonIADL = {
    pages: [
      {
        name: "IADL Scores",
        elements: [
          {
            type: "radiogroup",
            name: "telephone",
            title: "TELEPHONE",
            choices: [
              "Operates telephone on own initiative-looks up and dials numbers",
              "Dials a few well-known numbers",
              "Answers telephone but does not dial",
              "Does not use telephone at all",
            ],
            validators: [
              {
                type: "expression",
                expression: "{telephone} notempty",
                text: "Please select an option for TELEPHONE !",
              },
            ],
          },
          {
            type: "radiogroup",
            name: "shopping",
            title: "SHOPPING",
            choices: [
              "Takes care of all shopping needs independently",
              "Shops independently for small purchases",
              "Needs to be accompanied on any shopping trip",
              "Completely unable to shop",
            ],
            validators: [
              {
                type: "expression",
                expression: "{shopping} notempty",
                text: "Please select an option for SHOPPING !",
              },
            ],
          },
          {
            type: "radiogroup",
            name: "foodpreparation",
            title: "FOOD PREPARATION",
            choices: [
              "Plans, prepares and serves adequate meals independently",
              "Prepares adequate meals if supplied with ingredients",
              "Heats, serves and prepares meals, but does not maintain adequate diet",
              "Needs to have meals prepared and served",
            ],
            validators: [
              {
                type: "expression",
                expression: "{foodpreparation} notempty",
                text: "Please select an option for FOOD PREPARATION !",
              },
            ],
          },
          {
            type: "radiogroup",
            name: "housekeeping",
            title: "HOUSEKEEPING",
            choices: [
              "Maintains house alone or with occasional assistance with heavy work",
              "Performs light daily tasks such as dish washing, bed making",
              "Performs light daily tasks but cannot maintain acceptable level of cleanliness",
              "Needs help with all home maintenance tasks",
              "Does not participate in any housekeeping tasks",
            ],
            validators: [
              {
                type: "expression",
                expression: "{housekeeping} notempty",
                text: "Please select an option for HOUSEKEEPING !",
              },
            ],
          },
          {
            type: "radiogroup",
            name: "laundry",
            title: "LAUNDRY",
            choices: [
              "Does personal laundry completely",
              "Launders small items-rinses stockings, etc",
              "All laundry must be done by others",
            ],
            validators: [
              {
                type: "expression",
                expression: "{laundry} notempty",
                text: "Please select an option for LAUNDRY !",
              },
            ],
          },
          {
            type: "radiogroup",
            name: "transportation",
            title: "TRANSPORTATION",
            choices: [
              "Travels independently on public transportation or drives own car",
              "Arranges own travel via taxi, but does not otherwise use public transportation",
              "Travels on public transportation when accompanied by another",
              "Travel limited to taxi or automobile with assistance of another",
              "Does not travel at all",
            ],
            validators: [
              {
                type: "expression",
                expression: "{transportation} notempty",
                text: "Please select an option for TRANSPORTATION !",
              },
            ],
          },
          {
            type: "radiogroup",
            name: "drugs",
            title: "DRUGS",
            choices: [
              "Is responsible for taking medication in correct dosages at correct time",
              "Takes responsibility if medication is prepared in advance in separate dosage",
              "Is not capable of dispensing own medication",
            ],
            validators: [
              {
                type: "expression",
                expression: "{drugs} notempty",
                text: "Please select an option for DRUGS !",
              },
            ],
          },
          {
            type: "radiogroup",
            name: "finances",
            title: "FINANCES",
            choices: [
              "Manages financial matters independently, collects and keeps track of income",
              "Manages day-to-day purchases, but needs help with banking, major purchases, etc.",
              "Incapable of handling money",
            ],
            validators: [
              {
                type: "expression",
                expression: "{finances} notempty",
                text: "Please select an option for FINANCES !",
              },
            ],
          },
        ],
      },
    ],
  };

  const surveyJsonCIRSG = {
    pages: [
      {
        name: "page1",
        elements: [
          {
            type: "matrix",
            name: "cirs-g",
            title: "CIRS-G Score",
            columns: [
              {
                value: 0,
                text: "0: None",
              },
              {
                value: 1,
                text: "1: Mild",
              },
              {
                value: 2,
                text: "2: Moderate",
              },
              {
                value: 3,
                text: "3: Severe",
              },
              {
                value: 4,
                text: "4: Extremely Severe",
              },
            ],
            rows: [
              {
                value: "heart",
                text: "Heart",
              },
              {
                value: "vascular",
                text: "Vascular",
              },
              {
                value: "hematopoietic",
                text: "Hematopoietic",
              },
              {
                value: "respiratory",
                text: "Respiratory",
              },
              {
                value: "eyes-ears-nose-throat-larynx",
                text: "Eyes, Ears, Nose, Throat and Larynx",
              },
              {
                value: "upper-gi",
                text: "Upper GI",
              },
              {
                value: "liver",
                text: "Liver",
              },
              {
                value: "renal",
                text: "Renal",
              },
              {
                value: "genitourinary",
                text: "Genitourinary",
              },
              {
                value: "musculoskeletal-integument",
                text: "Musculoskeletal / Integument",
              },
              {
                value: "neurological",
                text: "Neurological",
              },
              {
                value: "endocrine-metabolic-breast",
                text: "Endocrine / Metabolic and Breast",
              },
              {
                value: "psychiatric-illness",
                text: "Psychiatric illness",
              },
            ],
            validators: [
              {
                type: "expression",
                text: "Please provide an answer to all questions",
                expression:
                  "{cirs-g.heart} notempty && {cirs-g.psychiatric-illness} notempty && {cirs-g.neurological} notempty && {cirs-g.endocrine-metabolic-breast} notempty && {cirs-g.vascular} notempty && {cirs-g.hematopoietic} notempty && {cirs-g.musculoskeletal-integument} notempty && {cirs-g.genitourinary} notempty && {cirs-g.renal} notempty && {cirs-g.liver} notempty && {cirs-g.respiratory} notempty && {cirs-g.upper-gi} notempty && {cirs-g.eyes-ears-nose-throat-larynx} notempty",
              },
            ],
          },
        ],
      },
    ],
  };

  const renderSelectedOption = () => {
    switch (selectedOption) {
      case "adl":
        return (
          <SurveyComponentADL
            json={surveyJsonADL}
            setSelectedOption={setSelectedOption}
            setHeaderVisible={setHeaderVisible}
          />
        );
      case "iadl":
        return (
          <SurveyComponentIADL
            json={surveyJsonIADL}
            setSelectedOption={setSelectedOption}
            setHeaderVisible={setHeaderVisible}
          />
        );
      case "cirs_g":
        return (
          <SurveyComponentCIRS_G
            json={surveyJsonCIRSG}
            setSelectedOption={setSelectedOption}
            setHeaderVisible={setHeaderVisible}
          />
        );
      default:
        return null;
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setHeaderVisible(false);
  };
  return (
    <div className="form-section">
      <div className="form-container">
        {headerVisible && (
          <h1>Please select the test(s) you wish to complete.</h1>
        )}
        {selectedOption ? (
          <div className="option-card">{renderSelectedOption()}</div>
        ) : (
          <div className="options-container">
            <div className="option-card">
              <h2>ADL</h2>
              <p>(Activities of Daily Living)</p>
              <button onClick={() => handleOptionSelect("adl")}>
                Start ADL
              </button>
            </div>
            <div className="option-card">
              <h2>IADL</h2>
              <p>(Instrumental Activities of Daily Living)</p>
              <button onClick={() => handleOptionSelect("iadl")}>
                Start IADL
              </button>
            </div>
            <div className="option-card">
              <h2>CIRS-G</h2>
              <p>(Cumulative Illness Rating Scale for Geriatrics)</p>
              <button onClick={() => handleOptionSelect("cirs_g")}>
                Start CIRS-G
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
