import { type SxProps, type Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import services from "../../constants/services";
import useFormattedRoutes from "../../hooks/routes/useFormattedRoutes";
import FooterSegment from "./components/FooterSegment";
import {
	CONTACT_DATA,
	CONTACT_US,
	COPYRIGHT,
	MOTTO,
	QUICK_LINKS,
	SERVICE_TIMES,
	TERMS_AND_POLICIES,
	WEBSITE_TITLE,
	socialMediaInfo,
} from "./footerData";

const footerSx: SxProps<Theme> = {
	bgcolor: "primary.main",
	color: "primary.contrastText",
	p: 2,
	width: "100%",
	"& a": {
		textDecoration: 'none',
		color: 'inherit',
	},
};

const menuSx: SxProps<Theme> = {
	"& a": {
		color: "inherit",
	}
}

const dividerSx: SxProps<Theme> = {
	my: 2,
	backgroundColor: theme => `${theme.palette.divider}`,
}

const Footer: FC = () => {
	const { menuItems } = useFormattedRoutes();

	return (
		<Box component="footer" sx={footerSx}>
			<Container maxWidth="lg">
				<Grid container spacing={4}>

					{/* Social Media */}
					<FooterSegment
						title={WEBSITE_TITLE}
						subtitle={MOTTO}
					>
						<>

							{
								TERMS_AND_POLICIES.map((i) => (
									<Typography
										component="a"
										href={i.href}
										key={i.content}
										target="_blank"
										variant="body2"
									>
										{i.content}
									</Typography>
								))
							}


							<Box display="flex" gap={1}>
								{
									socialMediaInfo.map((i) => (
										<IconButton
											aria-label={i.label}
											component="a"
											href={i.href}
											key={i.label}
											size='small'
											target="_blank"
											title={i.label}
										>
											{i.icon}
										</IconButton>
									))
								}
							</Box>


						</>
					</FooterSegment>

					{/* Menu */}
					<FooterSegment
						sx={menuSx}
						title={QUICK_LINKS} >
						{
							menuItems.map((i) => (
								<ListItem
									component={"a"}
									href={i.path}
									key={i.name}
									disablePadding
								>
									{i.name}
								</ListItem>
							))
						}
					</FooterSegment>

					{/* Services */}
					<FooterSegment
						title={SERVICE_TIMES}
					>
						{
							services.map((i) => (
								<Typography key={i.title} variant="body2" >
									<strong>{`${i.title}: `}</strong> {i.time}
								</Typography>
							))
						}
					</FooterSegment>

					{/* Contacts */}
					<FooterSegment
						title={CONTACT_US}
					>
						{
							CONTACT_DATA.map((i) => i.icon ? (
								<Box
									{...i.attributes}
									key={i.content}
								>
									{i.icon}
									<Typography variant="body2">{i.content}</Typography>
								</Box>
							) : (
								<Typography key={i.content} variant="body2">{i.content}</Typography>
							))
						}
					</FooterSegment>

				</Grid>

				<Divider sx={dividerSx} />

				<Typography variant="body2" align="center">
					&copy; {COPYRIGHT}
				</Typography>

			</Container>
		</Box >
	);
};

export default Footer;
