import * as React from "react";
import "./App.css";
import { Branding } from "./branding";
import { HoursOfOperation } from "./hours-of-operation";

export function App(): JSX.Element {
  return (
    <div id="app-container">
      <HoursOfOperation />
      <Branding />
    </div>
  );
}
