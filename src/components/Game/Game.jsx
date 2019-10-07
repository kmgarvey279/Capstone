import React from 'react';
import PropTypes from 'prop-types';
import CurrentRoom from '../CurrentRoom/CurrentRoom';
import Textboxes from '../Textboxes/Textboxes';
import GameUITop from '../GameUITop/GameUITop';
import BossUI from '../BossUI/BossUI';
import Map from '../Map/Map';
import GameOver from '../GameOver/GameOver';
import ItemGet from '../ItemGet/ItemGet';
import PopUp from '../PopUp/PopUp';
import './Game.css';
import Music from '../Music/Music';
import SFX from '../SFX/SFX';

function Game(props){
  if (props.game.gameState === 'paused') {
    return (
      <div className="game">
        <Map maps={props.maps} game={props.game} />
        <GameUITop player={props.player}/>
        <div id='pause'><CurrentRoom currentRoom={props.currentRoom} game={props.game} player={props.player} doors={props.doors}/></div>
      </div>
    );
  } else if (props.game.gameState === 'gameOver') {
    return (
      <div className="game">
      <GameOver
      menu={props.menu}
      player={props.player}
      handleStart={props.handleStart}/>
      </div>
    );
  } else if (props.game.gameState === 'exitBranch') {
    return (
      <div className="game" id="exit">
        <GameUITop player={props.player}/>
        <div id='level'><CurrentRoom currentRoom={props.currentRoom} game={props.game} player={props.player} doors={props.doors}/></div>
      </div>
    );
  } else if (props.game.gameState === 'dialogue') {
    return (
      <div className="game">
        <GameUITop player={props.player}/>
        <div id='level'><CurrentRoom game={props.game} currentRoom={props.currentRoom} player={props.player} doors={props.doors}/></div>
        <Textboxes text={props.text} game={props.game} menu={props.menu}/>
      </div>
    );
  } else if (props.game.gameState === 'building') {
    return (
      <div id="loading">
      </div>
    );
  } else if (props.game.gameState === 'itemGet') {
    return (
      <div className="game">
      <GameUITop player={props.player}/>
      <div id='level'><CurrentRoom currentRoom={props.currentRoom} game={props.game} player={props.player} doors={props.doors}/></div>
      <ItemGet newItem={props.player.newItem}/>
      </div>
    );
  } else {
    return (
      <div className="game">
        <PopUp popUp={props.popUp} />
        <GameUITop player={props.player}/>
        <BossUI boss={props.boss}/> 
        <div id='level'><CurrentRoom currentRoom={props.currentRoom} game={props.game} player={props.player} doors={props.doors}/></div>
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
  text: PropTypes.object.isRequired,
  sounds: PropTypes.object.isRequired,
  popUp: PropTypes.number,
  boss: PropTypes.object
};

export default Game;
