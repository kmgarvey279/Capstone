import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HealthBar from '../HealthBar/HealthBar';
import * as playerConsts from '../../redux/modules/player/playerConstants';
import './GameUITop.css';
import taserIcon from '../../assets/images/items/taserIcon.png';
import collider from '../../assets/images/items/collider.png';

function GameUITop(props) {
  let weaponIcon;
  if (props.player.currentWeapon === null) {
    weaponIcon = '';
  } else if (props.player.currentWeapon === 'Taser') {
    weaponIcon = <img src={taserIcon} width="50" height="50"/>
  } else if (props.player.currentWeapon === 'Cryostat') {
    weaponIcon = <img src={cryoIcon} width="50" height="50"/>
  }
  return (
    <div id="UI-wrap">
      <div id="UI-content">
        <div id="hp-bar">
          <label>
            Health
            <HealthBar type={'health'} health={props.player.health} />
          </label>
        </div>
        <div id="weapon">
            {weaponIcon}  
        </div>
        <div id="skill">
        <img src={collider} width="50" height="50"/>
        </div>
        <div id="entangle-bar">
          <label>
            Entanglement
            <HealthBar type={'entanglement'} health={props.player.health} />
          </label>
        </div>
      </div>
    </div>
  );
}

GameUITop.propTypes = {
  game: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default connect()(GameUITop);
