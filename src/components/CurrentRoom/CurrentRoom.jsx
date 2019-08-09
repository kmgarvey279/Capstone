import React from 'react';
import PropTypes from 'prop-types';
import Square from '../Square/Square';
import './CurrentRoom.css';

function CurrentRoom(props){
  return (
    <div id="outer">
      {Object.keys(props.currentRoom).map(function(squareId) {
        var square = props.currentRoom[squareId];
        if (square.value == 'D'){
          return <div id="innerDoor"><Square value={square.value}
              content={square.content}
              key={squareId}
              squareId={parseInt(squareId)}
              tileImage={square.tileImage}
              sprite={square.sprite}
              transition={square.transition}
              alert={square.alert}
              player={props.player}/>
          </div>;
        } else {
        return <div id="inner"><Square value={square.value}
            content={square.content}
            key={squareId}
            squareId={parseInt(squareId)}
            tileImage={square.tileImage}
            sprite={square.sprite}
            transition={square.transition}
            alert={square.alert}
            player={props.player}/>
        </div>;
      }
      })}
    </div>
  );
}

CurrentRoom.propTypes = {
  currentRoom: PropTypes.object.isRequired,
  player: PropTypes.object
};

export default CurrentRoom;
