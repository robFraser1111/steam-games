import { useState, useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";

const List = styled.ul`
  list-style: none;
`;

type Default = typeof initAchievements;
const initAchievements = [];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Achievements = ({ user, appid }) => {
  const { data, error } = useSWR(
    `/api/achievements/${appid}/${user?.id}`,
    fetcher
  );
  const [gameAchievements, setGameAchievements] =
    useState<Default>(initAchievements);

  useEffect(() => {
    if (data) {
      setGameAchievements(data?.data?.playerstats?.achievements);
    }
  }, [data]);

  return (
    <div>
      <h2>Achievements</h2>
      <List>
        {gameAchievements != undefined ? (
          gameAchievements.map((item, index) => (
            <li key={index}>{item?.name.toLowerCase().replaceAll("_", " ")}</li>
          ))
        ) : (
          <li>-</li>
        )}
      </List>
    </div>
  );
};

export default Achievements;
