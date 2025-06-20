import * as Yup from "yup";
import { titleSchema } from "../commonSchemas";

export default Yup.object().shape({
  title: titleSchema,
  type: Yup.string()
    .oneOf(["event", "service", "conference", "zoom"], "Invalid event type")
    .required("Event type is required"),
  description: Yup.string()
    .nullable()
    .max(255, "Description must be 255 characters or less"),
  location: Yup.string()
    .nullable()
    .max(255, "Location must be 255 characters or less")
    .when("type", {
      is: (value: string) => value === "zoom",
      then: (schema) => schema.required("Location is required if type is zoom"),
      otherwise: (schema) => schema,
    }).default(function(this: any) {
      return this.parent.type === "zoom" ? "Zoom" : "";
    }),
  conference_code: Yup.string()
    .nullable()
    .max(100, "Conference code must be 100 characters or less")
    .when("type", {
    is: (value: string) => value === "conference",
    then: (schema) =>
      schema.required("Conference Code is required if type is conference"),
    otherwise: (schema) => schema,
  }),
  phone_number: Yup.string().when("type", {
    is: (value: string) => value === "conference",
    then: (schema) =>
      schema.required("Phone number is required if type is conference"),
    otherwise: (schema) => schema,
  }),
  sermon: Yup.string()
    .nullable()
    .max(100, "Sermon title must be 100 characters or less")
    .when("type", {
      is: (value: string) => value === "service",
      then: (schema) =>
        schema.required("Sermon title is required if type is service"),
      otherwise: (schema) => schema,
    }),
  speaker: Yup.string()
    .nullable()
    .max(100, "Speaker name must be 100 characters or less")
    .when("type", {
      is: (value: string) => value === "service",
      then: (schema) =>
        schema.required("Speaker name is required if type is service"),
      otherwise: (schema) => schema,
    }),
  recurring: Yup.boolean().default(false),
  event_date: Yup.date()
    .nullable(),
  date_format: Yup.string()
    .default("MM/DD/YYYY")
    .max(20, "Date format must be 20 characters or less")
    .when("event_date", {
      is: (value: Date | null) => value !== null,
      then: (schema) => schema.required("Date format is required if event date is set"),
      otherwise: (schema) => schema,
    }),
  author_id: Yup.number()
    .required("Author ID is required")
    .positive("Author ID must be a positive number")
    .integer("Author ID must be an integer"),
  zoom_id: Yup.string()
    .nullable()
    .max(100, "Zoom ID must be 100 characters or less")
    .when("type", {
      is: (value: string) => value === "zoom",
      then: (schema) => schema.required("Zoom ID is required if type is zoom"),
      otherwise: (schema) => schema,
    }),
  passcode: Yup.string()
    .nullable()
    .max(100, "Passcode must be 100 characters or less")
    .when("type", {
      is: (value: string) => value === "zoom",
      then: (schema) => schema.required("Passcode is required if type is zoom"),
      otherwise: (schema) => schema,
    }),
});
