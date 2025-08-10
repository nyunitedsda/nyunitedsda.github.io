import { ProjectModal } from "@components/ProjectModal";
import { EntityEditor } from "@forms/EntityEditor";
import { InputField } from "@forms/Input";
import { useEntityList } from "@hooks/api";
import { useAuthentication } from "@hooks/auth";
import { announcementDateFormats } from "@test/mock_data/announcements";
import { type FC, useMemo } from "react";
import type { AnnouncementDT, EventDT } from "@/api";
import type { EditorProps } from "../types";
import announcementSchema from "./schema";

const EDIT_TITLE = "Edit Announcement";
const ADD_TITLE = "Add Announcement";
const ENTITY_NAME = "announcements";
const BUTTON_TEXT = "Save";
const TITLE_FIELD_LABEL = "Title";
const DESCRIPTION_LABEL = "Description";
const EVENT_LABEL = "Event Type";

const defaultValues: Partial<AnnouncementDT> = {
	title: "",
	event_id: 1,
	description: "",
	recurring: false,
	date_format: "MM/DD/YYYY",
};

const AnnouncementEditor: FC<EditorProps<AnnouncementDT>> = ({
	open,
	data,
	onClose,
	onSuccess,
}) => {
	const { user } = useAuthentication();
	const { data: eventData } = useEntityList<EventDT>("events");

	const { initialValues, title } = useMemo(
		() =>
			data && Object.hasOwn(data, "id")
				? {
						initialValues: { ...data, author_id: user?.id ?? 0 },
						title: EDIT_TITLE,
					}
				: {
						initialValues: { ...defaultValues, author_id: user?.id ?? 0 },
						title: ADD_TITLE,
					},
		[data, user],
	);

	return (
		<ProjectModal open={open} onClose={onClose}>
			<EntityEditor
				defaultValues={initialValues}
				entity={ENTITY_NAME}
				id={data?.id}
				submitButtonText={BUTTON_TEXT}
				title={title}
				validationSchema={announcementSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					console.log("Announcement saved successfully:", data);
					if (onSuccess) {
						onSuccess(data as AnnouncementDT);
					}
				}}
			>
				<InputField name="title" label={TITLE_FIELD_LABEL} fieldType="text" />

				<InputField
					name="description"
					label={DESCRIPTION_LABEL}
					fieldType="text"
					multiline
					minRows={3}
				/>

				<InputField
					name="event_id"
					label={EVENT_LABEL}
					fieldType="select"
					items={(eventData as EventDT[]) ?? []}
					renderItemLabel={(item: Partial<EventDT>) =>
						(item?.name as string) || ""
					}
					valueResolver={(item: Partial<EventDT>) => item.id as number}
				/>

				<InputField
					name="location"
					label="Location"
					fieldType="text"
					placeholder="Enter the location of the event"
				/>

				<InputField
					name="conference_code"
					validateFieldCondition={(data: Partial<AnnouncementDT>) =>
						data.event_id === 3 && !data.zoom_id
					}
					label="Conference Code"
					fieldType="text"
					placeholder="Enter the conference code (if applicable)"
				/>
				<InputField
					name="phone_number"
					validateFieldCondition={(data: Partial<AnnouncementDT>) =>
						!!data.conference_code
					}
					label="Phone Number"
					fieldType="text"
					type="tel"
					placeholder="Enter the phone number (if applicable)"
				/>

				<InputField
					name="zoom_id"
					validateFieldCondition={(data: Partial<AnnouncementDT>) =>
						data.event_id === 3 && !data.conference_code
					}
					label="Zoom ID"
					fieldType="text"
					placeholder="Enter the Zoom ID (if applicable)"
				/>
				<InputField
					name="passcode"
					validateFieldCondition={(data: Partial<AnnouncementDT>) =>
						!!data.zoom_id
					}
					label="Passcode"
					fieldType="text"
					placeholder="Enter the passcode (if applicable)"
				/>
				<InputField
					name="speaker"
					validateFieldCondition={(data: Partial<AnnouncementDT>) =>
						data.event_id === 2
					}
					label="Speaker"
					fieldType="text"
					placeholder="Enter the speaker's name (if applicable)"
				/>
				<InputField
					name="sermon"
					validateFieldCondition={(data: Partial<AnnouncementDT>) =>
						!!data.speaker
					}
					label="Sermon Title"
					fieldType="text"
					placeholder="Enter the sermon title (if applicable)"
				/>

				<InputField
					name="recurring"
					label="Recurring"
					fieldType="checkbox"
					placeholder="Is this event recurring?"
				/>

				<InputField
					name="event_date"
					label="Event Date"
					fieldType="datetime-local"
					placeholder="Select the date of the event"
				/>
				<InputField
					name="date_format"
					validateFieldCondition={(data: Partial<AnnouncementDT>) =>
						!!data.event_date
					}
					label="Date Format"
					fieldType="select"
					items={announcementDateFormats}
					renderItemLabel={(item: { format: string }) => item.format}
					valueResolver={(item: { value: string }) => item.value}
				/>
			</EntityEditor>
		</ProjectModal>
	);
};

export default AnnouncementEditor;
