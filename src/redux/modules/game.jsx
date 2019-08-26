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
export const UPDATE_PLATFORM_TIMERS = "UPDATE_PLATFORM_TIMERS";
export const CLEAR_TIMERS = "CLEAR_TIMERS";
export const UPDATE_FILTER = "UPDATE_FILTER";


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

  export function updatePlatformTimers(newTimerArr) {
    return {
      type: UPDATE_PLATFORM_TIMERS,
      platformTimers: newTimerArr
    }
  }
  
  export function updateFilter(newFilter) {
    return {
      type: UPDATE_FILTER,
      filter: newFilter
    }
  }

  export function clearTimers() {
    return {
      type: CLEAR_TIMERS,
      enemyTimers: [],
      switchTimers: [],
      platformTimers: []
    }
  }


//Initial State
const initialState = {
  roomId: 1,
  previousRoomId: null,
  gameState: 'title',
  respawnPoint: '',
  enemyTimers: [],
  switchTimers: [],
  platformTimers: [],
  east: false,
  west: false,
  south: false,
  north: false,
  fire: false,
  bulletCount: 0,
  filter: null
}

//Reducer
const gameReducer = (state = initialState, action) => {
  let newState;
  const { gameState, coolDown, roomId, respawnPoint, previousRoomId, activeText, north, east, west, south, fire, bulletCount, enemyTimers, switchTimers, platformTimers, filter} = action;

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
    case UPDATE_PLATFORM_TIMERS:
      newState = Object.assign({}, state, {
        platformTimers: platformTimers
      });
      return newState;
    case CLEAR_TIMERS:
      newState = Object.assign({}, state, {
        enemyTimers: enemyTimers,
        switchTimers: switchTimers,
        platformTimers: platformTimers
      });
      return newState;
    case UPDATE_FILTER:
      newState = Object.assign({}, state, {
        filter: filter
      });
      return newState;
  default:
    return state;
  }
};

export default gameReducer;
