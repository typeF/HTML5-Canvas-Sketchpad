import React from "react";
import "./App.css";
import styled from "styled-components";
import Canvas from "./layouts/Canvas/Canvas";
import Toolbar from "./layouts/Toolbar/Toolbar";

const ComponentContainer = styled.div``;

function App() {
  return (
    <div className="App">
      <header className="App-header">HTML5 Canvas Sketchpad</header>
      <ComponentContainer>
        <Toolbar />
        <Canvas />
      </ComponentContainer>
    </div>
  );
}

export default App;
