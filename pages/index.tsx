import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "../components/search";
import Sort from "../components/sort";
import GameCards from "../components/gamesCards";
import styled from "styled-components";
import useSWR from "swr";
import router from "../lib/router";

import loginButton from "../public/steam-login-narrow-01.png";

const Main = styled.main`
  background: radial-gradient(
    ${(props) => props.theme.lightBlue},
    ${(props) => props.theme.blue}
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
  width: 148px;

  h3 {
    padding-top: 8px;
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

type FilteredGames = typeof initFilteredGames;
const initFilteredGames = [];

export default function Index({ user }) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);
  // List of games (removed ones with no pics)
  const [games, setGames] = useState<Games>(initGames);
  // List of filtered games for search
  const [filteredGames, setFilteredGames] =
    useState<FilteredGames>(initFilteredGames);

  // Only fetch games if user is logged in
  const { data, error } = useSWR(
    shouldFetch ? `/api/games/${user?.id}` : null,
    fetcher
  );

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

  // Handle search input
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearching(true);

    // Check if search term matches a name in the array
    setTimeout(function () {
      const newData = games.filter((game: { name: string }) =>
        game.name.toLowerCase().includes(e.target.value.toLowerCase())
      );

      // Set filtered data to new array if search result contains any games
      if (newData.length > 0) {
        setFilteredGames(newData);
      } else {
        setFilteredGames(initFilteredGames);
      }

      // Reset filtered data if there's no search term
      if (e.target.value === "") {
        setFilteredGames(initFilteredGames);
      }

      // Error checking
      if (e.target.value.length > 0 && newData.length === 0) {
        setSearchError(true);
      } else {
        setSearchError(false);
      }

      setSearching(false);
    }, 1500);
  };

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
              <h4>Games owned:</h4>
              <h3>{data?.data?.response?.game_count}</h3>
            </UserInfo>
            <Search handleSearch={handleSearch} searching={searching} />
            <Sort />
          </Details>
          <GameCards games={filteredGames.length > 0 ? filteredGames : games} />
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
