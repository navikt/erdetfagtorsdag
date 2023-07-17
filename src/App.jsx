import React, { useState, useEffect } from "react";
import Svar from "./Svar";
import { muligeSvar, erDetFagtorsdag } from "./utils/timeUtils";
import GjenståendeTid from "./GjenståendeTid";
import ConfettiGenerator from "confetti-js";

const confettiSettings = {
  max: "30",
  size: "1",
  animate: true,
  props: ["circle", "square", "triangle", "line"],
  colors: [
    [165, 104, 246],
    [230, 61, 135],
    [0, 199, 228],
    [253, 214, 126],
  ],
  clock: "30",
  rotate: true,
};

const App = () => {
  const [svar, setSvar] = useState(erDetFagtorsdag());

  useEffect(() => {
    const interval = setInterval(() => {
      setSvar(erDetFagtorsdag());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    return () => confetti.clear();
  }, []);

  const confettiErSynlig =
    svar.erDetFagtorsdag !== muligeSvar.JA ? "hiddenConfetti" : "";

  return (
    <div className="App">
      <canvas
        className={"confettiHolder " + confettiErSynlig}
        id="confetti-holder"
      />
      <header className="App-header">
        <Svar erDetFagtorsdag={svar.erDetFagtorsdag} />
        <GjenståendeTid svar={svar} />
      </header>
    </div>
  );
};

export default App;
