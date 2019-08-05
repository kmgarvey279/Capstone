import React from 'react';
import PropTypes from 'prop-types';
import CurrentLevel from './CurrentLevel';
import Textboxes from './Textboxes';
import GameUITop from './GameUITop';
import Map from './Map';
import GameOver from './GameOver';

function Game(props){

  if (props.game.gameState === 'paused') {
    return (
      <div>
      <style jsx>{`
        div {
          text-align: center;
          background-color: black;
        }
        div#level {
          -webkit-filter: blur(5px);
          filter: blur(5px) grayscale(100%) sepia(100%) hue-rotate(130deg);
        }
        `}</style>
        <Map map={props.map} game={props.game} />
        <GameUITop player={props.player}/>
        <div id='level'><CurrentLevel currentLevel={props.currentLevel} player={props.player}/></div>
      </div>
    );
  } else if (props.game.gameState === 'gameOver') {
    return (
      <div>
      <GameOver
      menu={props.menu}
      player={props.player}
      handleStart={props.handleStart}/>
      </div>
    );
  } else if (props.game.gameState === 'dialogue') {
    return (
      <div>
      <style jsx>{`
        div {
          text-align: center;
          background-color: black;
        }
        `}</style>
        <GameUITop player={props.player}/>
        <div id='level'><CurrentLevel currentLevel={props.currentLevel} player={props.player}/></div>
        <Textboxes game={props.game} player={props.player}/>
      </div>
    );
  } else if (props.game.gameState === 'building') {
    return (
      <div>
      <style jsx>{`
        div {
          height: 600px;
          width: 600px;
          text-align: center;
          background-color: black;
        }
        `}</style>
      </div>
    );
  } else {
    return (
      <div>
      <style jsx>{`
        div {
          text-align: center;
          background-color: black;
        }
        `}</style>
        <GameUITop player={props.player}/>
        <div id='level'><CurrentLevel currentLevel={props.currentLevel} player={props.player}/></div>
      </div>
    );
  }
}

Game.propTypes = {
  currentLevel: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired
};

export default Game;
