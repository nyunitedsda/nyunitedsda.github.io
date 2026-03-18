import type { NotificationDT, SeverityDT } from "@/api";
import {
	type EditorProps,
	NOTIFICATION_EDITOR_CONSTANTS,
	notificationSchema,
} from "@/forms";
import { theme } from "@components/AppProvider";
import { ProjectModal } from "@components/ProjectModal";
import EntityEditor from "@forms/EntityEditor/EntityEditor";
import { InputField } from "@forms/Input";
import { useEntityList } from "@hooks/api";
import { Palette } from "@mui/icons-material";
import {
	ButtonBase,
	type Palette as PaletteType,
	type SimplePaletteColorOptions,
	type SxProps,
	type Theme,
} from "@mui/material";
import { initialNotification } from "@test/mock_data";
import { type FC, useMemo } from "react";
import DTPicker from "../../Input/DTPicker";

const severitySx: SxProps<Theme> = {
	"& .MuiButtonBase-root-MuiMenuItem-root": {
		pl: 0,
		pr: 0,
	},
	"& .MuiList-root": {
		px: 0,
		"& .MuiMenuItem-root": {
			width: "100%",
			px: 0,
		},
	},
};

const severityItemSx: SxProps<Theme> = {
	width: "100%",
	height: "100%",
	display: "flex",
	alignItems: "center",
	gap: 1,
	fontWeight: "bold",
	justifyContent: "flex-start",
	pl: 2,
};

const {
	EDIT_TITLE,
	ADD_TITLE,
	ENTITY_NAME,
	BUTTON_TEXT,
	TITLE_FIELD_LABEL,
	MESSAGE_FIELD_LABEL,
	SEVERITY_FIELD_LABEL,
	EXPIRATION_FIELD_LABEL,
	PUBLISH_FIELD_LABEL,
} = NOTIFICATION_EDITOR_CONSTANTS;

const NotificationEditor: FC<EditorProps<Partial<NotificationDT>>> = ({
	open,
	data,
	onClose,
	onSuccess,
}) => {
	const { data: severityData } = useEntityList<SeverityDT>("severity");

	const { initialValues, title } = useMemo(
		() =>
			data && Object.hasOwn(data, "id")
				? {
					initialValues: data,
					title: EDIT_TITLE,
				}
				: {
					initialValues: initialNotification,
					title: ADD_TITLE,
				},
		[data],
	);

	return (
		<ProjectModal open={open} onClose={onClose}>
			<EntityEditor
				defaultValues={initialValues}
				entity={ENTITY_NAME}
				id={initialValues?.id}
				onCancel={onClose}
				onSuccess={(data) => {
					console.log("Notification saved successfully:", data);
					if (onSuccess) {
						onSuccess(data as NotificationDT);
					}
				}}
				submitButtonText={BUTTON_TEXT}
				title={title}
				validationSchema={notificationSchema}

			>
				<InputField name="title" label={TITLE_FIELD_LABEL} fieldType="text" />

				<InputField
					fieldType="text"
					label={MESSAGE_FIELD_LABEL}
					multiline
					name="message"
				/>
				<InputField
					// disabled={severityData?.length === 0}
					defaultValue={1}
					fieldType="select"
					items={severityData || []}
					label={SEVERITY_FIELD_LABEL}
					name="severity"
					renderItemLabel={(item) => {
						const colorKey = severityData?.find((i) => i.id === item.id);
						const color = (
							theme.palette[
							colorKey?.color as keyof PaletteType
							] as SimplePaletteColorOptions
						).main;
						// Avoid ListItemIcon/ListItemText to prevent <li> nesting
						return (
							<ButtonBase key={item.id} sx={severityItemSx} value={item.id}>
								<span style={{ color, display: "flex", alignItems: "center" }}>
									<Palette fontSize="small" />
								</span>
								<span style={{ color }}>{item.title}</span>
							</ButtonBase>
						);
					}}

					sx={severitySx}
					valueResolver={(item) => item?.id as number}
				/>

				<DTPicker
					disablePast
					label={EXPIRATION_FIELD_LABEL}
					name="expires_at"
					type="DateTime"
				/>

				<DTPicker
					label={PUBLISH_FIELD_LABEL}
					name="publish_on"
					type="DateTime"
				/>
			</EntityEditor>
		</ProjectModal>
	);
};

export default NotificationEditor;
