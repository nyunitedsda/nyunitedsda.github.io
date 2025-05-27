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
    const pathMath = agreements.filter((i) => pathname.includes(i.tag))[0];

    if (
      (selectedTab === undefined || selectedTab === null) &&
      pathMath.href &&
      pathname
    ) {
      navigate(pathMath.href);
      setSelectedTab(pathMath.id);
    } else if (pathMath.href && selectedTab !== pathMath.id) {
      const path = agreements.filter((i) => i.id === selectedTab)[0]?.href;
      if (path) navigate(path);
    }
  }, [agreements, selectedTab]);

  const handleChange = useCallback(
    (_event: SyntheticEvent, newValue: string) => {
      const agreementId = parseInt(newValue);
      setSelectedTab(agreementId);
    },
    [],
  );

  return (
    <PageWrapper>
      <Tabs
        aria-label="Terms and policies"
        indicatorColor="primary"
        onChange={handleChange}
        textColor="primary"
        value={selectedTab}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        {agreements.map((i) => (
          <Tab key={i.label} value={i.id} label={i.label} />
        ))}
      </Tabs>

      {selectedTab ? (
        agreements.map((i) => (
          <TabPanel index={i.id} key={i.label} value={selectedTab}>
            <Box dangerouslySetInnerHTML={{ __html: i.content }} />
          </TabPanel>
        ))
      ) : (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      )}
    </PageWrapper>
  );
};

export default memo(UserAgreements);
