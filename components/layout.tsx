import Header from "./header";
import Footer from "./footer";
import styled from 'styled-components';

const Main = styled.main`
  display: grid;
  justify-content: center;
  grid-template-rows: auto 1fr auto;
  max-wdith: 2560px;
  margin: 0 auto;
`;

export default function Layout({ children }) {
  return (
    <Main>
      <Header />
      <section>{children}</section>
      <Footer />
    </Main>
  );
}
