import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const CanvasContainer = styled.div`
  margin-right: 20px;
  margin-left: 20px;
`;

const CanvasEl = styled.canvas`
  background: white;
  border: 1px dashed white;
  // width: 100%;
  // height: 100%;
  border-radius: 3px;
`;

export default function Canvas({ color, mode }) {
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [shapes, setShapes] = useState([]);
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

  const saveShape = (shape) => {
    setShapes([...shapes, shape]);
  };

  const saveRectangle = () => {
    const width = currentX - initialX;
    const height = currentY - initialY;

    const rectangle = {
      // TODO: Replace with more robust id
      id: Math.floor(Math.random() * 1000),
      type: "rectangle",
      dimensions: {
        color,
        x: initialX,
        y: initialY,
        width,
        height,
      },
    };

    saveShape(rectangle);
  };

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

  const drawLine = () => {
    ctx.save();
    // TODO: Persist pervious shapes fn
    ctx.clearRect(0, 0, 1000, 1000);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.moveTo(initialX, initialY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    ctx.restore();
  };

  const draftRectangle = () => {
    const width = currentX - initialX;
    const height = currentY - initialY;

    // TODO: Persist pervious shapes fn
    ctx.clearRect(0, 0, 1000, 1000);
    const dimensions = {
      color,
      x: initialX,
      y: initialY,
      width,
      height,
    };
    drawRectangle(dimensions);
  };

  const drawRectangle = (dimensions) => {
    const { color, x, y, width, height } = dimensions;
    ctx.save();
    // TODO: Persist pervious shapes fn
    ctx.fillStyle = color;
    ctx.lineWidth = 1;
    ctx.fillRect(x, y, width, height);
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
          drawFreeHand();
          break;
        case "line":
          drawLine();
          break;
        case "rectangle":
          draftRectangle();
          break;
        default:
          break;
      }
      return;
    }
  };

  const mouseUp = (e) => {
    if (drawing) {
      switch (mode) {
        // case "freehand":
        //   drawFreeHand();
        //   break;
        // case "line":
        //   drawLine();
        //   break;
        case "rectangle":
          saveRectangle();
          break;
        default:
          break;
      }
    }

    setDrawing(false);
  };

  const mouseLeave = (e) => {
    setDrawing(false);
  };

  return (
    <CanvasContainer>
      <CanvasEl
        width="1000"
        height="600"
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
