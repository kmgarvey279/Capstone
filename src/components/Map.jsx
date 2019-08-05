import React from 'react';
import PropTypes from 'prop-types';
import Room from './Room';

function Map(props) {
  return (
    <div id="outer">
      <style jsx>{`
        div#outer {
          position: fixed;
          z-index: 2000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          padding-top: 5%;
          overflow: auto;
        }

        div#inner {
          margin-top: 20px;
          width: 320px;
          min-width: 320px;
          max-width: 320px;
          height: 500px;
          margin-left: auto;
          margin-right: auto;
          min-height: 500px;
          max-height: 500px;
          text-align: center;
          z-index: 200;
          -webkit-column-count: 3;
          -moz-column-count: 3;
          column-count: 3;
        }

      `}</style>
      <div id="inner">
        {Object.keys(props.map).map(function(levelId) {
          var level = props.map[levelId];
          return <Room roomId={level.levelId}
          visited={level.visited}
          current={props.game.levelId}/>
        })};
      </div>
    </div>
  );
}

Map.propTypes = {
  game: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired
};

export default Map;
