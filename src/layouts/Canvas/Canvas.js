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
  const [freeHandPoints, setFreeHandPoints] = useState([]);
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

  const saveLine = () => {
    const line = {
      // TODO: Replace with more robust id
      id: Math.floor(Math.random() * 1000),
      type: "line",
      dimensions: {
        color,
        x1: initialX,
        y1: initialY,
        x2: currentX,
        y2: currentY,
      },
    };

    saveShape(line);
  };

  const saveFreehand = () => {
    const freehand = {
      // TODO: Replace with more robust id
      id: Math.floor(Math.random() * 1000),
      type: "freehand",
      dimensions: {
        color,
        freeHandPoints,
      },
    };

    saveShape(freehand);
  };

  const draftFreeHand = () => {
    const point = [
      [initialX, initialY],
      [currentX, currentY],
    ];

    const dimensions = {
      color,
      freeHandPoints: [point],
    };

    drawFreeHand(dimensions);

    setFreeHandPoints([...freeHandPoints, point]);

    setInitialX(currentX);
    setInitialY(currentY);
  };

  const drawFreeHand = (dimensions) => {
    const { color, freeHandPoints } = dimensions;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    freeHandPoints.forEach((freeHandPoint) => {
      const [start, end] = freeHandPoint;
      const [x1, y1] = start;
      const [x2, y2] = end;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });

    ctx.restore();
  };

  const draftLine = () => {
    ctx.clearRect(0, 0, 1000, 1000);
    drawExistingShapes();

    const dimensions = {
      color,
      x1: initialX,
      y1: initialY,
      x2: currentX,
      y2: currentY,
    };

    drawLine(dimensions);
  };

  const drawLine = (dimenions) => {
    const { color, x1, y1, x2, y2 } = dimenions;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  };

  const drawExistingShapes = () => {
    shapes.forEach((shape) => {
      const { type, dimensions } = shape;
      switch (type) {
        case "freehand":
          drawFreeHand(dimensions);
          break;
        case "line":
          drawLine(dimensions);
          break;
        case "rectangle":
          drawRectangle(dimensions);
          break;
        default:
          break;
      }
    });
  };

  const draftRectangle = () => {
    const width = currentX - initialX;
    const height = currentY - initialY;

    ctx.clearRect(0, 0, 1000, 1000);
    drawExistingShapes();

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

    switch (mode) {
      case "freehand":
        setFreeHandPoints([]);
        break;
      default:
        break;
    }
  };

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    setCurrentX(offsetX(clientX));
    setCurrentY(offsetY(clientY));

    if (drawing) {
      switch (mode) {
        case "freehand":
          draftFreeHand();
          break;
        case "line":
          draftLine();
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
        case "freehand":
          saveFreehand();
          break;
        case "line":
          saveLine();
          break;
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
    if (drawing) {
      switch (mode) {
        case "freehand":
          saveFreehand();
          break;
        case "line":
          saveLine();
          break;
        case "rectangle":
          saveRectangle();
          break;
        default:
          break;
      }
    }
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
