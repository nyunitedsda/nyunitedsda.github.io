import {
	DatePicker,
	DateTimePicker,
	renderDateViewCalendar,
	renderTimeViewClock,
	TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useField, useFormikContext } from "formik";
import { type FC, useMemo } from "react";
import type { DTPickerProps } from "./types";

const TIME = "Time";
const DATE = "Date";

const DTPicker: FC<DTPickerProps> = (props) => {
	const { name, type, ...rest } = props;
	const [meta] = useField(name as string);
	const values = useFormikContext();

	const elements = useMemo(() => {
		const commonProps = {
			...rest,
			name,
			value: dayjs(meta.value),
			onChange: (v: any) => values.setFieldValue(name ?? "", v),
		};

		switch (type) {
			case DATE:
				return (
					<DatePicker
						{...commonProps}
						viewRenderers={{
							day: renderDateViewCalendar,
						}}
						views={["day", "month", "year"]}
						view="day"
						openTo="day"
					/>
				);

			case TIME:
				return (
					<TimePicker
						{...commonProps}
						viewRenderers={{
							hours: renderTimeViewClock,
							minutes: renderTimeViewClock,
						}}
						openTo="hours"
						view="hours"
						views={["hours", "minutes"]}
					/>
				);

			default:
				return (
					<DateTimePicker
						{...commonProps}
						viewRenderers={{
							hours: renderTimeViewClock,
							minutes: renderTimeViewClock,
						}}
					/>
				);
		}
		// biome-ignore lint/correctness/useExhaustiveDependencies: rest is ok
	}, [type, name, meta, values, rest]);

	return elements;
};

export default DTPicker;
