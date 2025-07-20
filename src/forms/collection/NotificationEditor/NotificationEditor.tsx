import { Palette } from "@mui/icons-material";
import {
	ButtonBase,
	type SimplePaletteColorOptions,
	type SxProps,
	type Theme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { type FC, useMemo } from "react";
import { getDatabaseList } from "../../../api/request/commonQueries";
import type {
	NotificationType,
	SeverityType,
} from "../../../api/request/types";
import theme from "../../../components/AppProvider/theme";
import ProjectModal from "../../../components/ProjectModal/ProjectModal";
import { defaultNotification } from "../../../test/mock_data/notifications";
import EntityEditor from "../../EntityEditor/EntityEditor";
import { default as InputField } from "../../Input/FormField";
import type { EditorProps } from "../types";
import { NOTIFICATION_EDITOR_CONSTANTS, notificationSchema } from "./constants";

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
	SEVERITY_PALETTE_KEY,
} = NOTIFICATION_EDITOR_CONSTANTS;

const NotificationEditor: FC<EditorProps<Partial<NotificationType>>> = ({
	open,
	data,
	onClose,
	onSuccess,
}) => {
	const { initialValues, title } = useMemo(
		() =>
			data && Object.hasOwn(data, "id")
				? {
						initialValues: data,
						title: EDIT_TITLE,
					}
				: {
						initialValues: defaultNotification,
						title: ADD_TITLE,
					},
		[data],
	);

	const { data: severityData } = useQuery<SeverityType[]>({
		queryKey: ["severity"],
		queryFn: () => getDatabaseList("severity"),
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});

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
						onSuccess(data as NotificationType);
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
						const paletteKey = SEVERITY_PALETTE_KEY[item.type] || "info";
						const color = (
							theme.palette[paletteKey] as SimplePaletteColorOptions
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
					valueResolver={(item) => item.id}
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
