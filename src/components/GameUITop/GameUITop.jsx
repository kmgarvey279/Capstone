import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as playerConsts from '../../redux/modules/player/playerConstants';
import './GameUITop.css';

function GameUITop(props) {
  let weapon;
  if (props.player.currentWeapon !== null) {
    weapon = props.player.currentWeapon;
  } else {
    weapon = 'None';
  }
  return (
    <div id="UI">
        <h3>Health: {props.player.health}/100 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        Score: {props.player.score} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        Weapon: &nbsp; &nbsp;{weapon}</h3>
    </div>
  );
}

GameUITop.propTypes = {
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default connect()(GameUITop);
