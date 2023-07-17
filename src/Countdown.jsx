import React from "react";
import {muligeSvar, padNumber} from "./utils/timeUtils";
import CountdownLabel from "./CountdownLabel";
import {tekst} from "./utils/tekst";

const Countdown = ({svar}) => {
    if (svar.erDetFagtorsdag === muligeSvar.JA) {
        return null;
    }

    return (
        <div className="countdown">
            {svar.gjenståendeTid.dager > 0 && (
                <CountdownLabel gjenståendeTid={svar.gjenståendeTid.dager} label={tekst.dager}/>
            )}

            <CountdownLabel
                gjenståendeTid={padNumber(svar.gjenståendeTid.timer)}
                label={tekst.timer}
            />
            <CountdownLabel
                gjenståendeTid={padNumber(svar.gjenståendeTid.minutter)}
                label={tekst.minutter}
            />
            <CountdownLabel
                gjenståendeTid={padNumber(svar.gjenståendeTid.sekunder)}
                label={tekst.sekunder}
            />
        </div>
    );
};

export default Countdown;
