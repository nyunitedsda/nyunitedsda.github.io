import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import services from "../../constants/services";
import { HEADER, SERVICES, SUBHEADER, aboutContent, details, organization, organizationContent } from "./constants";




const AboutUs: FC = () => {
	return (
		<PageWrapper header={HEADER} subHeader={SUBHEADER}>

			{/* // <Container maxWidth="lg" sx={{ mt: 8, mb: 8, flexGrow: 1 }}>
		// 	<Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
		// 		{HEADER}
		// 	</Typography>
		// 	<Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
		// 		{SUBHEADER}
		// 	</Typography> */}

			<Stack spacing={2}>
				{
					aboutContent.map((i) => (
						<Typography variant="body1" key={i}>
							{i}
						</Typography>
					))
				}

				<Typography variant="h6" fontWeight={'bold'}>
					{organization}
				</Typography>
				<Typography variant="body1" >
					{organizationContent}
				</Typography>

				{
					details.map((i) => (
						<Box key={i.title}>
							<Typography variant="body1" fontWeight={'bold'}>
								{`${i.title} `}
							</Typography>
							<Typography variant="body1" >
								{i.content}
							</Typography>
						</Box>

					))
				}

				<Stack spacing={0}>
					<Typography variant="body1" fontWeight={'bold'}>
						{`${SERVICES}`}
					</Typography>

					{services.map((i) => (
						<Typography key={i.title} variant="body1" sx={{ mb: 0, '& i': { color: 'text.secondary' } }}>
							<i style={{ fontWeight: 'bold', }}>{`${i.title}: `}</i>{i.time}
						</Typography>
					))}
				</Stack>

			</Stack>
		{/* </Container> */}
		</PageWrapper >
	);
};

export default AboutUs;
