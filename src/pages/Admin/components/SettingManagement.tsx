import { PageTitle } from "@components/PageWrapper";
import ProjectCard from "@components/ProjectCard";
import { PasswordEditor } from "@forms/collection";
import { useAuthentication } from "@hooks/auth";
import { Person3Outlined, SecurityOutlined } from "@mui/icons-material";
import { Button, capitalize } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { type FC, useCallback, useMemo, useState } from "react";
import type { UserDT } from "@/api";

const TITLE = "Settings";
const SUBHEADER = "Manage your account settings and preferences";

const SettingManagement: FC = () => {
	const { user } = useAuthentication();

	const [changePasswordOpen, setChangePasswordOpen] = useState<UserDT | null>(
		null,
	);

	const settings = useMemo(() => {
		return [
			{
				title: "Account",
				icon: <Person3Outlined color="primary" />,
				description: "Manage your account information and preferences",
				action: user?.is_system
					? undefined
					: {
							label: "Edit Account",
							onClick: () => console.log("Edit Account"),
						},
				content: (
					<>
						{user &&
							[
								"username",
								"first_name",
								"last_name",
								"email",
								"role_name",
								"last_login",
							].map((field) =>
								user[field as keyof UserDT] ? (
									<Typography key={field} variant="body1">
										<strong>{capitalize(field.replace(/_/g, " "))}:</strong>{" "}
										{field === "last_login" && user[field as keyof UserDT]
											? dayjs(user[field as keyof UserDT] as string).format(
													"MMMM D, YYYY",
												)
											: typeof user[field as keyof UserDT] === "object" &&
													user[field as keyof UserDT] instanceof Date
												? (user[field as keyof UserDT] as Date).toISOString()
												: String(user[field as keyof UserDT] ?? "N/A")}
									</Typography>
								) : undefined,
							)}
					</>
				),
			},
			{
				title: "Security",
				icon: <SecurityOutlined color="primary" />,
				description: "Manage your security settings and preferences",
				action: user?.is_system
					? undefined
					: {
							label: "Change Password",
							onClick: () => setChangePasswordOpen(user as UserDT),
							disabled: user?.is_system,
						},
				content: (
					<>
						{user &&
							["is_active"].map((field) => (
								<Typography key={field} variant="body1">
									<strong>{capitalize(field.replace(/_/g, " "))}:</strong>{" "}
									{capitalize(String(user[field as keyof UserDT] ?? "N/A"))}
								</Typography>
							))}
					</>
				),
			},
		];
	}, [user]);

	const handleSuccess = useCallback(() => {
		setChangePasswordOpen(null);
	}, []);

	return (
		<Stack
			sx={{
				width: "100%",
				flexGrow: 1,
				"& .MuiPaper-root": {
					width: "100%",
					maxWidth: "unset",
					boxShadow: "none",
				},
			}}
			spacing={2}
		>
			<PageTitle title={TITLE} subtitle={SUBHEADER} />
			{settings.map((i) => (
				<ProjectCard
					key={`settings-card-${i.title}`}
					header={{
						title: (
							<Stack direction="row" alignItems="flex-start" gap={1}>
								{" "}
								{i.icon}
								{i.title}{" "}
							</Stack>
						),
						subheader: i.description,
					}}
					content={
						<Stack
							justifyContent="space-between"
							alignItems="center"
							direction="row"
						>
							<Stack>{i.content}</Stack>
							{i.action && (
								<Button
									variant="outlined"
									color="primary"
									onClick={i.action.onClick}
									size="large"
									sx={{ height: "40px" }}
									disabled={i.action.disabled}
								>
									{i.action.label}
								</Button>
							)}
						</Stack>
					}
				/>
			))}
			{changePasswordOpen && (
				<PasswordEditor
					open={!!changePasswordOpen}
					data={changePasswordOpen as UserDT}
					onClose={() => setChangePasswordOpen(null)}
					onSuccess={handleSuccess}
					type="user"
					confirmOnSave={true}
				/>
			)}
		</Stack>
	);
};

export default SettingManagement;
