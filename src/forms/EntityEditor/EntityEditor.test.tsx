import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InputField from "../Input/FormField";
import EntityEditor from "./EntityEditor";

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
