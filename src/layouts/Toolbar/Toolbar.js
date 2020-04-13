import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ModePanel from "./ModePanel";
import Palette from "./Palette";

const ToolbarContainer = styled.div`
  margin-left: 20px;
`;

export default function Toolbar({ color, setColor, mode, setMode }) {
  return (
    <ToolbarContainer>
      <ModePanel mode={mode} setMode={setMode} />
      <Palette setColor={setColor} color={color} />
    </ToolbarContainer>
  );
}
