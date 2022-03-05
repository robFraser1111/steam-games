import { MyContext } from "../context/state";
import Layout from "../components/layout";
import "./_app.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <MyContext.Provider value={pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MyContext.Provider>
  );
}
