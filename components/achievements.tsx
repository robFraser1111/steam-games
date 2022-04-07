import { useState, useEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";

const Wrapper = styled.aside`
  h2 {
    padding: 20px;
  }
`;

const List = styled.ul`
  padding: 20px;

  list-style: none;

  li {
    margin-bottom: 4px;
  }

  svg {
    fill: ${(props) => props.theme.highlight};
    opacity: 0;
    width: 15px;
    height: 15px;
  }

  svg.achieved {
    opacity: 1;
  }
`;

type Default = typeof initAchievements;
const initAchievements = [];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Achievements = ({ user, appid, nameHandler }) => {
  const { data, error } = useSWR(
    `/api/achievements/${appid}/${user?.id}`,
    fetcher
  );
  const [gameAchievements, setGameAchievements] =
    useState<Default>(initAchievements);

  useEffect(() => {
    if (data) {
      setGameAchievements(data?.data?.playerstats?.achievements);

      // Update Game name in parent component from Achievements response
      nameHandler(data?.data?.playerstats?.gameName);
    }
  }, [data]);

  return (
    <Wrapper>
      <h2>Achievements</h2>
      <List>
        {gameAchievements != undefined ? (
          gameAchievements.map((item, index) => (
            <li key={index}>
              <svg
                className={item?.achieved === 1 ? "achieved" : ""}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
              </svg>{" "}
              {item?.apiname.toLowerCase().replaceAll("_", " ")}
            </li>
          ))
        ) : (
          <li>-</li>
        )}
      </List>
    </Wrapper>
  );
};

export default Achievements;
