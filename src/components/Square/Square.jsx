import React from 'react';
import Sprite from '../Sprite/Sprite';
import Door from '../Door/Door';
import Item from '../Item/Item';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import alert from '../../assets/images/room/alert.png';
import './Square.css';

function Square(props){
  if (props.alert == true && props.player.location == props.squareId) {
    return (
      <div id="square">
          <div id="alert">{<img src={alert} weight="50" height="50" />}</div>
          <Sprite sprite={props.sprite} transition={props.transition}/>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
  } else if (props.value == 'D') {
    return (
      <div id="square">
        <Door content={props.content} doors={props.doors}/>
        <Sprite sprite={props.sprite} transition={props.transition}/>
        <div id="tile">{props.tileImage}</div>
      </div>
      )
  } else if (props.value == '$') {
    return (
      <div id="square">
        <Item content={props.content}/>
        <Sprite sprite={props.sprite} transition={props.transition}/>
        <div id="tile">{props.tileImage}</div>
      </div>
      )
  } else {
    return (
      <div id="square">
          <Sprite sprite={props.sprite} transition={props.transition}/>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
    }
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
  doors: PropTypes.object
};

export default connect()(Square);
