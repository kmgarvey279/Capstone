import React from 'react';

//Constants
export const SET_LEVELID = "SET_LEVELID";
export const SET_PREVIOUS_LEVELID = "SET_PREVIOUS_LEVELID";
export const CHANGE_GAMESTATE = "CHANGE_GAMESTATE";
export const SET_RESPAWNPOINT = "SET_RESPAWNPOINT";
export const SET_ACTIVETEXT = "SET_ACTIVETEXT";

//Action Creators
export function changeGameState(newGameState) {
  return {
    type: CHANGE_GAMESTATE,
    gameState: newGameState
  };
}
export function setLevelId(newLevelId) {
  return {
    type: SET_LEVELID,
    levelId: newLevelId
  };
}
export function setPreviousLevelId(newPreviousLevelId) {
  return {
    type: SET_PREVIOUS_LEVELID,
    previousLevelId: newPreviousLevelId
  };
}

export function setRespawnPoint(newRespawnPoint) {
  return {
    type: SET_RESPAWNPOINT,
    respawnPoint: newRespawnPoint
  }
}

export function setActiveText(newActiveText) {
  return {
    type: SET_ACTIVETEXT,
    activeText: newActiveText
  }
}

//Initial State
const initialState = {
  levelId: 1,
  previousLevelId: 3,
  gameState: 'title',
  respawnPoint: '',
  enemyTimers: [],
  activeText: []
}

//Reducer
const gameReducer = (state = initialState, action) => {
  let newState;
  const { gameState, coolDown, levelId, respawnPoint, previousLevelId, activeText } = action;

  switch (action.type) {
    case CHANGE_GAMESTATE:
      newState = Object.assign({}, state, {
        gameState: gameState
      });
      return newState;
    case SET_LEVELID:
      newState = Object.assign({}, state, {
        levelId: levelId
      });
      return newState;
    case SET_PREVIOUS_LEVELID:
      newState = Object.assign({}, state, {
        previousLevelId: previousLevelId
      });
      return newState;
    case SET_RESPAWNPOINT:
      newState = Object.assign({}, state, {
        respawnPoint: respawnPoint
      });
      return newState;
    case SET_ACTIVETEXT:
      newState = Object.assign({}, state, {
        activeText: activeText
      });
      return newState;
  default:
    return state;
  }
};

export default gameReducer;
