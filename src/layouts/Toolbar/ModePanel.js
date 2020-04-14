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
  padding: 0.2rem;
  border: 1px solid white;
  height: 30px;
  width: 100px;
  cursor: pointer;
  border-radius: 3px;
  margin-bottom: 8px;
`;

export default function ModePanel({ mode, setMode }) {
  const modes = ["freehand", "line", "rectangle", "move"];

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
