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

const sort = () => {
  return (
    <Sorting>
      <label htmlFor="games">Sort:</label>
      <select name="games">
        <option value="default">Default</option>
        <option value="name-ascending">Name ascending</option>
        <option value="name-descending">Name descending</option>
      </select>
    </Sorting>
  );
};

export default sort;
