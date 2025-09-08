import { ProjectModal } from "@components/ProjectModal";
import { blogSchema, type EditorProps } from "@forms/collection";
import { EntityEditor } from "@forms/EntityEditor";
import { InputField } from "@forms/Input";
import { useAuthentication } from "@hooks/auth";
import { initialArticle } from "@test/mock_data";
import { type FC, useMemo } from "react";
import type { ArticleDT } from "@/api";

const EDIT_TITLE = "Edit Article";
const ADD_TITLE = "Add Article";
const ENTITY_NAME = "articles";
const BUTTON_TEXT = "Save";
const TITLE_FIELD_LABEL = "Title";
const CATEGORY_LABEL = "Category";
const IMAGE_LABEL = "Image URL";
const CONTENT_LABEL = "Content";

const BlogEditor: FC<EditorProps<ArticleDT>> = ({
	open,
	data,
	onClose,
	onSuccess,
}) => {
	const { user } = useAuthentication();

	const { initialValues, title } = useMemo(
		() =>
			data && Object.hasOwn(data, "id")
				? {
						initialValues: { ...data, author_id: user?.id || null },
						title: EDIT_TITLE,
					}
				: {
						initialValues: { ...initialArticle, author_id: user?.id || null },
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
				validationSchema={blogSchema}
				onCancel={onClose}
				onSuccess={(data) => {
					if (onSuccess) {
						onSuccess(data as ArticleDT);
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
