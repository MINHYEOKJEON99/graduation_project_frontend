import Layout from '@/src/components/layout/Layout';
import SubLayout from '@/src/components/layout/SubLayout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <SubLayout>
        <Component {...pageProps} />
      </SubLayout>
    </Layout>
  );
}
