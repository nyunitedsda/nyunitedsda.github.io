import type { DonationDT } from "@/api";
import { DonationEditor } from "@forms/collection";
import { Button } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { action } from "storybook/actions";

// Sample donation data
const sampleDonations: Partial<DonationDT>[] = [
	{
		id: 1,
		title: "Tithe",
		description:
			"Regular tithe contributions to support the ministry and church operations",
	},
	{
		id: 2,
		title: "Building Fund",
		description:
			"Special offerings for church building and renovation projects",
	},
	{
		id: 3,
		title: "Mission Fund",
		description: "Donations to support local and international missionary work",
	},
	{
		id: 4,
		title: "Youth Ministry",
		description: "Contributions specifically for youth programs and activities",
	},
	{
		id: 5,
		title: "Community Outreach",
		description: "Funds for community service projects and charity work",
	},
];

/**
 * Interactive wrapper component to demonstrate the DonationEditor modal
 */
const InteractiveWrapper = ({
	data,
	...args
}: {
	data?: Partial<DonationDT>;
	open?: boolean;
}) => {
	const [isOpen, setIsOpen] = useState(args.open || false);

	const handleOpen = () => {
		setIsOpen(true);
		action("Editor opened")();
	};

	const handleClose = () => {
		setIsOpen(false);
		action("Editor closed")();
	};

	return (
		<div style={{ padding: "20px" }}>
			<Button
				variant="contained"
				color="primary"
				onClick={handleOpen}
				style={{ marginBottom: "20px" }}
			>
				{data?.id ? `Edit ${data.title}` : "Create New Donation Method"}
			</Button>
			{data && (
				<div
					style={{
						marginBottom: "20px",
						padding: "10px",
						border: "1px solid #ccc",
						borderRadius: "4px",
					}}
				>
					<h4>Selected Donation: {data.title}</h4>
					<p>{data.description}</p>
				</div>
			)}
			<DonationEditor open={isOpen} data={data} onClose={handleClose} />
		</div>
	);
};

const meta: Meta<typeof DonationEditor> = {
	title: "Forms/Editors/DonationEditor",
	component: DonationEditor,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component: `
The DonationEditor component provides a modal interface for creating and editing donation methods.

**Features:**
- Create new donation methods with title and description
- Edit existing donation methods
- Form validation using Yup schema
- Responsive modal design

**Usage:**
All stories use an interactive button to open the modal, making the documentation examples more realistic and user-friendly. The modal is closed by default and opens when the button is clicked.
				`,
			},
		},
	},
	argTypes: {
		open: {
			control: "boolean",
			description: "Whether the modal is open",
		},
		data: {
			control: "object",
			description: "The donation data to edit (undefined for create mode)",
		},
		onClose: {
			action: "closed",
			description: "Callback fired when the modal is closed",
		},
	},
	args: {
		open: false,
		onClose: action("onClose"),
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Create a new donation method
 */
export const Create: Story = {
	render: (args) => <InteractiveWrapper {...args} />,
	args: {
		data: undefined,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Click the button to open the donation editor in create mode. Fill out the form to add a new donation method.",
			},
		},
	},
};

/**
 * Interactive playground with data selection
 */
export const Playground: Story = {
	render: (args) => {
		const [selectedEntity, setSelectedEntity] = useState<
			Partial<DonationDT> | undefined
		>(sampleDonations[0]);
		const uId = useId();

		return (
			<div style={{ padding: "20px" }}>
				<div style={{ marginBottom: "20px" }}>
					<label
						htmlFor={uId}
						style={{
							display: "block",
							marginBottom: "8px",
							fontWeight: "bold",
						}}
					>
						Select a donation method to edit:
					</label>
					<select
						id={uId}
						value={selectedEntity?.id || ""}
						onChange={(e) => {
							const id = Number(e.target.value);
							const data = id
								? sampleDonations.find((d) => d.id === id)
								: undefined;
							setSelectedEntity(data);
						}}
						style={{ padding: "8px", marginRight: "10px", minWidth: "200px" }}
					>
						<option value="">Create New Donation Method</option>
						{sampleDonations.map((donation) => (
							<option key={donation.id} value={donation.id}>
								{donation.title}
							</option>
						))}
					</select>
				</div>
				<InteractiveWrapper {...args} data={selectedEntity} />
			</div>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					"Select a donation method from the dropdown to edit, or choose 'Create New' to add a new donation method. Click the button to open the editor.",
			},
		},
	},
};

/**
 * Edit an existing donation method
 */
export const Edit: Story = {
	render: (args) => <InteractiveWrapper {...args} />,
	args: {
		data: sampleDonations[0],
	},
	parameters: {
		docs: {
			description: {
				story:
					"Click the button to edit an existing donation method. The form will be pre-populated with the current values.",
			},
		},
	},
};

/**
 * Closed modal with data selection
 */
export const ClosedModal: Story = {
	render: (args) => {
		const [selectedEntity, setSelectedEntity] = useState<
			Partial<DonationDT> | undefined
		>(sampleDonations[1]);
		const uId = useId();

		return (
			<div style={{ padding: "20px" }}>
				<h3>Donation Editor - Closed State</h3>
				<p>
					This story demonstrates the closed state of the donation editor modal.
				</p>

				<div style={{ marginBottom: "20px" }}>
					<label
						htmlFor={uId}
						style={{
							display: "block",
							marginBottom: "8px",
							fontWeight: "bold",
						}}
					>
						Select a donation method:
					</label>
					<select
						id={uId}
						value={selectedEntity?.id || ""}
						onChange={(e) => {
							const id = Number(e.target.value);
							const data = id
								? sampleDonations.find((d) => d.id === id)
								: undefined;
							setSelectedEntity(data);
						}}
						style={{ padding: "8px", marginRight: "10px", minWidth: "200px" }}
					>
						<option value="">Create New Donation Method</option>
						{sampleDonations.map((donation) => (
							<option key={donation.id} value={donation.id}>
								{donation.title}
							</option>
						))}
					</select>
				</div>

				<InteractiveWrapper {...args} data={selectedEntity} />
			</div>
		);
	},
	args: {
		open: false,
	},
	parameters: {
		docs: {
			description: {
				story:
					"The modal starts closed. Select a donation method and click the button to open the editor. This represents the typical user interaction pattern.",
			},
		},
	},
};

/**
 * Sample donation methods for reference
 */
export const SampleData: Story = {
	render: () => (
		<div style={{ padding: "20px" }}>
			<h3>Sample Donation Methods</h3>
			<p>These are the sample donation methods used in the stories above:</p>
			<div style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
				{sampleDonations.map((donation) => (
					<div
						key={donation.id}
						style={{
							border: "1px solid #ddd",
							padding: "16px",
							borderRadius: "8px",
							backgroundColor: "#f9f9f9",
						}}
					>
						<h4 style={{ margin: "0 0 8px 0", color: "#333" }}>
							{donation.title}
						</h4>
						<p style={{ margin: "0", color: "#666" }}>{donation.description}</p>
						<small style={{ color: "#999" }}>ID: {donation.id}</small>
					</div>
				))}
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					"A reference of all sample donation methods used in the stories. These represent typical donation categories in a church management system.",
			},
		},
	},
};
