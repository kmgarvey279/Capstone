import React from 'react';
import Sprite from '../Sprite/Sprite';
import Door from '../Door/Door';
import Item from '../Item/Item';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import alert from '../../assets/images/room/alert.png';
import lightningRight from '../../assets/images/room/lightningRight.gif';
import roomConsts from '../../redux/modules/rooms/roomConstants';
import './Square.css';

function Square(props){
  let otherContent = null;
  if (props.warning && props.player.location == props.squareId) {
    otherContent = <div className="warning">{<img id="alert" src={alert} weight="50" height="50" />}</div>
  } else if (props.alert == true && props.player.location == props.squareId) {
    otherContent = <div>{<img id="alert" src={alert} weight="50" height="50" />}</div>
  } else if (props.value == 'D') {
    otherContent = <Door content={props.content} doors={props.doors}/>
  } else if (props.value == '$') {
    otherContent = <Item content={props.content}/>
  } else if (props.value == 'L') {
    otherContent = <div id="lava"></div>
  } else if (props.value == '%') {
    otherContent = <div id="lightning">{<img src={lightningRight} weight="50" height="50" />}</div>
  } else if (props.value == 'H') {
    otherContent = <div id="goo">{roomConsts.sprites['goo']}</div>
  } else if (props.explosion === true) {
    otherContent = <div id="explosion">{roomConsts.sprites['explosion']}</div>
  };

  let tile = <div class="tile">{props.tileImage}</div>
  if (props.value == "@" && props.content.length <= 1) {
    tile = <div class="tile" id="warpOff">{props.tileImage}</div>
  } else if  (props.value == "~") {
    if(props.eye == 'alive') {
      tile = <div class="tile">{roomConsts.sprites['tenta']};</div>
    } else if (props.eye == 'hurt') {
      otherContent = <div id="explosion">{roomConsts.sprites['explosion']}</div>
    } else {
      tile = <div class="tile">{roomConsts.sprites['spookyTile']};</div>
    };
  } else if (props.warning) {
    tile = <div class="tile">{roomConsts.sprites['danger']}</div>
  } else if (props.value == "i") {
    if(props.eye == 'alive') {
      tile = <div class="tile">{roomConsts.sprites['eyeball']}</div>
    } else if(props.eye == 'hurt') {
      otherContent = <div id="explosion">{roomConsts.sprites['explosion']}</div>
    } else {
      tile = <div class="tile">{roomConsts.sprites['spookyTile']}</div>
    };
  };


  return (
    <div id="square">
        {otherContent}
        <Sprite sprite={props.sprite} transition={props.transition} squareValue={props.value}/>
        {tile}
    </div>
  );
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  squareId: PropTypes.number.isRequired,
  tileImage: PropTypes.object.isRequired,
  sprite: PropTypes.object,
  transition: PropTypes.string,
  alert: PropTypes.bool,
  player: PropTypes.object,
  doors: PropTypes.object,
  eye: PropTypes.string,
  explosion: PropTypes.bool,
  warning: PropTypes.bool
};

export default connect()(Square);
