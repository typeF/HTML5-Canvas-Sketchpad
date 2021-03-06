import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import Canvas from "./layouts/Canvas/Canvas";
import Toolbar from "./layouts/Toolbar/Toolbar";

const ComponentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80vh;
  width: 80vw;
`;

function App() {
  const [color, setColor] = useState("black");
  const [mode, setMode] = useState("freehand");

  return (
    <div className="App">
      <header className="App-header">HTML5 Canvas Sketchpad</header>
      <br />
      <ComponentContainer>
        <Toolbar
          setColor={setColor}
          color={color}
          mode={mode}
          setMode={setMode}
        />
        <Canvas mode={mode} color={color} />
      </ComponentContainer>
    </div>
  );
}

export default App;
