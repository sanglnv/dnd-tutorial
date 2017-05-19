import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';

export default ({knightPosition}) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <div className="App-intro">
      <Board knightPosition={knightPosition} />
    </div>
  </div>
);
