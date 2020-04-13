import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const CanvasContainer = styled.div``;

export default function Canvas() {
  return (
    <CanvasContainer>
      <canvas id="canvas">Canvas</canvas>
    </CanvasContainer>
  );
}
