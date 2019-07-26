import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import profile from '../assets/images/profileplaceholder.png';
import weapon from '../assets/images/FlareGun.png';

function GameUIBottom(props) {
  return (
    <div id="ui">
      <style jsx>{`

        div#stats {
          vertical-align: top;
          display: inline-block;
        }
        `}</style>
        <div id="stats">
          <h3>Health: {props.player.health}/100</h3>
          <img id="profile" src={profile} width="100px" height="100px" />
        </div>
        <div id="stats">
          <h3>Weapon: {props.weapon}</h3>
          <img id="weapon" src={weapon} width="100px" height="100px"/>
        </div>
        <div id="stats">
          <h2>Level: {props.game.levelId}</h2>
        </div>
    </div>
  );
}

GameUIBottom.propTypes = {
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default connect()(GameUIBottom);
