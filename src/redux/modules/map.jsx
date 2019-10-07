import React from 'react';

//Constants
export const LOAD_MAPS = "LOAD_MAPS";
export const CHANGE_VISITED = "CHANGE_VISITED";
export const ADD_MAP_SQUARE = "ADD_MAP_SQUARE";

//Action Creators
export function loadMaps(mapToLoad) {
  return {
    type: LOAD_MAPS,
    mapToLoad: mapToLoad
  }
};

export function addMapSquare(mapsId, roomId) {
  return {
    type: ADD_MAP_SQUARE,
    mapsId: mapsId,
    roomId: roomId,
    visited: false
  }
};

export function changeVisited(mapsId) {
  return {
    type: CHANGE_VISITED,
    mapsId: mapsId,
    visited: true
  }
};

//Initial State

//Reducer
const mapReducer = (state = {}, action) => {
  const { mapToLoad, mapsId, roomId, visited } = action;
  let newState;
  let newSquare;
  switch (action.type) {
    case LOAD_MAPS:
      return mapToLoad;
    case ADD_MAP_SQUARE:
      newState = Object.assign({}, state, {
        [mapsId]: {
          mapsId: mapsId,
          roomId: roomId,
          visited: visited
        }
      });
      return newState;
    case CHANGE_VISITED:
    newSquare = Object.assign({}, state[mapsId], {visited});
      newState = Object.assign({}, state, {
        [mapsId]: newSquare
      });
      return newState;
  default:
    return state;
  }
};

export default mapReducer;
