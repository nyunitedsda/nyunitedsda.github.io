import { useMemo, type FC } from 'react';
import ProjectModal from '../../../components/ProjectModal/ProjectModal';
import EntityEditor from '../../EntityEditor/EntityEditor';
import type { AnnouncementType } from '../../../api/request/types';
import type { EditorProps } from '../types';
import announcementSchema from './schema'
import InputField from '../../Input/FormField';

const EDIT_TITLE = "Edit Announcement";
const ADD_TITLE = "Add Announcement";
const ENTITY_NAME = "announcements";
const BUTTON_TEXT = "Save";
const TITLE_FIELD_LABEL = "Title";
const DESCRIPTION_LABEL = "Description";
const TYPE_LABEL = "Type";


const defaultValues: Partial<AnnouncementType> = {
  title: "",
  type: "event",
  description: "",
  recurring: false,
  date_format: "MM/DD/YYYY",
  author_id: 1, // TODO: Replace with the logged in user id
};

const eventTypes = [
  { id: 1, value: "event", label: "Event" },
  { id: 2, value: "service", label: "Service" },
  { id: 3, value: "conference", label: "Conference" },
  { id: 4, value: "zoom", label: "Zoom" },
];


const AnnouncementEditor: FC<EditorProps<AnnouncementType>> = ({
  open,
  entity,
  onClose,
  onSuccess,
}) => {
  const { initialValues, title } = useMemo(
    () =>
      entity && Object.hasOwn(entity, "id")
        ? {
            initialValues: entity,
            title: EDIT_TITLE,
          }
        : {
            initialValues: defaultValues,
            title: ADD_TITLE,
          },
    [entity],
  );

  return (
    <ProjectModal open={open} onClose={onClose}>
			<EntityEditor
				defaultValues={initialValues}
				entity={ENTITY_NAME}
				id={entity?.id}
				submitButtonText={BUTTON_TEXT}
				title={title}
				validationSchema={announcementSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					console.log("Announcement saved successfully:", data);
					if (onSuccess) {
						onSuccess(data as AnnouncementType);
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
					name="type"
					label={TYPE_LABEL}
					fieldType="select"
					items={eventTypes}
					renderItemLabel={(item) => item.label}
					valueResolver={(item) => item.id}
				/>

        <InputField 
          name="location"
          label="Location"
          fieldType="text"
          placeholder="Enter the location of the event"
        />

        <InputField
          name="conference_code"
          label="Conference Code"
          fieldType="text"
          placeholder="Enter the conference code (if applicable)"
        />  
        <InputField
          name="phone_number"
          label="Phone Number"
          fieldType="text"
          placeholder="Enter the phone number (if applicable)"
        />
        <InputField
          name="sermon"
          label="Sermon Title"
          fieldType="text"
          placeholder="Enter the sermon title (if applicable)"
        />
        <InputField
          name="speaker"
          label="Speaker"
          fieldType="text"
          placeholder="Enter the speaker's name (if applicable)"
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
      </EntityEditor>
      </ProjectModal>
  );
};
  
export default AnnouncementEditor;
  