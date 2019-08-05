import React from 'react';

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
    currentWeapon: 1
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
