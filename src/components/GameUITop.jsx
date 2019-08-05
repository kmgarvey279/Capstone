import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as playerConsts from './../redux/modules/player/playerConstants';

function GameUITop(props) {
  return (
    <div>
      <style jsx>{`
        div {
          color: white;
          position: absolute;
          left: 0;
          top: 0%;
          width: 100%;
          text-align: center;
          z-index: 10;
        }
      `}</style>
        <h3>Health: {props.player.health}/100 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Score: {props.player.score} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Weapon: &nbsp; &nbsp;{playerConsts.weapons[props.player.currentWeapon].name}</h3>
    </div>
  );
}

GameUITop.propTypes = {
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default connect()(GameUITop);
