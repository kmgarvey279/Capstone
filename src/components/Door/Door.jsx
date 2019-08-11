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
    if (door.isLocked === true) {
      return (
        <div id="doorNorth">
          {roomConsts.sprites['lockedDoorNorth']}
        </div>
      )
    } else if (door.status == 'closing') {
      return (
        <div id="doorNorth">
          {roomConsts.sprites['closingDoorNorth']}
        </div>
      )
    } else if (door.status == 'closed') {
      return (
        <div id="doorNorth">
          {roomConsts.sprites['unlockedDoorNorth']}
        </div>
      )
    } else if (door.status == 'opening'){
      return (
        <div id="doorNorth">
          {roomConsts.sprites['openingDoorNorth']}
        </div>
      )
    } else if (door.status == 'open'){
      return (
        <div id="doorNorth">
          {roomConsts.sprites['openDoorNorth']}
        </div>
      )
    }
  } else if (door.direction == 'east') {
    return (
      <div id="doorEast">
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
