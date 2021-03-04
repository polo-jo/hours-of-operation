import { Button, FormControlLabel, Switch } from "@material-ui/core";
import produce from "immer";
import * as React from "react";
// import "date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";

enum OpenStatus {
  OPEN = "Open",
  CLOSED = "Closed",
}

type DayOperationHours =
  | { status: OpenStatus.OPEN; hours: { startTime: Date; endTime: Date } }
  | { status: OpenStatus.CLOSED; hours: null };

enum Day {
  SUNDAY = "Sunday",
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
}

type DailyOperationsHours = Map<Day, DayOperationHours>;

const INITIAL_STATE: DailyOperationsHours = new Map([
  [Day.SUNDAY, { status: OpenStatus.CLOSED, hours: null }],
  [Day.MONDAY, { status: OpenStatus.CLOSED, hours: null }],
  [Day.TUESDAY, { status: OpenStatus.CLOSED, hours: null }],
  [Day.WEDNESDAY, { status: OpenStatus.CLOSED, hours: null }],
  [Day.THURSDAY, { status: OpenStatus.CLOSED, hours: null }],
  [Day.FRIDAY, { status: OpenStatus.CLOSED, hours: null }],
  [Day.SATURDAY, { status: OpenStatus.CLOSED, hours: null }],
]);

export function HoursOfOperation(): JSX.Element {
  const [isEditing, setIsEditing] = React.useState(false);
  const [dailyOperationsHoursPublished, setDailyOperationsHoursPublished] = React.useState<DailyOperationsHours>(
    INITIAL_STATE
  );
  const [dailyOperationsHoursDraft, setDailyOperationsHoursDraft] = React.useState<DailyOperationsHours>(
    dailyOperationsHoursPublished
  );

  function handleToggleEditing() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handlePublish() {
    setDailyOperationsHoursPublished(dailyOperationsHoursDraft);
    setIsEditing(false);
  }

  function renderDailyRangeRows(): Array<JSX.Element> {
    let rows = [];
    if (isEditing) {
      for (const [day, dayOperationHours] of dailyOperationsHoursDraft) {
        rows.push(
          <tr key={day}>
            <td>{day}</td>
            <td>
              <FormControlLabel
                control={
                  <Switch
                    checked={dayOperationHours.status === OpenStatus.OPEN}
                    name="isOpened"
                    color="primary"
                    onChange={() => {
                      setDailyOperationsHoursDraft(
                        produce(dailyOperationsHoursDraft, (draft) => {
                          const [startTime, endTime] = getInitialTimes();
                          draft.set(
                            day,
                            dayOperationHours.status === OpenStatus.OPEN
                              ? { status: OpenStatus.CLOSED, hours: null }
                              : { status: OpenStatus.OPEN, hours: { startTime, endTime } }
                          );
                        })
                      );
                    }}
                  />
                }
                label={dayOperationHours.status}
              />
            </td>
            {dayOperationHours.status === OpenStatus.OPEN ? (
              <td>
                <KeyboardTimePicker
                  label="start"
                  className="date-picker"
                  value={dayOperationHours.hours.startTime}
                  onChange={(date) => {
                    setDailyOperationsHoursDraft(
                      produce(dailyOperationsHoursDraft, (draft) => {
                        if (dayOperationHours.status === OpenStatus.OPEN) {
                          draft.set(day, {
                            ...dayOperationHours,
                            hours: { ...dayOperationHours.hours, startTime: date as Date },
                          });
                        }
                      })
                    );
                  }}
                />
                {/* <span>{"-"}</span> */}
                <KeyboardTimePicker
                  label="end"
                  className="date-picker"
                  value={dayOperationHours.hours.endTime}
                  onChange={(date) => {
                    setDailyOperationsHoursDraft(
                      produce(dailyOperationsHoursDraft, (draft) => {
                        if (dayOperationHours.status === OpenStatus.OPEN) {
                          draft.set(day, {
                            ...dayOperationHours,
                            hours: { ...dayOperationHours.hours, endTime: date as Date },
                          });
                        }
                      })
                    );
                  }}
                />
              </td>
            ) : (
              <td></td>
            )}
          </tr>
        );
      }
    } else {
      for (const [day, dayOperationHours] of dailyOperationsHoursPublished) {
        rows.push(
          <tr key={day}>
            <td>{day}</td>
            <td>{dayOperationHours.status}</td>
            {dayOperationHours.status === OpenStatus.OPEN ? (
              <td>
                {formatDate(dayOperationHours.hours.startTime)} - {formatDate(dayOperationHours.hours.endTime)}
              </td>
            ) : (
              <td></td>
            )}
          </tr>
        );
      }
    }
    return rows;
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <section className="content-section">
        <div className="section-header">
          <h2>Hours of Operation</h2>
          {isEditing ? (
            <div>
              <Button onClick={handleToggleEditing} className="cancel-button">
                Cancel
              </Button>
              <Button variant="contained" onClick={handlePublish} className="save-button">
                Save
              </Button>
            </div>
          ) : (
            <Button className="header-edit-button" onClick={handleToggleEditing}>
              Edit
            </Button>
          )}
        </div>

        <p className="subheader">
          Manage standard hours of operations when providers are available to provide care. Patients will be informed if
          they submit an exam outside these hours
        </p>
        <table>
          <tbody>{renderDailyRangeRows()}</tbody>
        </table>
      </section>
    </MuiPickersUtilsProvider>
  );
}

function getInitialTimes(): [Date, Date] {
  const startDate = new Date();
  startDate.setHours(9);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  const endDate = new Date();
  endDate.setHours(17);
  endDate.setMinutes(0);
  endDate.setSeconds(0);

  return [startDate, endDate];
}

function formatDate(date: Date) {
  return format(date, "p");
}
