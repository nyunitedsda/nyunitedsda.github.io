import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import PageTitle from "../../components/PageWrapper/PageTitle";
import services from "../../constants/services";
import {
	HEADER,
	SERVICES,
	SUBHEADER,
	aboutContent,
	details,
	organization,
	organizationContent,
} from "./constants";

const AboutUs: FC = () => {
	return (
		<>
			<PageTitle title={HEADER} subtitle={SUBHEADER} />
			<Stack spacing={2} className="fade-in">
				{aboutContent.map((i) => (
					<Typography variant="body1" key={i}>
						{i}
					</Typography>
				))}

				<Typography variant="h6" fontWeight={"bold"}>
					{organization}
				</Typography>
				<Typography
					variant="body1"
					sx={{ "& strong": { color: "text.secondary" } }}
					dangerouslySetInnerHTML={{ __html: organizationContent }}
				/>

				{details.map((i) => (
					<Box key={i.title}>
						<Typography variant="body1" fontWeight={"bold"}>
							{`${i.title} `}
						</Typography>
						<Typography variant="body1">{i.content}</Typography>
					</Box>
				))}

				<Stack spacing={0}>
					<Typography variant="body1" fontWeight={"bold"}>
						{`${SERVICES}`}
					</Typography>

					{services.map((i) => (
						<Typography
							key={i.title}
							variant="body1"
							sx={{ "& i": { color: "text.secondary" } }}
						>
							<i style={{ fontWeight: "bold" }}>{`${i.title}: `}</i>
							{i.time}
						</Typography>
					))}
				</Stack>
			</Stack>
		</>
	);
};

export default AboutUs;
