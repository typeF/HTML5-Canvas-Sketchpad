import React from "react";
import styled from "styled-components";

const ModeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  margin-bottom: 20px;
`;

const ModeSelect = styled.div`
  color: white;
  border: 1px solid white;
  height: 20px;
  width: 80px;
  cursor: pointer;
  border-radius: 3px;
  margin-bottom: 5px;
`;

export default function ModePanel({ mode, setMode }) {
  const modes = ["freehand", "line", "box"];

  return (
    <ModeContainer>
      {modes.map((mode) => (
        <ModeSelect key={mode} onClick={() => setMode(mode)}>
          {mode}
        </ModeSelect>
      ))}
    </ModeContainer>
  );
}
