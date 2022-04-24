import { MyContext } from "../context/state";
import Layout from "../components/layout";
import "./_app.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <MyContext.Provider value={pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MyContext.Provider>
  );
};

export default MyApp;
