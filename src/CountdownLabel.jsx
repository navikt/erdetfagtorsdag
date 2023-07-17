import React from "react";

const CountdownLabel = ({ gjenståendeTid, label }) => (
  <div className="clock-container">
    <span className="days clock-label">{gjenståendeTid}</span>
    <div className="clock-small-text">{label}</div>
  </div>
);

export default CountdownLabel;
