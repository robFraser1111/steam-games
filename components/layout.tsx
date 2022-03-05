import Header from "./header";
import Footer from "./footer";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  /* Resets */
  * {
    margin: 0;
    padding: 0;
    scrollbar-color: #314985 black;
  }
  *::-webkit-scrollbar {
    background-color: black;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #314985;
  }
  a {
    text-decoration: none;
    color: inherit;
  }

`;

const theme = {
  // Colours
  darkBlue: "#171a21",
  blue: "#1a2a3c",
  lightBlue: "#314985",
  highlight: "#67c1f5",

  black: "#000000",
  white: "#ffffff",
  grey: "#8f98a0",

  // Animation
  transitionTime: "0.2s",

  // Breakpoints
  mobile: "320px",
  tablet: "768px",
  laptop: "1920px",
  desktop: "2560px",
};

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-rows: auto 1fr 100px;
  grid-template-columns: 100%;
  min-height: 100vh;
`;

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Header />
        {children}
        <Footer />
      </Wrapper>
    </ThemeProvider>
  );
}
