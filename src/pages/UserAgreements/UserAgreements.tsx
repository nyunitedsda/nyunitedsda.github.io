import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import type { FC, SyntheticEvent } from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TabPanel from "../../components/TabPanel/TabPanel";
import { getTermsAndPolicies } from "./helpers";

const UserAgreements: FC = () => {
	const [selectedTab, setSelectedTab] = useState<number>();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const agreements = useMemo(() => getTermsAndPolicies(), []);

	useEffect(() => {
		const matchedAgreement = agreements.find(
			(i) => pathname.indexOf(i.tag) > -1,
		);

		if (!matchedAgreement) {
			navigate("/error");
		} else if (matchedAgreement.href && selectedTab !== matchedAgreement.id) {
			setSelectedTab(matchedAgreement.id);
		}
	}, [agreements, selectedTab, pathname, navigate]);

	const handleChange = useCallback(
		(_event: SyntheticEvent, newValue: string) => {
			try {
				const agreementId = parseInt(newValue);
				const path = agreements.filter((i) => i.id === agreementId)[0].href;
				if (path) navigate(path);
			} catch (error) {
				console.error(error);
			}
		},
		[],
	);

	return (
		<PageWrapper>
			{selectedTab ? (
				<>
					<Tabs
						aria-label="Terms and policies"
						// indicatorColor="primary"
						onChange={handleChange}
						// textColor="primary"
						value={selectedTab}
						sx={{
							borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
							'& .MuiTabs-indicator': {
								color: 'primary.light',
							},
							'& .Mui-selected': {
								color: theme => `${theme.palette.primary.light} !important`,
							}
						}}
					>
						{agreements.map((i) => (
							<Tab key={i.label} value={i.id} label={i.label} />
						))}
					</Tabs>
					{agreements.map((i) => (
						<TabPanel enableStack stackProps={{
							sx: {
								'& a': {
									color: 'primary.light',
								}
							}
						}}index={i.id} key={i.label} value={selectedTab}>
							{typeof i.content === "string" ? (
								<Box dangerouslySetInnerHTML={{ __html: i.content }} />
							) : (
								i.content
							)}
						</TabPanel>
					))}
				</>
			) : (
				<Skeleton variant="rectangular" width="100%" height="100%" />
			)}
		</PageWrapper>
	);
};

export default memo(UserAgreements);
