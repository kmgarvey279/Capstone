import React from 'react';
import playerStandNorth from '../../assets/images/player/playerStandNorth.gif';
import playerStandEast from '../../assets/images/player/playerStandEast.png';
import playerStandSouth from '../../assets/images/player/playerStandSouth.gif';
import playerStandWest from '../../assets/images/player/playerStandWest.png';

import playerWalkNorth from '../../assets/images/player/playerWalkNorth.gif';
import playerWalkEast from '../../assets/images/player/playerWalkEast.png';
import playerWalkSouth from '../../assets/images/player/playerWalkSouth.gif';
import playerWalkWest from '../../assets/images/player/playerWalkWest.png';

import playerAttackNorth from '../../assets/images/player/playerAttackNorth.png';
import playerAttackEast from '../../assets/images/player/playerAttackEast.png';
import playerAttackSouth from '../../assets/images/player/playerAttackSouth.gif';
import playerAttackWest from '../../assets/images/player/playerAttackWest.png';

import playerKnockbackSouth from '../../assets/images/player/playerKnockbackSouth.gif';
import playerKnockbackNorth from '../../assets/images/player/playerKnockbackNorth.gif';

import playerDashSouth from '../../assets/images/player/playerDashSouth.gif'

import playerParticleSouth from '../../assets/images/player/playerParticleSouth.gif'

import taser from '../../assets/images/projectiles/taser.png';
import cryostat from '../../assets/images/projectiles/cryostatEast.gif';

//Constants
export const UPDATE_PLAYER_HEALTH = "UPDATE_PLAYER_HEALTH";
export const UPDATE_PLAYER_STATUS = "UPDATE_PLAYER_STATUS";
export const UPDATE_PLAYER_LOCATION = "UPDATE_PLAYER_LOCATION";
export const UPDATE_PLAYER_DIRECTION = "UPDATE_PLAYER_DIRECTION";
export const TOGGLE_INVINCIBILITY = "TOGGLE_INVINCIBILITY";
export const UPDATE_SCORE = "UPDATE_SCORE";
export const CHANGE_CURRENT_WEAPON = "CHANGE_CURRENT_WEAPON";

//Action Creators
export function updatePlayerHealth(newHealth) {
  return {
    type: UPDATE_PLAYER_HEALTH,
    health: newHealth
  };
}
export function updatePlayerLocation(newLocation) {
  return {
    type: UPDATE_PLAYER_LOCATION,
    location: newLocation
  };
}
export function updatePlayerDirection(newDirection) {
  return {
    type: UPDATE_PLAYER_DIRECTION,
    direction: newDirection
  };
}
export function toggleInvincibility(newBool) {
  return {
    type: TOGGLE_INVINCIBILITY,
    invincibility: newBool
  };
}
export function updateScore(newScore) {
  return {
    type: UPDATE_SCORE,
    score: newScore
  };
}
export function changeCurrentWeapon(newWeaponId) {
  return {
    type: CHANGE_CURRENT_WEAPON,
    currentWeapon: newWeaponId
  };
}
export function updatePlayerStatus(status) {
  return {
    type: UPDATE_PLAYER_STATUS,
    status: status
  }
}


//Initial State
const initialState = {
    health: 100,
    status: 'normal',
    score: 0,
    direction: 'north',
    location: null,
    sprites: {
      stand: {
        north: <img id="player" src={playerStandNorth} width="80" height="80"/>,
        east: <img id="player" src={playerStandEast} width="55" height="55"/>,
        south: <img id="player" src={playerStandSouth} width="80" height="80"/>,
        west: <img id="player" src={playerStandWest} width="55" height="55"/>,
      },
      walk: {
        north: <img id="player" src={playerWalkNorth} width="80" height="80"/>,
        east: <img id="player" src={playerWalkEast} width="50" height="55"/>,
        south: <img id="player" src={playerWalkSouth} width="80" height="80"/>,
        west: <img id="player" src={playerWalkWest} width="50" height="55"/>,
      },
      knockback: {
        north: <img id="player" src={playerKnockbackNorth} width="80" height="80"/>,
        east: <img id="player" src={playerKnockbackSouth} width="80" height="80"/>,
        south: <img id="player" src={playerKnockbackSouth} width="80" height="80"/>,
        west: <img id="player" src={playerKnockbackSouth} width="80" height="80"/>,
      },
      attack: {
        north: <img id="player" src={playerAttackNorth} width="80" height="80" />,
        east: <img id="player" src={playerAttackEast} width="50" height="50" />,
        south: <img id="player" src={playerAttackSouth} width="80" height="80" />,
        west: <img id="player" src={playerAttackWest} width="50" height="50" />,
      },
      dash: {
        north: <img id="player" src={playerDashSouth} width="80" height="80" />,
        east: <img id="player" src={playerDashSouth} width="80" height="80" />,
        west: <img id="player" src={playerDashSouth} width="80" height="80" />,
        south: <img id="player" src={playerDashSouth} width="80" height="80" />,
      },
      particle: {
        north: <img id="player" src={playerParticleSouth} width="80" height="80"/>,
        east: <img id="player" src={playerParticleSouth} width="80" height="80"/>,
        south: <img id="player" src={playerParticleSouth} width="80" height="80"/>,
        west: <img id="player" src={playerParticleSouth} width="80" height="80"/>
      },
      fall: <img id="player" src={playerStandEast} width="50" height="50"/>,
      victory: <img id="player" src={playerStandEast} width="50" height="50"/>
    },
    currentWeapon: 1,
    weapons: {
      1: {
        id: 1,
        name: 'Taser Gun',
        range: 4,
        sprites: {
          north: <img id="player" src={taser} width="50" height="50"/>,
          west: <img id="player" src={taser} width="50" height="50"/>,
          east: <img id="player" src={taser} width="50" height="50"/>,
          south: <img id="player" src={taser} width="50" height="50"/>,
          burst: <img id="player" src={taser} width="50" height="50"/>,
          icon: <img id="player" src={taser} width="50" height="50"/>
        }
      },
      2: {
        id: 2,
        name: 'Cryostat',
        range: 3,
        sprites: {
          north: <img id="player" src={cryostat} width="80" height="80"/>,
          west: <img id="player" src={cryostat} width="80" height="80"/>,
          east: <img id="player" src={cryostat} width="80" height="80"/>,
          south: <img id="player" src={cryostat} width="80" height="80"/>,
          burst: <img id="player" src={taser} width="50" height="50"/>,
          icon: <img id="player" src={taser} width="50" height="50"/>
        }
      }
    }
  };

//Reducer
export default function playerReducer(state = initialState, action){
  let newState;
  const { health, location, direction, invincibility, score, currentWeapon, status } = action;

  switch (action.type) {
    case UPDATE_PLAYER_HEALTH:
        newState = Object.assign({}, state, {
          health: health
        });
        return newState;
    case UPDATE_PLAYER_LOCATION:
        newState = Object.assign({}, state, {
          location: location
        });
        return newState;
    case UPDATE_PLAYER_DIRECTION:
        newState = Object.assign({}, state, {
          direction: direction
        });
        return newState;
    case TOGGLE_INVINCIBILITY:
      newState = Object.assign({}, state, {
        invincibility: invincibility
      })
      return newState;
    case UPDATE_SCORE:
      newState = Object.assign({}, state, {
        score: score
      });
      return newState;
    case CHANGE_CURRENT_WEAPON:
      newState = Object.assign({}, state, {
        currentWeapon: currentWeapon
      });
      return newState;
    case UPDATE_PLAYER_STATUS:
      newState = Object.assign({}, state, {
        status: status
      });
      return newState;
    default:
        return state;
      }
    };
