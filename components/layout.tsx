import Header from "./header";
import Footer from "./footer";
import styled from 'styled-components';

const Main = styled.main`
  display: grid;
  justify-content: center;
`;

export default function Layout({ children }) {
  return (
    <Main>
      <Header />
      <div>{children}</div>
      <Footer />
    </Main>
  );
}
