import * as React from "react";

export function Branding(): JSX.Element {
  return (
    <section className="content-section">
      <div className="section-header">
        <h2>Branding</h2>
        <button className="header-edit-button">Edit</button>
      </div>

      <p className="subheader">
        Set name, welcome page text, and other branding for your patients to see during an exam.
      </p>
      <h3>Display Name</h3>
      <p>
        Set how the organization name is displayed to patients. In instances with limited screen space (emails, mobile
        view), a shortened name is displayed
      </p>
      <div id="branding-container">
        <div className="branding-row">
          <p className="branding-row-question">Full Name</p>
          <p>Bright.md Hospital</p>
        </div>
        <div className="branding-row">
          <p className="branding-row-question">Short Name</p>
          <p>BMD</p>
        </div>
        <div className="branding-row">
          <p className="branding-row-question">Welcome Text</p>
          <p>Get a quick diagnosis for many medication conditions from your computer or mobile device</p>
        </div>
      </div>
    </section>
  );
}
