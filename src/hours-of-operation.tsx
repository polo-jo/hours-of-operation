import DateFnsUtils from "@date-io/date-fns";
import { FormControlLabel, Switch } from "@material-ui/core";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import format from "date-fns/format";
import produce from "immer";
import * as React from "react";
import { Section } from "./components/section";

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

const [DEFAULT_START_TIME, DEFAULT_END_TIME] = (function getInitialTimes(): [Date, Date] {
  const startDate = new Date();
  startDate.setHours(9);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  const endDate = new Date();
  endDate.setHours(17);
  endDate.setMinutes(0);
  endDate.setSeconds(0);

  return [startDate, endDate];
})();

const INITIAL_STATE: DailyOperationsHours = new Map([
  [Day.SUNDAY, { status: OpenStatus.CLOSED, hours: null }],
  [Day.MONDAY, { status: OpenStatus.OPEN, hours: { startTime: DEFAULT_START_TIME, endTime: DEFAULT_END_TIME } }],
  [Day.TUESDAY, { status: OpenStatus.OPEN, hours: { startTime: DEFAULT_START_TIME, endTime: DEFAULT_END_TIME } }],
  [Day.WEDNESDAY, { status: OpenStatus.OPEN, hours: { startTime: DEFAULT_START_TIME, endTime: DEFAULT_END_TIME } }],
  [Day.THURSDAY, { status: OpenStatus.OPEN, hours: { startTime: DEFAULT_START_TIME, endTime: DEFAULT_END_TIME } }],
  [Day.FRIDAY, { status: OpenStatus.OPEN, hours: { startTime: DEFAULT_START_TIME, endTime: DEFAULT_END_TIME } }],
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
                          draft.set(
                            day,
                            dayOperationHours.status === OpenStatus.OPEN
                              ? { status: OpenStatus.CLOSED, hours: null }
                              : {
                                  status: OpenStatus.OPEN,
                                  hours: { startTime: DEFAULT_START_TIME, endTime: DEFAULT_END_TIME },
                                }
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
    <Section
      isEditing={isEditing}
      headerText="Hours of Operation"
      onEditingChange={handleToggleEditing}
      onSave={handlePublish}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <p className="subheader">
          Manage standard hours of operations when providers are available to provide care. Patients will be informed if
          they submit an exam outside these hours
        </p>
        <table>
          <tbody>{renderDailyRangeRows()}</tbody>
        </table>
      </MuiPickersUtilsProvider>
    </Section>
  );
}

function formatDate(date: Date) {
  return format(date, "p");
}
