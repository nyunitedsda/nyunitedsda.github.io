import { type FC, useMemo } from "react";
import type { ArticleType } from "../../../api/request/types";
import ProjectModal from "../../../components/ProjectModal/ProjectModal";
import EntityEditor from "../../EntityEditor/EntityEditor";
import InputField from "../../Input/FormField";
import type { EditorProps } from "../types";
import blogSchema from "./schema";

const EDIT_TITLE = "Edit Article";
const ADD_TITLE = "Add Article";
const ENTITY_NAME = "articles";
const BUTTON_TEXT = "Save";
const TITLE_FIELD_LABEL = "Title";
const CATEGORY_LABEL = "Category";
const IMAGE_LABEL = "Image URL";
const CONTENT_LABEL = "Content";

const defaultValues: Partial<ArticleType> = {
	title: "",
	category: "",
	img_src: "",
	content: "",
	author_id: 1, // TODO: Replace with the logged in user id
	publishDate: new Date().toISOString(),
};

const BlogEditor: FC<EditorProps<ArticleType>> = ({
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
				validationSchema={blogSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					console.log("Article saved successfully:", data);
					if (onSuccess) {
						onSuccess(data as ArticleType);
					}
				}}
			>
				<InputField
					name="title"
					label={TITLE_FIELD_LABEL}
					fieldType="text"
					placeholder="Enter article title"
				/>

				<InputField
					name="category"
					label={CATEGORY_LABEL}
					fieldType="text"
					placeholder="Enter article category"
				/>

				<InputField
					name="img_src"
					label={IMAGE_LABEL}
					fieldType="text"
					placeholder="Enter URL for article image"
				/>

				<InputField
					name="content"
					label={CONTENT_LABEL}
					fieldType="text"
					multiline
					minRows={10}
					placeholder="Write your article content here..."
				/>
			</EntityEditor>
		</ProjectModal>
	);
};

export default BlogEditor;
