import Link from "next/link";
import { useState, useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import router from "../lib/router";

const GameCards = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GameCard = styled.div`
  width: 184px;
  height: 200px;
`;


type Games = typeof initGames;
const initGames = [];



export default function Index({ user }) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/games/${user?.id}`, fetcher);
  const [games, setGames] = useState<Games>(initGames);

  useEffect(() => {
    if (data) {
      // Filter out items that don't have an image
      const filteredGames = data?.data?.response?.games.filter(
        (item) => item.img_logo_url !== "" && item.img_icon_url !== ""
      );

      setGames(filteredGames);
    }
  }, [data]);

  return (
    <>
      {user ? (
        <GameCards>
          {games.map((game, index) => (
            <GameCard key={index}>
              <p>{game?.name}</p>
              <Link href={`/game/${game?.appid}`}>
                <img
                  src={
                    game?.img_icon_url === ""
                      ? ""
                      : `https://media.steampowered.com/steamcommunity/public/images/apps/${game?.appid}/${game?.img_logo_url}.jpg`
                  }
                  alt={game?.name}
                />
              </Link>
            </GameCard>
          ))}
        </GameCards>
      ) : (
        <div>
          Welcome!
          <br />
          <Link href="/api/auth/login">Login</Link>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  await router.run(req, res);
  return { props: { user: req.user || null } };
}
