import React from 'react';
import PropTypes from 'prop-types';
import Square from '../Square/Square';
import './CurrentRoom.css';

function CurrentRoom(props){
  return (
    <div id="outer">
      {Object.keys(props.currentRoom).map(function(squareId) {
        var square = props.currentRoom[squareId];
        return <div id="inner"><Square value={square.value}
            content={square.content}
            key={squareId}
            squareId={parseInt(squareId)}
            tileImage={square.tileImage}
            sprite={square.sprite}
            transition={square.transition}
            player={props.player}
            doors={props.doors}/>
        </div>;
      })}
    </div>
  );
}

CurrentRoom.propTypes = {
  currentRoom: PropTypes.object.isRequired,
  player: PropTypes.object,
  doors: PropTypes.object
};

export default CurrentRoom;
