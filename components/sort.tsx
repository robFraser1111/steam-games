import React from "react";
import styled from "styled-components";

const Sorting = styled.div`
  width: 148px;

  select {
    margin-top: 8px;
  }

  label,
  select {
    display: block;
  }
`;

const Select = styled.select`
  background: white;
  border: none;
  padding: 5px;
`;

const sort = (props: { sortGames: (e: any) => void }) => {
  return (
    <Sorting>
      <label htmlFor="games">Sort games:</label>
      <Select onChange={props.sortGames} name="games">
        <option value="default">Default</option>
        <option value="name-ascending">Name ascending</option>
        <option value="name-descending">Name descending</option>
      </Select>
    </Sorting>
  );
};

export default sort;
