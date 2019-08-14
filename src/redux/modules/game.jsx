import React from 'react';

//Constants
export const SET_ROOMID = "SET_ROOMID";
export const SET_PREVIOUS_ROOMID = "SET_PREVIOUS_ROOMID";
export const CHANGE_GAMESTATE = "CHANGE_GAMESTATE";
export const SET_RESPAWNPOINT = "SET_RESPAWNPOINT";
export const TOGGLE_WEST = "TOGGLE_WEST";
export const TOGGLE_EAST = "TOGGLE_EAST";
export const TOGGLE_NORTH = "TOGGLE_NORTH";
export const TOGGLE_SOUTH = "TOGGLE_SOUTH";
export const TOGGLE_FIRE = "TOGGLE_FIRE";
export const UPDATE_BULLET_COUNT = "UPDATE_BULLET_COUNT";


//Action Creators
export function changeGameState(newGameState) {
  return {
    type: CHANGE_GAMESTATE,
    gameState: newGameState
  };
}
export function setRoomId(newRoomId) {
  return {
    type: SET_ROOMID,
    roomId: newRoomId
  };
}
export function setPreviousRoomId(newPreviousRoomId) {
  return {
    type: SET_PREVIOUS_ROOMID,
    previousRoomId: newPreviousRoomId
  };
}

export function setRespawnPoint(newRespawnPoint) {
  return {
    type: SET_RESPAWNPOINT,
    respawnPoint: newRespawnPoint
  }
}

export function toggleNorth(newBool) {
  return {
    type: TOGGLE_NORTH,
    north: newBool
  }
}

export function toggleEast(newBool) {
  return {
    type: TOGGLE_EAST,
    east: newBool
  }
}

export function toggleWest(newBool) {
  return {
    type: TOGGLE_WEST,
    west: newBool
  }
}

export function toggleSouth(newBool) {
  return {
    type: TOGGLE_SOUTH,
    south: newBool
  }
}

export function toggleFire(newBool) {
  return {
    type: TOGGLE_FIRE,
    fire: newBool
  }
}

  export function updateBulletCount(newCount) {
    return {
      type: UPDATE_BULLET_COUNT,
      bulletCount: newCount
    }
  }


//Initial State
const initialState = {
  roomId: 1,
  previousRoomId: null,
  gameState: 'title',
  respawnPoint: '',
  enemyTimers: [],
  east: false,
  west: false,
  south: false,
  north: false,
  fire: false,
  bulletCount: 0
}

//Reducer
const gameReducer = (state = initialState, action) => {
  let newState;
  const { gameState, coolDown, roomId, respawnPoint, previousRoomId, activeText, north, east, west, south, fire, bulletCount } = action;

  switch (action.type) {
    case CHANGE_GAMESTATE:
      newState = Object.assign({}, state, {
        gameState: gameState
      });
      return newState;
    case SET_ROOMID:
      newState = Object.assign({}, state, {
        roomId: roomId
      });
      return newState;
    case SET_PREVIOUS_ROOMID:
      newState = Object.assign({}, state, {
        previousRoomId: previousRoomId
      });
      return newState;
    case SET_RESPAWNPOINT:
      newState = Object.assign({}, state, {
        respawnPoint: respawnPoint
      });
      return newState;
    case TOGGLE_NORTH:
      newState = Object.assign({}, state, {
        north: north
      });
      return newState;
    case TOGGLE_SOUTH:
      newState = Object.assign({}, state, {
        south: south
      });
      return newState;
    case TOGGLE_EAST:
      newState = Object.assign({}, state, {
        east: east
      });
      return newState;
    case TOGGLE_WEST:
      newState = Object.assign({}, state, {
        west: west
      });
      return newState;
    case TOGGLE_FIRE:
      newState = Object.assign({}, state, {
        fire: fire
      });
      return newState;
    case UPDATE_BULLET_COUNT:
      newState = Object.assign({}, state, {
        bulletCount: bulletCount
      });
      return newState;
  default:
    return state;
  }
};

export default gameReducer;
