import { Button } from "@material-ui/core";
import * as React from "react";

interface Props {
  headerText: string;
  isEditing: boolean;
  onEditingChange: () => void;
  onSave: () => void;
  children: React.ReactNode;
}

export function Section(props: Props): JSX.Element {
  return (
    <section className="content-section">
      <div className="section-header">
        <h2>{props.headerText}</h2>
        {props.isEditing ? (
          <div>
            <Button onClick={props.onEditingChange} className="cancel-button">
              Cancel
            </Button>
            <Button variant="contained" onClick={props.onSave} className="save-button">
              Save
            </Button>
          </div>
        ) : (
          <Button className="header-edit-button" onClick={props.onEditingChange}>
            Edit
          </Button>
        )}
      </div>
      {props.children}
    </section>
  );
}
