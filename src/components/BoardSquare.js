import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { canMoveKnight, moveKnight } from './../Game';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './../contants';

const squareTarget = {
  drop(props, monitor) {
    moveKnight(props.x, props.y);
  },
  canDrop(props) {
    return canMoveKnight(props.x, props.y);
  }
}

@DropTarget(ItemTypes.KNIGHT, squareTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class BoardSquare extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  }

  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }

  render() {
    const { x, y, connectDropTarget, isOver, canDrop, children } = this.props;
    const black = (x + y) % 2 === 1;
    return connectDropTarget(
      <div style={{position: 'relative', width: '100%', height: '100%'}}>
        <Square black={black}>
          {children}
        </Square>
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}

export default BoardSquare;