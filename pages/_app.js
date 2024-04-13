import Layout from '@/src/components/layout/Layout';
import SubLayout from '@/src/components/layout/SubLayout';
import store from '@/src/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <SubLayout>
          <Component {...pageProps} />
        </SubLayout>
      </Layout>
    </Provider>
  );
}
