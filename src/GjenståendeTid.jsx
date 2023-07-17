import React from "react";
import { muligeSvar } from "./utils/timeUtils";
import { tekst } from "./utils/tekst";
import Countdown from "./Countdown";

const GjenståendeTid = ({ svar }) => {
  return (
    <div className="timeLeft fade-in">
      {svarPreTekst(svar.erDetFagtorsdag)}
      <Countdown svar={svar} />
      {svarPostTekst(svar.erDetFagtorsdag)}
    </div>
  );
};

const svarPreTekst = (erDetFagtorsdag) => {
  switch (erDetFagtorsdag) {
    case muligeSvar.NEI:
      return <h3>{tekst.neiPre}</h3>;
    case muligeSvar.SNART:
      return <h3>{tekst.snartPre}</h3>;
    case muligeSvar.OVER:
      return <h3>{tekst.overPre}</h3>;
    case muligeSvar.JA:
      return null;
    default:
      return null;
  }
};

const svarPostTekst = (erDetFagtorsdag) => {
  switch (erDetFagtorsdag) {
    case muligeSvar.NEI:
      return <h3>{tekst.neiPost}</h3>;
    case muligeSvar.SNART:
      return <h3>{tekst.snartPost}</h3>;
    case muligeSvar.OVER:
      return <h3>{tekst.overPost}</h3>;
    case muligeSvar.JA:
      return null;
    default:
      return null;
  }
};

export default GjenståendeTid;
