import * as React from "react";

export function HoursOfOperation(): JSX.Element {
  return (
    <section className="content-section">
      <div className="section-header">
        <h2>Hours of Operation</h2>
        <button className="header-edit-button">Edit</button>
      </div>

      <p className="subheader">
        Manage standard hours of operations when providers are available to provide care. Patients will be informed if
        they submit an exam outside these hours
      </p>
      <table>
        <tbody>
          <tr>
            <td>Sunday</td>
            <td>CLOSED</td>
            <td></td>
          </tr>
          <tr>
            <td>Monday</td>
            <td>OPEN</td>
            <td>9:00am - 5:00pm</td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>OPEN</td>
            <td>9:00am - 5:00pm</td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>OPEN</td>
            <td>9:00am - 5:00pm</td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td>OPEN</td>
            <td>9:00am - 5:00pm</td>
          </tr>
          <tr>
            <td>Friday</td>
            <td>OPEN</td>
            <td>9:00am - 5:00pm</td>
          </tr>
          <tr>
            <td>Saturday</td>
            <td>CLOSED</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
