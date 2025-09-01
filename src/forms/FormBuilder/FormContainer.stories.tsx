import { FormContainer, type FormContainerProps } from "@forms/FormBuilder";
import { TextField } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import * as Yup from "yup";

const meta: Meta<typeof FormContainer> = {
	title: "Forms/FormContainer",
	component: FormContainer,
	parameters: {
		docs: { autodocs: true },
	},
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<FormContainerProps<{ name: string; id?: number }>>;

const validationSchema = Yup.object({
	id: Yup.number(),
	name: Yup.string().required("Name is required"),
});

const initialValues = { name: "", id: undefined };

export const Default: Story = {
	render: (args) => (
		<FormContainer
			{...args}
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				// eslint-disable-next-line no-alert
				alert(`"Submitted: ${JSON.stringify(values)}`);
				return Promise.resolve();
			}}
		>
			<TextField name="name" label="Name" fullWidth />
		</FormContainer>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Basic usage of FormContainer. [See RoutedTabs](?path=/story/components-routedtabs)",
			},
		},
	},
};

export const WithCancel: Story = {
	render: (args) => {
		const [submitted, setSubmitted] = useState(false);
		return (
			<FormContainer
				{...args}
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={() => {
					setSubmitted(true);
					return Promise.resolve();
				}}
				onCancel={() => setSubmitted(false)}
			>
				<TextField name="name" label="Name" fullWidth />
				{submitted && <div>Form submitted!</div>}
			</FormContainer>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"FormContainer with cancel button. [See Default](?path=/story/forms-formcontainer--default)",
			},
		},
	},
};
