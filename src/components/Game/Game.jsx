import React from 'react';
import PropTypes from 'prop-types';
import CurrentRoom from '../CurrentRoom/CurrentRoom';
import Textboxes from '../Textboxes/Textboxes';
import GameUITop from '../GameUITop/GameUITop';
import Map from '../Map/Map';
import GameOver from '../GameOver/GameOver';
import './Game.css';

function Game(props){

  if (props.game.gameState === 'paused') {
    return (
      <div id="game">
        <Map maps={props.maps} game={props.game} />
        <GameUITop player={props.player}/>
        <div id='pause'><CurrentRoom currentRoom={props.currentRoom} player={props.player} doors={props.doors}/></div>
      </div>
    );
  } else if (props.game.gameState === 'gameOver') {
    return (
      <div id="game">
      <GameOver
      menu={props.menu}
      player={props.player}
      handleStart={props.handleStart}/>
      </div>
    );
  } else if (props.game.gameState === 'dialogue') {
    return (
      <div id="game">
        <GameUITop player={props.player}/>
        <div id='level'><CurrentRoom currentRoom={props.currentRoom} player={props.player} doors={props.doors}/></div>
        <Textboxes text={props.text}/>
      </div>
    );
  } else if (props.game.gameState === 'building') {
    return (
      <div id="loading">
      </div>
    );
  } else {
    return (
      <div id="game">
        <GameUITop player={props.player}/>
        <div id='level'><CurrentRoom currentRoom={props.currentRoom} player={props.player} doors={props.doors}/></div>
      </div>
    );
  }
}

Game.propTypes = {
  currentRoom: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  maps: PropTypes.object.isRequired,
  doors: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired
};

export default Game;
