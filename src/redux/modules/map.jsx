import React from 'react';

//Constants
export const CHANGE_VISITED = "CHANGE_VISITED";
export const ADD_MAP_SQUARE = "ADD_MAP_SQUARE";

//Action Creators
export function addMapSquare(mapId, levelId) {
  return {
    type: ADD_MAP_SQUARE,
    mapId: mapId,
    levelId: levelId,
    visited: false
  }
}

export function changeVisited(mapId) {
  return {
    type: CHANGE_VISITED,
    mapId: mapId,
    visited: true
  }
}

//Initial State

//Reducer
const mapReducer = (state = {}, action) => {
  const { mapId, levelId, visited } = action;
  let newState;
  let newSquare;
  switch (action.type) {
    case ADD_MAP_SQUARE:
      newState = Object.assign({}, state, {
        [mapId]: {
          mapId: mapId,
          levelId: levelId,
          visited: visited
        }
      });
      return newState;
    case CHANGE_VISITED:
    newSquare = Object.assign({}, state[mapId], {visited});
      newState = Object.assign({}, state, {
        [mapId]: newSquare
      });
      return newState;
  default:
    return state;
  }
};

export default mapReducer;
