import React from 'react';
import Sprite from '../Sprite/Sprite'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import alert from '../../assets/images/room/alert.png';
import './Square.css';

function Square(props){
  if (props.alert == true && props.player.location == props.squareId) {
    return (
      <div id="square">
          <div id="alert"><img src={alert} weight="50" height="50" /></div>
          <Sprite sprite={props.sprite} transition={props.transition}/>
          <div id="tile">{props.tileImage}</div>
        </div>
      )
  } else if (props.value == 'D') {
    return (
      <div id="square">
        <Sprite sprite={props.sprite} transition={props.transition}/>
        <div id="door">{props.tileImage}</div>
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
  player: PropTypes.object
};

export default connect()(Square);
