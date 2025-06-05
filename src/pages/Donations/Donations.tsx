import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import PageTitle from "../../components/PageWrapper/PageTitle";

const HEADER = "Donations";
const SUBHEADER = "Ways to donate to New York United SDA Church";
const DONATION_TEXT =
	"There are several ways one can give including safe, secure and convenient methods of giving online. Please see below:";
const DONATION_OPTIONS = [
	{
		method: "During Services",
		description:
			"Simply place cash or checks in the offering bag. Please be sure to notate your name and address on the check or envelope, so that you may be given donation receipts that may be used for tax purposes.",
	},
	{
		method: "​By Mail",
		description:
			"Please mail your donation to <i>NY United Sabbath Day Adventist Church 163 West 131st Street, New York, NY 10027</i>. Please be sure to notate your name and address on the check or envelope, so that you may be given donation receipts that may be used for tax purposes.",
	},
	{
		method: "Online Giving",
		description:
			"Online giving allows for a safe, secure and convenient way to give directly from a checking or savings account and or credit card. You can set up online giving either as a one-time donation or a recurring gift.",
	},
];

const Donations: FC = () => {
	return (
		<>
			<PageTitle title={HEADER} subtitle={SUBHEADER} />
			<Stack spacing={2} className="fade-in">
				<Typography>{DONATION_TEXT}</Typography>

				{DONATION_OPTIONS.map((i) => (
					<Typography
						key={i.method}
						dangerouslySetInnerHTML={{
							__html: `<strong>${i.method}: </strong>${i.description}`,
						}}
					/>
				))}
			</Stack>
		</>
	);
};

export default Donations;
