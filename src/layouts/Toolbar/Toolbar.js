import React from "react";
import styled from "styled-components";
import ModePanel from "./ModePanel";
import Palette from "./Palette";
import Selected from "./Selected";

const ToolbarContainer = styled.div`
  margin-left: 20px;
`;

export default function Toolbar({ color, setColor, mode, setMode }) {
  return (
    <ToolbarContainer>
      <Selected mode={mode} color={color} />
      <ModePanel mode={mode} setMode={setMode} />
      <Palette setColor={setColor} color={color} />
    </ToolbarContainer>
  );
}
