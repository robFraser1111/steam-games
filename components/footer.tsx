import styled from "styled-components";

const Wrapper = styled.footer`
  background: ${(props) => props.theme.darkBlue};
  color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;

  section {
    align-self: center;
  }

  u {
    transition: ${(props) => props.theme.transitionTime};
  }

  u:hover, u:focus {
    color: ${(props) => props.theme.highlight};
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <section>
        <h5>
          By{" "}
          <a
            href="https://github.com/robFraser1111/steam-games"
            target="_blank"
            rel="noreferrer"
          >
            <u>Rob Fraser</u>
          </a>
          , utilizing the{" "}
          <a
            href="https://steamcommunity.com/dev"
            target="_blank"
            rel="noreferrer"
          >
            <u>Steam API</u>
          </a>
        </h5>
      </section>
    </Wrapper>
  );
}
