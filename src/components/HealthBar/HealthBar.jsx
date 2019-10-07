import React from 'react';
import PropTypes from 'prop-types';
import './HealthBar.css';
import playerParticleEast from '../../assets/images/player/playerParticleEast.gif';

function HealthBar(props) {
  let barType;
  if (props.type === 'health') {
    barType = 'health-bar';
  } else {
    barType = 'entanglement-bar';
  };
  let barColor;
  if(props.health <= 30) {
    barColor = 'low';
  } else if (props.health <= 50) {
    barColor = 'mid';
  } else {
    barColor = 'high';
  };
  let particleEffect = null;
  if(props.type == 'entanglement') {
    particleEffect = <img src={playerParticleEast} width="120px" height="40px"/>;
  }
  return (
    <div className={barType} id={barColor}>
        <span id="particle-effect">{particleEffect}</span>
        <span className={props.health >= 20 ? 'hp-full' : 'hp-empty'} id="hp-10"></span>
        <span className={props.health >= 20 ? 'hp-full' : 'hp-empty'} id="hp-20"></span>
        <span className={props.health >= 30 ? 'hp-full' : 'hp-empty'} id="hp-30"></span>
        <span className={props.health >= 40 ? 'hp-full' : 'hp-empty'} id="hp-40"></span>
        <span className={props.health >= 50 ? 'hp-full' : 'hp-empty'} id="hp-50"></span>
        <span className={props.health >= 60 ? 'hp-full' : 'hp-empty'} id="hp-60"></span>
        <span className={props.health >= 70 ? 'hp-full' : 'hp-empty'} id="hp-70"></span>
        <span className={props.health >= 80 ? 'hp-full' : 'hp-empty'} id="hp-80"></span>
        <span className={props.health >= 90 ? 'hp-full' : 'hp-empty'} id="hp-90"></span>
        <span className={props.health >= 100 ? 'hp-full' : 'hp-empty'} id="hp-100"></span>
    </div>
  );
}

HealthBar.propTypes = {
  health: PropTypes.number.isRequired,
};

export default HealthBar;