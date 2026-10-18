import Footer from '@/components/Footer';
import Header from '@components/Header';
import { Layout, theme } from 'antd';
import type { CSSProperties, FC } from 'react';
import { Outlet } from 'react-router';
import ScrollToTop from 'react-scroll-to-top';

const rootStyle: CSSProperties = {
  width: '100vw',
  overflowX: 'hidden',

}

const SiteLayout: FC = () => {
  const {token} = theme.useToken();

  return (
    <Layout style={rootStyle}>
      <Layout.Header
        style={{ backgroundColor: 'lightblue' }}
      >
        <Header />
      </Layout.Header>

      <Layout.Content
        style={{ padding: "24px 0px" }}
      >
        <Outlet />
      </Layout.Content>

      <Footer />
      <ScrollToTop smooth top={30} color={token.colorPrimary} />
    </Layout>
  );
};

export default SiteLayout;