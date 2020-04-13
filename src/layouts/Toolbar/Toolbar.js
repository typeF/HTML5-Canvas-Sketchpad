import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Palette from "./Palette";

const ToolbarContainer = styled.div``;

export default function Toolbar({ color, setColor }) {
  return (
    <ToolbarContainer>
      <Palette setColor={setColor} color={color} />
    </ToolbarContainer>
  );
}
