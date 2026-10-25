import Header from '@components/Header';
import { Alert, type AlertProps, Layout, theme } from 'antd';
import { type CSSProperties, type FC, useContext } from 'react';
import Marquee from "react-fast-marquee";
import { Outlet } from 'react-router';
import ScrollToTop from 'react-scroll-to-top';
import Footer from '@/components/Footer';
import { NotificationContext } from '@/contexts';

const rootStyle: CSSProperties = {
  minHeight: '100%',
  overflowX: 'hidden',
  width: '100%',
}

const contentStyle: CSSProperties = {
  flex: 1,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  minHeight: '100%',
  padding: "24px 0px",
}

const SiteLayout: FC = () => {
  const { token } = theme.useToken();
  const { notifications } = useContext(NotificationContext);

  return (
    <Layout style={rootStyle}>
      {notifications.map((i) => (
        <Alert
          key={i.id}
          title={i.title}
          description={
            <Marquee>{i.message}</Marquee>
          }
          closable
          styles={{
            title: {
              fontWeight: 'bold',
              color: 'AccentColor'
            },
            description: {
              // color: 'AccentColor'
            }
          }}
          style={{ borderRadius: 0 }}
          type={(i?.severity_color ?? 'info') as AlertProps['type']}
          banner
        />
      ))}

      <Header />

      <Layout.Content
        style={{ ...contentStyle, maxWidth: `${token.screenXL}px` }}
      >
        <Outlet />
      </Layout.Content>

      <Footer />
      <ScrollToTop smooth top={30} color={token.colorPrimary} />
    </Layout>
  );
};

export default SiteLayout;