import * as React from "react";
import { Section } from "./components/section";

type DetailsState = {
  fullName: string;
  shortName: string;
  welcomeText: string;
};

const INITIAL_STATE: DetailsState = {
  fullName: "Bright.md Hospital",
  shortName: "BMD",
  welcomeText: "Get a quick diagnosis for many medication conditions from your computer or mobile device",
};

export function Branding(): JSX.Element {
  const [isEditing, setIsEditing] = React.useState(false);
  const [publishedDetails, setPublishedDetails] = React.useState<DetailsState>(INITIAL_STATE);
  const [draftDetails, setDraftDetails] = React.useState<DetailsState>(INITIAL_STATE);

  function handleToggleEditing() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handlePublish() {
    setPublishedDetails(draftDetails);
    setIsEditing(false);
  }

  function handleChangeFullName(event: React.ChangeEvent<HTMLInputElement>) {
    setDraftDetails({ ...draftDetails, fullName: event.target.value });
  }
  function handleChangeShortName(event: React.ChangeEvent<HTMLInputElement>) {
    setDraftDetails({ ...draftDetails, shortName: event.target.value });
  }
  function handleChangeWelcomeText(event: React.ChangeEvent<HTMLInputElement>) {
    setDraftDetails({ ...draftDetails, welcomeText: event.target.value });
  }

  return (
    <Section isEditing={isEditing} headerText="Branding" onEditingChange={handleToggleEditing} onSave={handlePublish}>
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
          {isEditing ? (
            <input
              type="text"
              className="text-field"
              value={draftDetails.fullName}
              name="full name"
              id="full-name"
              onChange={handleChangeFullName}
            />
          ) : (
            <p>{publishedDetails.fullName}</p>
          )}
        </div>
        <div className="branding-row">
          <p className="branding-row-question">Short Name</p>
          {isEditing ? (
            <input
              type="text"
              className="text-field"
              name="short name"
              id="short-name"
              value={draftDetails.shortName}
              onChange={handleChangeShortName}
            />
          ) : (
            <p>{publishedDetails.shortName}</p>
          )}
        </div>
        <div className="branding-row">
          <p className="branding-row-question">Welcome Text</p>
          {isEditing ? (
            <input
              type="text"
              className="text-field"
              name="welcome text"
              id="welcome-text"
              value={draftDetails.welcomeText}
              onChange={handleChangeWelcomeText}
            />
          ) : (
            <p>{publishedDetails.welcomeText}</p>
          )}
        </div>
      </div>
    </Section>
  );
}
