import { ErrorOutlineOutlined, RefreshOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { type FC, useCallback, useMemo } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import useFormattedRoutes from "../../hooks/routes/useFormattedRoutes";
import type { ErrorProps } from "./types";

const HOME = "Home";

const Error: FC<ErrorProps> = (props) => {
	const {} = props;

	const { menuItems } = useFormattedRoutes();

	const homeRoute = useMemo(() => {
		return menuItems.filter((i) => i.name === HOME)[0];
	}, [menuItems]);

	const refreshPage = useCallback(() => {
		window.location.reload();
	}, []);

	return (
		<PageWrapper>
			<Stack
				spacing={3}
				sx={{
					textAlign: "center",
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
					gap: 3,
				}}
				className="fade-in"
			>
				<ErrorOutlineOutlined
					sx={{ fontSize: 80, color: "error.main", mb: 2 }}
				/>

				<Typography
					variant="h2"
					component="h1"
					sx={{ mb: 2, fontWeight: "bold" }}
				>
					{"Something Went Wrong"}
				</Typography>

				<Typography variant="h5" sx={{ mb: 4, color: "text.secondary" }}>
					{" We apologize for the inconvenience"}
				</Typography>

				<Typography
					component={"blockquote"}
					variant="body1"
					dangerouslySetInnerHTML={{
						__html:
							'"The LORD is my strength and my shield; my heart trusts in him, and he helps me." - <i>Psalm 28:7</i>',
					}}
				/>

				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: 3,
						flexWrap: "wrap",
						p: 2,
						width: "100%",
					}}
				>
					<Button
						color="secondary"
						onClick={refreshPage}
						size="large"
						startIcon={<RefreshOutlined />}
						variant="outlined"
					>
						{"Refresh Page"}
					</Button>

					<Button
						autoFocus
						color="primary"
						component={"a"}
						href={homeRoute.path}
						size="large"
						startIcon={homeRoute.icon}
						variant="contained"
					>
						{`Return to ${homeRoute.name}`}
					</Button>
				</Box>
			</Stack>
		</PageWrapper>
	);
};

export default Error;
