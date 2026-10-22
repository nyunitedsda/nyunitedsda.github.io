import Footer from '@/components/Footer';
import { NotificationContext } from '@/contexts';
import Header from '@components/Header';
import { Layout, theme } from 'antd';
import { useContext, type CSSProperties, type FC } from 'react';
import { Outlet } from 'react-router';
import ScrollToTop from 'react-scroll-to-top';
import NotificationBanner from '../NotificationBanner';

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
        <NotificationBanner key={i.id} {...i} open />
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