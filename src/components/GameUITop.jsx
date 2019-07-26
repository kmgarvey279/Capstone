import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import profile from '../assets/images/profileplaceholder.png';
import weapon from '../assets/images/FlareGun.png';

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
        <h3>Health: {props.player.health}/100 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  Score: {props.player.score} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Weapon:</h3>
    </div>
  );
}

GameUITop.propTypes = {
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default connect()(GameUITop);
