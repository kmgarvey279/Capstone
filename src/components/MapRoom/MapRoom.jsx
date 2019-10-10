import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './MapRoom.css';

function MapRoom(props){
  if (props.roomId < 0) {
    return (
      <div id="empty">
      </div>
    )
  } else if (props.current == props.roomId) {
    return (
      <div id="current">
      </div>
    )
  } else if (props.visited == true) {
    return (
      <div id="visited">
      </div>
    )
  } else {
    return (
      <div id="unvisited">
      </div>
    )
  }
}

MapRoom.propTypes = {
  roomId: PropTypes.number.isRequired,
  visited: PropTypes.bool.isRequired,
  current: PropTypes.number.isRequired
};

export default MapRoom;
