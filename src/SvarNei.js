import React from "react";
import {tekst} from "./utils/tekst";

const SvarNei = ({annenTekst}) => <h1 className="no fade-in">{annenTekst ? annenTekst : tekst.nei}</h1>;

export default SvarNei;
