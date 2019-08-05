import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

function CurrentLevel(props){
  return (
    <div id="outer">
      <style jsx>{`
        div#outer {
          margin-top: 15px;
          margin-left: auto;
          margin-right: auto;
          -webkit-column-count: 12;
          -moz-column-count: 12;
          column-count: 12;
          column-gap: 0px;
          width: 605px;
          height: 624px;
          max-height: 624px;
          min-height: 624px;
          max-width: 605px;
          min-width: 605px;
        }
        div#inner {
          position: relative;
          z-index: 0;
          width: 60px;
          max-width: 60px;
          min-width: 60px;
          height: 52px;
          max-height: 52px;
          min-height: 52px;
          vertical-align: top;
          display: inline-block;
        }
      `}</style>
      {Object.keys(props.currentLevel).map(function(squareId) {
        var square = props.currentLevel[squareId];
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
      })}
    </div>
  );
}

CurrentLevel.propTypes = {
  currentLevel: PropTypes.object.isRequired,
  player: PropTypes.object
};

export default CurrentLevel;
