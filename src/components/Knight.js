import React, {Component} from 'react';
import PropTYpes from 'prop-types';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './../contants'

const knightSource = {
  beginDrag(props) {
    return {};
  } 
}

@DragSource(ItemTypes.KNIGHT, knightSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Knight extends Component {
  static propTypes = {
    connectDragSource: PropTYpes.func.isRequired,
    isDragging: PropTYpes.bool.isRequired
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(<div style={{opacity: isDragging ? .5 : 1, fontSize: 40, fontWeight: 'bold', cursor: 'move'}}>♘</div>)
  }
}

export default Knight