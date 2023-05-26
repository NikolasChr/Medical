import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import "survey-react/survey.css";
import SurveyComponentIADL from "./pages/PageIADL/IADL";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <HomePage />
    </Router>
  );
};

export default App;
