import React from "react";
import { muligeSvar } from "./utils/timeUtils";
import SvarNei from "./SvarNei";
import SvarSnart from "./SvarSnart";
import SvarJa from "./SvarJa";
import { tekst } from "./utils/tekst";

const Svar = ({ erDetFagtorsdag }) => (
  <div className="answer">{finnSvar(erDetFagtorsdag)}</div>
);

const finnSvar = (erDetFagtorsdag) => {
  switch (erDetFagtorsdag) {
    case muligeSvar.NEI:
      return <SvarNei />;
    case muligeSvar.OVER:
      return <SvarNei annenTekst={tekst.over} />;
    case muligeSvar.SNART:
      return <SvarSnart />;
    case muligeSvar.JA:
      return <SvarJa />;
    default:
      return null;
  }
};

export default Svar;
