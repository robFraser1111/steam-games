import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import router from "../lib/router";

import loginButton from "../public/steam-login-narrow-01.png";

const Main = styled.main`
  background: radial-gradient(
    ${(props) => props.theme.lightBlue},
    ${(props) => props.theme.blue},
    ${(props) => props.theme.darkBlue}
  );
  color: ${(props) => props.theme.white};
  padding: 32px;
`;

const Login = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100%;
  color: ${(props) => props.theme.white};
`;

const Details = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 16px 64px 16px;
  display: flex;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  width: 300px;
`;

const Search = styled.div``;

const Filter = styled.div`
  width: 300px;
  text-align: right;
`;

const GameCards = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 32px 16px;

  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
`;

const GameCard = styled.div`
  width: 184px;
  height: 190px;
  background: ${(props) => props.theme.blue};
  cursor: pointer;
  overflow: hidden;
  transition: 0.2s;

  &:hover,
  &:focus {
    background: ${(props) => props.theme.lightBlue};
  }

  h4,
  h5 {
    padding: 8px;
  }
`;

const LoginButton = styled.div`
  transition: ${(props) => props.theme.transitionTime};
  border: solid 1px transparent;
  background: transparent;
  width: 109px;
  height: 66px;
  margin: 16px auto;

  &:hover,
  &:focus {
    cursor: pointer;
    border: solid 1px ${(props) => props.theme.highlight};
    background: ${(props) => props.theme.highlight};
  }
`;

const Controller = styled.span`
  font-size: 40px;
`;

const Message = styled.section`
  display: flex;
  justify-content: center;
  height: 100%;
  align-self: center;
  line-height: 2rem;

  h2 {
    align-self: center;
    text-align: center;
  }
`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Games = typeof initGames;
const initGames = [];

export default function Index({ user }) {
  const [shouldFetch, setShouldFetch] = useState(false);

  // Only fetch games if user is logged in
  const { data, error } = useSWR(
    shouldFetch ? `/api/games/${user?.id}` : null,
    fetcher
  );

  // List of filtered games
  const [games, setGames] = useState<Games>(initGames);

  // Check if user is logged in before fetching users games
  useEffect(() => {
    setShouldFetch((user as boolean) ?? false);
  }, [user]);

  useEffect(() => {
    if (data) {
      // Filter out items that don't have an image
      const filteredGames = data?.data?.response?.games.filter(
        (item) => item.img_logo_url !== "" && item.img_icon_url !== ""
      );

      setGames(filteredGames);
    }
  }, [data]);

  if (user && !data)
    return (
      <Main>
        <Message>
          <h2>Loading...</h2>
        </Message>
      </Main>
    );

  if (error)
    return (
      <Main>
        <Message>
          <h2>
            We couldn't load your games &#x1F622;
            <br />
            Try setting your{" "}
            <a
              href="https://steamcommunity.com/"
              target="_blank"
              rel="noreferrer"
            >
              <u>Steam Privacy Settings</u>
            </a>{" "}
            to <b>Public</b>.
          </h2>
        </Message>
      </Main>
    );

  return (
    <>
      {user ? (
        <Main>
          <Details>
            <UserInfo>
              <h2>Games owned: {data?.data?.response?.game_count}</h2>
            </UserInfo>
            <Search>Search</Search>
            <Filter>Filter and Sort</Filter>
          </Details>
          <GameCards>
            {games.map((game, index) => (
              <GameCard key={index}>
                <Link href={`/game/${game?.appid}`}>
                  <a>
                    <img
                      src={
                        game?.img_icon_url === ""
                          ? ""
                          : `https://media.steampowered.com/steamcommunity/public/images/apps/${game?.appid}/${game?.img_logo_url}.jpg`
                      }
                      alt={game?.name}
                    />
                    {/* Cut title off if it's too long */}
                    <h4>
                      {game?.name.length > 50
                        ? game?.name.substring(0, 50) + "..."
                        : game?.name}
                    </h4>
                    {/* Convert minutes to hours with 1 decimal point if playtime is more than 10 minutes */}
                    <h5>
                      Playtime:{" "}
                      {game?.playtime_forever > 10
                        ? (game?.playtime_forever / 60).toFixed(1) + " hours"
                        : "-"}
                    </h5>
                  </a>
                </Link>
              </GameCard>
            ))}
          </GameCards>
        </Main>
      ) : (
        <Main>
          <Login>
            <div>
              <h1>
                Sign in through Steam to view your games{" "}
                <Controller>&#x1f3ae;</Controller>
              </h1>
            </div>
            <div>
              <LoginButton>
                <Link href="/api/auth/login">
                  <Image
                    src={loginButton}
                    alt="Steam login"
                    width={109}
                    height={66}
                  />
                </Link>
              </LoginButton>
            </div>
          </Login>
        </Main>
      )}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  await router.run(req, res);
  return { props: { user: req.user || null } };
}
