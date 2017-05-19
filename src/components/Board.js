import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import Knight from './Knight';
import { canMoveKnight, moveKnight } from './../Game';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from './BoardSquare'

@DragDropContext(HTML5Backend)
class Board extends Component {
  static propTypes = {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  };

  renderSquare = (i) => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (
      <div 
        key={i} 
        onClick={() => canMoveKnight(x, y) && moveKnight(x, y)}
        style={{width: '12.5%', height: '65px'}}>
        <BoardSquare x={x} y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    )
  }

  renderPiece = (x, y) => {
    const { knightPosition: [knightX, knightY] } = this.props;
    if (x === knightX && y === knightY) {
      return <Knight />
    }
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }
    return (
      <div style={{width: '40%', height: '100%', display: 'flex', flexWrap: 'wrap'}}>
        {squares}
      </div>
    );
  }
}

export default Board;