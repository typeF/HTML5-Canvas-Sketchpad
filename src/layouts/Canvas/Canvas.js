import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const CanvasContainer = styled.div`
  margin-right: 20px;
  margin-left: 20px;
`;

const CanvasEl = styled.canvas`
  background: white;
  border: 1px dashed white;
  width: 300px;
  height: 300px;
  border-radius: 3px;
`;

export default function Canvas({ color, mode }) {
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const [leftOffset, setLeftOffset] = useState(0);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setLeftOffset(canvas.getBoundingClientRect().left);
    setTopOffset(canvas.getBoundingClientRect().top);
    setCtx(context);
  }, [canvasRef]);

  const offsetX = (x) => x - leftOffset;
  const offsetY = (y) => y - topOffset;

  const drawFreeHand = () => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.moveTo(initialX, initialY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    setInitialX(currentX);
    setInitialY(currentY);
    ctx.restore();
  };

  const mouseDown = (e) => {
    const { clientX, clientY } = e;
    setInitialX(offsetX(clientX));
    setInitialY(offsetY(clientY));
    setDrawing(true);
  };

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    setCurrentX(offsetX(clientX));
    setCurrentY(offsetY(clientY));

    if (drawing) {
      switch (mode) {
        case "freehand":
          console.log("freehand");
          drawFreeHand();
          break;
        default:
          break;
      }
      return;
    }
  };

  const mouseUp = (e) => {
    setDrawing(false);
  };

  const mouseLeave = (e) => {
    setDrawing(false);
  };

  return (
    <CanvasContainer>
      <CanvasEl
        id="canvas"
        ref={canvasRef}
        onMouseDown={(e) => mouseDown(e)}
        onMouseMove={(e) => mouseMove(e)}
        onMouseUp={(e) => mouseUp(e)}
        onMouseLeave={(e) => mouseLeave(e)}
      >
        Canvas
      </CanvasEl>
    </CanvasContainer>
  );
}
