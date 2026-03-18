import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Meta, StoryObj } from "@storybook/react-vite";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import DTPicker from "./DTPicker";
import type { DTPickerProps } from "./types";

const meta: Meta<DTPickerProps> = {
  title: "Forms/DTPicker",
  component: DTPicker,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DTPickerProps>;

const initialValues = {
  date: dayjs(),
  time: dayjs(),
}

export const DateTimePicker: Story = {
  render: () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik initialValues={initialValues} onSubmit={() => { }}>
        <Form>
          <DTPicker
            name="dateTime"
            label="Date Time Field"
            type="DateTime"
          />
        </Form>
      </Formik>
    </LocalizationProvider>
  ),
}

export const TimePicker: Story = {
  render: () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik initialValues={initialValues} onSubmit={() => { }}>
        <Form>
          <DTPicker
            name="time"
            label="Date Time Field"
            type="Time"
          />
        </Form>
      </Formik>
    </LocalizationProvider>
  ),
}

export const DatePicker: Story = {
  render: () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik initialValues={initialValues} onSubmit={() => { }}>
        <Form>
          <DTPicker
            name="date"
            label="Date Time Field"
            type="Date"
          />
        </Form>
      </Formik>
    </LocalizationProvider>
  ),
}