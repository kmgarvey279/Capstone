import * as roomConsts from '../../redux/modules/rooms/roomConstants';
import React from 'react';
import PropTypes from 'prop-types';
import './Door.css';

function Door(props){
  let doorArr = props.content.find(function(content) {
    return content[0] == 'door';
  });
  let door = props.doors[doorArr[1]];
  if (door.direction == 'north') {
    return (
      <div id="door">
        {roomConsts.sprites['lockedDoorNorth']}
      </div>
    )
  } else if (door.direction == 'east') {
    return (
      <div id="door">
        {roomConsts.sprites['lockedDoorEast']}
      </div>
    )
  }
}

Door.propTypes = {
  content: PropTypes.array,
  doors: PropTypes.object
};

export default Door;
