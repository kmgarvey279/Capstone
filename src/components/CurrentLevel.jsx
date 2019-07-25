import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

function CurrentLevel(props){
  return (
    <div id="outer">
      <style jsx>{`
        div#outer {
          margin-left: auto;
          margin-right: auto;
          -webkit-column-count: 12;
          -moz-column-count: 12;
          column-count: 12;
          column-gap: 0px;
          width: 600px;
          height: 620px;
          max-height: 620px;
          min-height: 620px;
          max-width: 600px;
          min-width: 600px;
        }
        div#inner {
          position: relative;
          z-index: 0;
          width: 60px;
          max-width: 60px;
          min-width: 60px;
          height: 50px;
          max-height: 50px;
          min-height: 50px;
          vertical-align: top;
          display: inline-block;
        }
      `}</style>
      {Object.keys(props.currentLevel).map(function(squareId) {
        var square = props.currentLevel[squareId];
        return <div id="inner"><Square value={square.value}
            isYou={square.isYou}
            isEnemy={square.isEnemy}
            isProjectile={square.isProjectile}
            key={squareId}
            squareId={parseInt(squareId)}
            tileImage={square.tileImage}
            sprite={square.sprite}
            spriteIn={square.spriteIn}
            spriteOut={square.spriteOut}/>
        </div>;
      })}
    </div>
  );
}

CurrentLevel.propTypes = {
  currentLevel: PropTypes.object.isRequired
};

export default CurrentLevel;
