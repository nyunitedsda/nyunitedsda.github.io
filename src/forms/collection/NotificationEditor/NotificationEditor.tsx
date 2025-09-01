import type { NotificationDT, SeverityDT } from "@/api";
import {
	NOTIFICATION_EDITOR_CONSTANTS,
	notificationSchema,
	type EditorProps,
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
import { useMemo, type FC } from "react";

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

const {
	EDIT_TITLE,
	ADD_TITLE,
	ENTITY_NAME,
	BUTTON_TEXT,
	TITLE_FIELD_LABEL,
	MESSAGE_FIELD_LABEL,
	SEVERITY_FIELD_LABEL,
	EXPIRATION_FIELD_LABEL,
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
				submitButtonText={BUTTON_TEXT}
				title={title}
				validationSchema={notificationSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					console.log("Notification saved successfully:", data);
					if (onSuccess) {
						onSuccess(data as NotificationDT);
					}
				}}
			>
				<InputField name="title" label={TITLE_FIELD_LABEL} fieldType="text" />

				<InputField
					name="message"
					label={MESSAGE_FIELD_LABEL}
					fieldType="text"
					multiline
				/>
				<InputField
					renderItemLabel={(item) => {
						const colorKey = severityData?.find((i) => i.id === item.id);
						const color = (
							theme.palette[
								colorKey?.color as keyof PaletteType
							] as SimplePaletteColorOptions
						).main;
						// Avoid ListItemIcon/ListItemText to prevent <li> nesting
						return (
							<ButtonBase
								key={item.id}
								sx={{
									width: "100%",
									height: "100%",
									display: "flex",
									alignItems: "center",
									gap: 1,
									fontWeight: "bold",
									justifyContent: "flex-start",
									pl: 2,
								}}
								value={item.id}
							>
								<span style={{ color, display: "flex", alignItems: "center" }}>
									<Palette fontSize="small" />
								</span>
								<span style={{ color }}>{item.title}</span>
							</ButtonBase>
						);
					}}
					name="severity"
					label={SEVERITY_FIELD_LABEL}
					fieldType="select"
					items={severityData || []}
					sx={severitySx}
					valueResolver={(item) => item?.id as number}
				/>

				<InputField
					name="expires_at"
					label={EXPIRATION_FIELD_LABEL}
					fieldType="datetime-local"
				/>
			</EntityEditor>
		</ProjectModal>
	);
};

export default NotificationEditor;
