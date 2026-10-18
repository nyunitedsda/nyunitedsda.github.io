import Footer from '@/components/Footer';
import Header from '@components/Header';
import { Layout } from 'antd';
import type { CSSProperties, FC } from 'react';
import { Outlet } from 'react-router';

const rootStyle: CSSProperties = {
  width: '100vw',
  overflowX: 'hidden',

}

const SiteLayout: FC = () => {

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
    </Layout>
  );
};

export default SiteLayout;