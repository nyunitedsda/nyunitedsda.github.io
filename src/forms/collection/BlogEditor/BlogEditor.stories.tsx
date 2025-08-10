import type { Meta, StoryObj } from "@storybook/react-vite";
import { SnackbarProvider } from "notistack";
import { useId, useState } from "react";
import type { ArticleDT } from "@/api";
import BlogEditor from "./BlogEditor";

// Sample article data
const sampleTechArticle: ArticleDT = {
	id: 1,
	title: "The Future of Church Technology",
	category: "Technology",
	img_src: "https://example.com/tech-article.jpg",
	content:
		"In today's digital age, churches are embracing technology to reach more people and enhance worship experiences. From live streaming services to interactive prayer apps, the possibilities are endless...",
	author_id: 1,
	published_at: new Date("2025-06-01T00:00:00"),
};

const sampleFaithArticle: ArticleDT = {
	id: 2,
	title: "Walking in Faith: A Journey of Trust",
	category: "Faith & Spirituality",
	img_src: "https://example.com/faith-article.jpg",
	content:
		"Faith is not just a belief; it's a way of life. When we walk in faith, we learn to trust in God's plan even when the path ahead seems uncertain. This journey of faith transforms not only our lives but also the lives of those around us...",
	author_id: 2,
	published_at: new Date("2025-06-10T00:00:00"),
};

const sampleCommunityArticle: ArticleDT = {
	id: 3,
	title: "Building Stronger Church Communities",
	category: "Community",
	img_src: "https://example.com/community-article.jpg",
	content:
		"A strong church community is built on fellowship, mutual support, and shared purpose. Through various outreach programs, small group meetings, and community service projects, we can create bonds that last a lifetime...",
	author_id: 1,
	published_at: new Date("2025-06-20T00:00:00"),
};

// Interactive wrapper component with open button
const InteractiveWrapper = ({
	data,
	onClose,
	onSuccess,
	buttonText = "Open Editor",
}: {
	data?: ArticleDT;
	onClose?: () => void;
	onSuccess?: (data: ArticleDT) => void;
	buttonText?: string;
}) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		onClose?.();
	};

	const handleSuccess = (data: ArticleDT) => {
		setOpen(false);
		onSuccess?.(data);
	};

	return (
		<div style={{ padding: "20px" }}>
			<button
				onClick={handleOpen}
				style={{
					padding: "12px 24px",
					fontSize: "16px",
					backgroundColor: "#007bff",
					color: "white",
					border: "none",
					borderRadius: "8px",
					cursor: "pointer",
					boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
					marginBottom: "20px",
				}}
			>
				{buttonText}
			</button>
			<BlogEditor
				open={open}
				data={data}
				onClose={handleClose}
				onSuccess={handleSuccess}
			/>
		</div>
	);
};

// Define the meta for the story
const meta: Meta<typeof BlogEditor> = {
	title: "Forms/BlogEditor",
	component: BlogEditor,
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<SnackbarProvider maxSnack={3}>
				<div
					style={{
						minHeight: "100vh",
						padding: "20px",
						backgroundColor: "#f5f5f5",
					}}
				>
					<Story />
				</div>
			</SnackbarProvider>
		),
	],
	argTypes: {
		open: {
			control: "boolean",
			description: "Whether the modal is open",
			defaultValue: false,
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		data: {
			control: "object",
			description: "Article data to edit (undefined for create mode)",
			table: {
				type: { summary: "ArticleDT | undefined" },
				defaultValue: { summary: "undefined" },
			},
		},
		onClose: {
			action: "onClose",
			description: "Callback when modal is closed",
			table: {
				type: { summary: "() => void" },
			},
		},
		onSuccess: {
			action: "onSuccess",
			description: "Callback when article is successfully saved",
			table: {
				type: { summary: "(data: ArticleDT) => void" },
			},
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
The BlogEditor is a comprehensive form component for creating and editing blog articles. 
It provides a rich text editing experience for content creation and management.

## Features:
- ✅ Rich text content editing with multiline support
- ✅ Category classification system
- ✅ Image URL integration for featured images
- ✅ Form validation and error handling
- ✅ Modal interface with responsive design
- ✅ Author tracking and timestamps

## Usage:
Use this component when you need to allow users to create or edit blog articles. 
The form includes all necessary fields for comprehensive content management.
				`,
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Create mode story
export const CreateMode: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="🆕 Create New Article"
		/>
	),
	args: {
		data: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ArticleDT) => console.log("Article created:", data),
	},
	parameters: {
		docs: {
			description: {
				story:
					"**🆕 Create a new article** - Click the button to open the blog editor and start writing from scratch.",
			},
			source: {
				code: `
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>
  Create New Article
</button>

<BlogEditor
  open={open}
  data={undefined}
  onClose={() => setOpen(false)}
  onSuccess={(data) => {
    console.log("Created:", data);
    setOpen(false);
  }}
/>`,
			},
		},
	},
};

// Interactive playground story
export const Playground: Story = {
	render: (args) => {
		const PlaygroundWrapper = () => {
			const [open, setOpen] = useState(false);
			const [selectedEntity, setSelectedEntity] = useState<
				ArticleDT | undefined
			>(args.data);
			const uId = useId();

			const entityOptions = [
				{ label: "None (Create Mode)", value: undefined },
				{ label: "Technology Article", value: sampleTechArticle },
				{ label: "Faith Article", value: sampleFaithArticle },
				{ label: "Community Article", value: sampleCommunityArticle },
			];

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
							Select Article Type:
						</label>
						<select
							id={uId}
							title="Select article type"
							value={entityOptions.findIndex(
								(opt) => opt.value === selectedEntity,
							)}
							onChange={(e) =>
								setSelectedEntity(entityOptions[Number(e.target.value)].value)
							}
							style={{
								padding: "8px 12px",
								fontSize: "14px",
								border: "1px solid #ccc",
								borderRadius: "4px",
								marginRight: "12px",
							}}
						>
							{entityOptions.map((option, index) => (
								<option key={option.label} value={index}>
									{option.label}
								</option>
							))}
						</select>
					</div>
					<button
						onClick={() => setOpen(true)}
						style={{
							padding: "12px 24px",
							fontSize: "16px",
							backgroundColor: "#28a745",
							color: "white",
							border: "none",
							borderRadius: "8px",
							cursor: "pointer",
							boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
						}}
					>
						🎮 Open Playground
					</button>
					<BlogEditor
						open={open}
						data={selectedEntity}
						onClose={() => setOpen(false)}
						onSuccess={(data) => {
							console.log("Article saved:", data);
							setOpen(false);
						}}
					/>
				</div>
			);
		};

		return <PlaygroundWrapper />;
	},
	args: {
		data: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ArticleDT) => console.log("Article saved:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**🎮 Interactive Playground** - The ultimate testing ground for blog editing!

**Try these interactions:**
- 🔄 Select different article types from the dropdown
- 🚀 Click "Open Playground" to launch the editor
- 📝 Explore the rich text editing capabilities
- 🔍 Check the Actions panel to see callback results

**Pro tip:** This is the best way to understand the component's content editing features!
				`,
			},
		},
	},
};

// Edit mode - Technology Article
export const EditModeTechnology: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="💻 Edit Tech Article"
		/>
	),
	args: {
		data: sampleTechArticle,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ArticleDT) => console.log("Tech article updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**💻 Technology Article Editor**

**Click to see:**
- 🖥️ Tech-focused content editing
- 📷 Image URL management
- 📂 Technology category selection
- ✏️ Pre-populated with sample tech content
				`,
			},
		},
	},
};

// Edit mode - Faith Article
export const EditModeFaith: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="🙏 Edit Faith Article"
		/>
	),
	args: {
		data: sampleFaithArticle,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ArticleDT) => console.log("Faith article updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**🙏 Faith & Spirituality Article Editor**

**Click to explore:**
- 📖 Spiritual content management
- 🎯 Faith & Spirituality category
- 📝 Inspirational article editing
- ✨ Rich text for devotional content
				`,
			},
		},
	},
};

// Edit mode - Community Article
export const EditModeCommunity: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="👥 Edit Community Article"
		/>
	),
	args: {
		data: sampleCommunityArticle,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ArticleDT) =>
			console.log("Community article updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**👥 Community Article Editor**

**Click to see:**
- 🤝 Community-focused content
- 📂 Community category selection
- 👥 Outreach and fellowship topics
- 📝 Multi-paragraph content editing
				`,
			},
		},
	},
};

// Long content article
export const LongContentArticle: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="📄 Edit Long Article"
		/>
	),
	args: {
		data: {
			...sampleFaithArticle,
			id: 4,
			title: "The Complete Guide to Christian Living",
			content: `This is a comprehensive guide that covers multiple aspects of Christian living. 

Chapter 1: Foundation of Faith
Faith is the cornerstone of Christian living. It's not just what we believe, but how we live out those beliefs in our daily lives.

Chapter 2: Prayer and Meditation
Prayer is our direct line of communication with God. Through prayer, we can express our gratitude, seek guidance, and find peace in times of trouble.

Chapter 3: Community and Fellowship
No Christian walks alone. We are called to be part of a community, supporting one another through life's challenges and celebrating together in times of joy.

Chapter 4: Service and Outreach
Our faith calls us to serve others, particularly those in need. Through acts of service, we demonstrate God's love to the world.

Chapter 5: Spiritual Growth
Christian living is a journey of continuous growth. Through Bible study, worship, and reflection, we deepen our relationship with God.

This guide provides practical steps and biblical insights for each of these important areas of Christian life.`,
		},
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ArticleDT) => console.log("Long article updated:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**📄 Long Content Article Editor**

**Click to test:**
- 📝 Multi-paragraph content editing
- 📏 Scrollable text area behavior
- 💾 Large content handling
- 🎯 Rich text formatting capabilities
				`,
			},
		},
	},
};

// Form validation demo
export const FormValidationDemo: Story = {
	render: (args) => (
		<InteractiveWrapper
			data={args.data}
			onClose={args.onClose}
			onSuccess={args.onSuccess}
			buttonText="🚨 Test Form Validation"
		/>
	),
	args: {
		data: {
			id: 0,
			title: "", // Empty to trigger validation
			category: "",
			img_src: "",
			content: "",
			author_id: 1,
			published_at: new Date().toISOString(),
		} as unknown as ArticleDT,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ArticleDT) => console.log("Article saved:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**🚨 Form Validation Demo**

**Click to see validation in action:**
- ❌ Required fields show error states when empty
- 📋 Helpful validation messages guide users
- 🚫 Submit button behavior with invalid data
- ✅ Real-time validation feedback

**Try this:** Click "Test Form Validation" and attempt to submit with empty fields!
				`,
			},
		},
	},
};

// Closed modal story
export const ClosedModal: Story = {
	render: () => {
		const ClosedModalDemo = () => {
			const [open, setOpen] = useState(false);
			const [selectedEntity, setSelectedEntity] = useState<
				ArticleDT | undefined
			>(undefined);
			const uId = useId();

			const entityOptions = [
				{ label: "None (Create Mode)", value: undefined },
				{ label: "Technology Article", value: sampleTechArticle },
				{ label: "Faith Article", value: sampleFaithArticle },
				{ label: "Community Article", value: sampleCommunityArticle },
			];

			return (
				<div style={{ padding: "20px" }}>
					<div
						style={{
							marginBottom: "20px",
							padding: "16px",
							backgroundColor: "#f8f9fa",
							borderRadius: "8px",
						}}
					>
						<h4 style={{ margin: "0 0 12px 0", color: "#333" }}>
							👻 Component State Demo
						</h4>
						<p style={{ margin: "0 0 16px 0", color: "#666" }}>
							This demonstrates the component's default closed state. Select an
							article type and click the button to see it open.
						</p>
						<div style={{ marginBottom: "12px" }}>
							<label
								style={{
									display: "block",
									marginBottom: "8px",
									fontWeight: "bold",
								}}
								htmlFor={uId}
							>
								Pre-select article for modal:
							</label>
							<select
								title="Select article type for modal"
								id={uId}
								value={entityOptions.findIndex(
									(opt) => opt.value === selectedEntity,
								)}
								onChange={(e) =>
									setSelectedEntity(entityOptions[Number(e.target.value)].value)
								}
								style={{
									padding: "8px 12px",
									fontSize: "14px",
									border: "1px solid #ccc",
									borderRadius: "4px",
									marginRight: "12px",
								}}
							>
								{entityOptions.map((option, index) => (
									<option key={option.label} value={index}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>
					<button
						onClick={() => setOpen(true)}
						style={{
							padding: "12px 24px",
							fontSize: "16px",
							backgroundColor: "#6c757d",
							color: "white",
							border: "none",
							borderRadius: "8px",
							cursor: "pointer",
							boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
						}}
					>
						{open ? "✅ Modal is Open" : "👆 Click to Open Blog Editor"}
					</button>
					<BlogEditor
						open={open}
						data={selectedEntity}
						onClose={() => setOpen(false)}
						onSuccess={(data) => {
							console.log("Article saved:", data);
							setOpen(false);
						}}
					/>
				</div>
			);
		};

		return <ClosedModalDemo />;
	},
	args: {
		data: undefined,
		onClose: () => console.log("Modal closed"),
		onSuccess: (data: ArticleDT) => console.log("Article saved:", data),
	},
	parameters: {
		docs: {
			description: {
				story: `
**👻 Closed Modal State**

**Interactive demo of component lifecycle:**
- 🎯 **Default state** - Component starts closed (normal behavior)
- 📝 **Pre-configure data** - Select article type before opening
- 👆 **Manual trigger** - Click button to open modal
- 🔄 **State management** - See how open/close states work
				`,
			},
		},
	},
};
