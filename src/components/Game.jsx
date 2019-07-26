import React from 'react';
import PropTypes from 'prop-types';
import CurrentLevel from './CurrentLevel';
import GameUITop from './GameUITop';
import GameUIBottom from './GameUIBottom';

function Game(props){

  if (props.game.gameState === 'paused') {
    return (
      <div id="game">
      <style jsx>{`
        div#game {
          text-align: center;
          background-color: black;
          filter: gray;
          -webkit-filter: grayscale(1);
          filter: grayscale(1);
        }
        div#ui {
          border: 3px solid darkblue;
          background-color: lightblue;
          height: 150px;
          max-height: 150px;
          min-height: 150px;
          min-width: 560px;
          max-width: 560px;
          width: 560px;
          columns: 3 auto;
          column-gap: 10px;
          break-inside: avoid-column;
          margin-left: auto;
          margin-right: auto;
          margin-top: -35px;
          text-align: center;
          z-index: 20;
          left: 0;
          right: 0;
          position: absolute;
        }
        `}</style>
        <GameUITop player={props.player}/>
        <CurrentLevel currentLevel={props.currentLevel} player={props.player}/>
        <div id="ui"><GameUIBottom game={props.game} player={props.player}/></div>
      </div>
    );
  } else {
    return (
      <div id="game">
      <style jsx>{`
        div#game {
          text-align: center;
          background-color: black;
          height: 800px;
        }
        div#ui {
          border: 3px solid darkblue;
          background-color: lightblue;
          height: 150px;
          max-height: 150px;
          min-height: 150px;
          min-width: 560px;
          max-width: 560px;
          width: 560px;
          columns: 3 auto;
          column-gap: 10px;
          break-inside: avoid-column;
          margin-left: auto;
          margin-right: auto;
          margin-top: -35px;
          text-align: center;
          z-index: 20;
          left: 0;
          right: 0;
          position: absolute;
        }
        `}</style>
        <GameUITop player={props.player}/>
        <CurrentLevel currentLevel={props.currentLevel} player={props.player}/>
        <div id="ui"><GameUIBottom game={props.game} player={props.player}/></div>
      </div>
    );
  }
}

Game.propTypes = {
  currentLevel: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default Game;
