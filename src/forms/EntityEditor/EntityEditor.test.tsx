import { EntityEditor, InputField } from "@/forms";
import { describe, expect, it, render } from "@/test";

describe("GenericEntityModificationForm", () => {
	it("renders GenericEntityModificationForm", () => {
		const { getByText } = render(
			<EntityEditor
				entity="donations"
				validationSchema={undefined}
				defaultValues={{
					id: undefined,
				}}
			>
				<InputField
					name="name"
					label="GenericEntityModificationForm Component"
					type="text"
					required
					fieldType="text"
				/>
			</EntityEditor>,
		);

		expect(
			getByText("GenericEntityModificationForm Component"),
		).toBeInTheDocument();
	});
});
