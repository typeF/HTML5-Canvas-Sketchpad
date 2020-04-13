import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const CanvasContainer = styled.div`
  margin-right: 20px;
  margin-left: 20px;
`;

const CanvasEl = styled.canvas`
  background: white;
  border: 1px dashed white;
  width: 1000px;
  height: 80vh;
  border-radius: 3px;
`;

export default function Canvas({ color, mode }) {
  const [ctx, setCtx] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    setCtx(context);
  }, [canvasRef]);

  const draw = () => {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(20, 20, 100, 100);
    ctx.restore();
  };

  return (
    <CanvasContainer>
      <CanvasEl id="canvas" ref={canvasRef} onClick={() => draw()}>
        Canvas
      </CanvasEl>
    </CanvasContainer>
  );
}
