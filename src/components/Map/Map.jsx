import React from 'react';
import PropTypes from 'prop-types';
import MapRoom from '../MapRoom/MapRoom';
import './Map.css';

function Map(props) {
  return (
    <div id="outerMap">
      <div id="innerMap">
        {Object.keys(props.maps).map(function(roomId) {
          var room = props.maps[roomId];
          return <MapRoom roomId={room.roomId}
          visited={room.visited}
          current={props.game.roomId}/>
        })}
      </div>
      <div id="mapKey">
        <h4> ???: Cryonic Storage Facility | Floor: B1</h4>
      </div>
    </div>
  );
}

Map.propTypes = {
  game: PropTypes.object.isRequired,
  maps: PropTypes.object.isRequired
};

export default Map;
