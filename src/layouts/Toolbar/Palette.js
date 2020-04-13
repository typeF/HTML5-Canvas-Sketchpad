import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const PaletteContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
  width: 120px;
  margin-left: 10px;
`;

const ColorSelect = styled.div`
  background: ${(props) => props.color};
  width: 20px;
  height: 20px;
  border-radius: 10px;
  cursor: pointer;
`;

export default function Palette({ color, setColor }) {
  const colourRange = [
    "black",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
  ];

  return (
    <PaletteContainer>
      {colourRange.map((colour) => (
        <ColorSelect color={colour} onClick={() => setColor(colour)} />
      ))}
    </PaletteContainer>
  );
}
