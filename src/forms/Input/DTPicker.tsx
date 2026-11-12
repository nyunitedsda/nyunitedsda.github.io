import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import { useField, useFormikContext } from "formik";
import { type FC, useMemo } from "react";
import type { DTPickerProps } from "./types";

const TIME = "Time";
const DATE = "Date";

const DTPicker: FC<DTPickerProps> = (props) => {
	const { name, type } = props;
	const [meta] = useField(name as string);
	const values = useFormikContext();

	const elements = useMemo(() => {
		const commonProps = {
			// ...rest,
			name,
			value: dayjs(meta.value),
			// onChange: (v: any) => values.setFieldValue(name ?? "", v),
			onOk: (v: any) => values.setFieldValue(name ?? "", v),
		};

		switch (type) {
			case DATE:
				return <DatePicker {...commonProps} />;

			case TIME:
				return <TimePicker {...commonProps} />;

			default:
				return <DatePicker {...commonProps} showTime />;
		}
	}, [type, name, meta, values]);

	return elements;
};

export default DTPicker;
