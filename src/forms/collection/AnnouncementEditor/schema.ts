import { dateFormatValues } from "@test/mock_data/announcements";
import * as Yup from "yup";
import { titleSchema } from "../commonSchemas";

// Conditional rules are documented inline.
export default Yup.object().shape({
	title: titleSchema,
	description: Yup.string()
		.nullable()
		.max(255, "Description must be 255 characters or less"),
	event_id: Yup.number()
		.required("Event ID is required")
		.positive("Event ID must be a positive number")
		.integer("Event ID must be an integer"),

	// Only required for event_id === 3
	location: Yup.string()
		.nullable()
		.max(255, "Location must be 255 characters or less")
		.when("event_id", {
			is: (value: number) => value === 3,
			then: (schema) =>
				schema.required("Location is required for this event type"),
			otherwise: (schema) => schema,
		}),

	// Only allowed for event_id === 3
	conference_code: Yup.string()
		.nullable()
		.max(100, "Conference code must be 100 characters or less")
		.when("event_id", {
			is: (value: number) => value === 3,
			then: (schema) => schema, // not required, just allowed if event_id === 3
			otherwise: (schema) =>
				schema.test(
					"conference_code-empty-if-not-3",
					"Conference code can only have a value if event ID is 3",
					(value) => !value, // must be empty if event_id !== 3
				),
		}),
	// Only required if conference_code is set
	phone_number: Yup.string().when("conference_code", {
		is: (conference_code: string | null) => !!conference_code,
		then: (schema) =>
			schema.required("Phone number is required if conference code is set"),
		otherwise: (schema) =>
			schema.test(
				"phone_number-empty-if-no-conference-code",
				"Conference code is required for a phone number to have a value",
				(value, context) => {
					const { conference_code } = context.parent;
					if (conference_code) return true;
					return !value;
				},
			),
	}),
	// Only required for event_id === 2
	speaker: Yup.string()
		.nullable()
		.max(100, "Speaker name must be 100 characters or less")
		.when("event_id", {
			is: (value: number) => value === 2,
			then: (schema) => schema,
			otherwise: (schema) =>
				schema.test(
					"speaker-empty-if-not-2",
					"Speaker can only have a value if event ID is 2",
					(value) => !value, // must be empty if event_id !== 2
				),
		}),
	// Only required if speaker is set
	sermon: Yup.string()
		.nullable()
		.max(100, "Sermon title must be 100 characters or less")
		.when("speaker", {
			is: (speaker: string | null) => !!speaker,
			then: (schema) =>
				schema.required(
					"Sermon title is required if event ID is 2 and speaker is set",
				),
			otherwise: (schema) =>
				schema.test(
					"sermon-empty-if-not-2-or-no-speaker",
					"Sermon title can only have a value if event ID is 2 and speaker is set",
					(value, context) => {
						const { speaker } = context.parent;
						if (speaker) return true;
						return !value;
					},
				),
		}),

	recurring: Yup.boolean().default(false),
	event_date: Yup.date().nullable(),
	// Only required if event_date is set
	date_format: Yup.string()
		.nullable()
		.default("MM/DD/YYYY")
		.max(20, "Date format must be 20 characters or less")
		.oneOf(dateFormatValues, "Date format must be a valid option")
		.when("event_date", {
			is: (value: Date | null) => value !== null,
			then: (schema) =>
				schema.required("Date format is required if event date is set"),
			otherwise: (schema) => schema,
		}),
	author_id: Yup.number()
		.required("Author ID is required")
		.positive("Author ID must be a positive number")
		.integer("Author ID must be an integer"),
	// Only required for event_id === 3
	zoom_id: Yup.string()
		.nullable()
		.max(100, "Zoom ID must be 100 characters or less")
		.when("event_id", {
			is: (value: number) => value === 3,
			then: (schema) => schema,
			otherwise: (schema) =>
				schema.test(
					"zoom_id-empty-if-not-3",
					"Zoom ID can only have a value if event ID is 3",
					(value) => !value, // must be empty if event_id !== 3
				),
		}),
	// Only required if zoom_id is set
	passcode: Yup.string()
		.nullable()
		.max(100, "Passcode must be 100 characters or less")
		.when("zoom_id", {
			is: (zoom_id: string | null) => !!zoom_id,
			then: (schema) =>
				schema.required("Passcode is required if zoom ID is set"),
			otherwise: (schema) => schema,
		}),
});
