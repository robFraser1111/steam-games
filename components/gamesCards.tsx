import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import gamePlaceholder from "../public/steam-game-placeholder-01.png";

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
  box-shadow: 0px 4px 10px 4px black;
  transition: 0.2s;

  &:hover,
  &:focus {
    background: ${(props) => props.theme.lightBlue};
    box-shadow: 0px 4px 10px 8px black;
  }

  h4,
  h5 {
    padding: 8px;
  }
`;

const gamesCards = (props) => {
  return (
    <GameCards>
      {/* Display error if search result is null */}
      {props.searchError ? (
        <h4>
          Could not find any games, try searching for another title or clearing
          the search box.
        </h4>
      ) : (
        props.games.map((game, index) => (
          <GameCard key={index} title={"App ID: " + game?.appid}>
            <Link href={`/game/${game?.appid}`}>
              <a>
                <img
                  src={
                    game?.img_logo_url === undefined
                      ? gamePlaceholder.src
                      : `https://media.steampowered.com/steamcommunity/public/images/apps/${game?.appid}/${game?.img_logo_url}.jpg`
                  }
                  alt={game?.name}
                />
                {/* Cut title off if it's too long */}
                <h4>
                  {game?.name.length > 30
                    ? game?.name.substring(0, 30) + "..."
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
        ))
      )}
    </GameCards>
  );
};

export default gamesCards;
