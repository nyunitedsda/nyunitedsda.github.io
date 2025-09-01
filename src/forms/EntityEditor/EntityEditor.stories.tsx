import type { Meta, StoryObj } from "@storybook/react-vite";
import { donations, initialDonation } from "@test/mock_data";
import { SnackbarProvider } from "notistack";
import { donationSchema, EntityEditor, InputField } from "@/forms";

// Wrapper component to avoid React children serialization issues
const EntityEditorWrapper = (props: any) => (
	<EntityEditor {...props}>
		<InputField name="title" label="Title" fieldType="text" />
		<InputField
			name="description"
			label="Description"
			fieldType="text"
			multiline
			rows={4}
		/>
	</EntityEditor>
);

// Define the meta for the story
const meta: Meta<typeof EntityEditorWrapper> = {
	title: "Forms/EntityEditor",
	component: EntityEditorWrapper,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<SnackbarProvider maxSnack={3}>
				<div style={{ maxWidth: "800px", margin: "0 auto" }}>
					<Story />
				</div>
			</SnackbarProvider>
		),
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create mode story
export const CreateMode: Story = {
	args: {
		data: "donations",
		validationSchema: donationSchema,
		defaultValues: initialDonation,
		title: "Create New Item",
		submitButtonText: "Create Item",
		cancelButtonText: "Cancel",
		onSuccess: (data: any) => console.log("Success:", data),
		onCancel: () => console.log("Cancelled"),
	},
};

// Edit mode story
export const EditMode: Story = {
	args: {
		data: "donations",
		id: 123,
		validationSchema: donationSchema,
		defaultValues: donations[0], // Use the first donation as default values
		title: "Edit Item",
		submitButtonText: "Update Item",
		cancelButtonText: "Cancel",
		onSuccess: (data: any) => console.log("Success:", data),
		onCancel: () => console.log("Cancelled"),
	},
	parameters: {
		mockData: [
			{
				url: "/api/donations/456",
				method: "GET",
				status: 200,
				response: {
					// Delay the response to show loading state
					delay: 500,
					data: {
						id: 456,
						title: "Delayed Item",
						description: "This item loads slowly",
					},
				},
			},
		],
	},
};

// Loading state story
export const LoadingState: Story = {
	args: {
		data: "donations",
		id: 456, // Provide ID to trigger loading state
		validationSchema: donationSchema,
		defaultValues: donations[0],
		title: "Edit Item",
	},
	parameters: {
		mockData: [
			{
				url: "/api/donations/456",
				method: "GET",
				status: 200,
				response: {
					// Delay the response to show loading state
					delay: 500,
					data: {
						id: 456,
						title: "Delayed Item",
						description: "This item loads slowly",
					},
				},
			},
		],
	},
};
