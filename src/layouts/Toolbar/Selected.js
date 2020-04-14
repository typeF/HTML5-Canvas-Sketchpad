import React from "react";
import styled from "styled-components";

const SelectedContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const SelectedMode = styled.div`
  border: 1px dotted white;
  height: 30px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const SelectedColor = styled(SelectedMode)`
  color: ${(props) => props.color};
`;

export default function ({ mode, color }) {
  return (
    <SelectedContainer mode={mode} color={color}>
      <SelectedMode>{mode.toUpperCase()}</SelectedMode>
      <SelectedColor color={color}>{color.toUpperCase()}</SelectedColor>
    </SelectedContainer>
  );
}
