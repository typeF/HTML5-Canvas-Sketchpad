import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import Canvas from "./layouts/Canvas/Canvas";
import Toolbar from "./layouts/Toolbar/Toolbar";

const ComponentContainer = styled.div``;

function App() {
  const [color, setColor] = useState("black");
  const [mode, setMode] = useState("");

  return (
    <div className="App">
      <header className="App-header">HTML5 Canvas Sketchpad</header>
      <span>{color}</span>
      <br />
      <span>{mode}</span>
      <ComponentContainer>
        <Toolbar
          setColor={setColor}
          color={color}
          mode={mode}
          setMode={setMode}
        />
        <Canvas />
      </ComponentContainer>
    </div>
  );
}

export default App;
