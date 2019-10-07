import React from 'react';

//Constants
export const CHANGE_OPTION = "CHANGE_OPTION";
export const CHANGE_MENU = "CHANGE_MENU";
export const SET_GAME_TO_COPY = "SET_GAME_TO_COPY";

//Action Creators
export function changeOption(selectedOption) {
  return {
    type: CHANGE_OPTION,
    selectedOption: selectedOption,
  }
}

export function changeMenu(selectedMenu) {
  return {
    type: CHANGE_MENU,
    selectedMenu: selectedMenu,
  }
}

export function setGameToCopy(game) {
  return {
    type: SET_GAME_TO_COPY,
    gameToCopy: game
  }
}


//Initial State
const initialState = {
  selectedMenu: 'title',
  selectedOption: 1,
  gameToCopy: null
};

//Reducer
const menuReducer = (state = initialState, action) => {
  const { selectedMenu, selectedOption, gameToCopy } = action;
  let newState;
  switch (action.type) {
    case CHANGE_MENU:
      newState = Object.assign({}, state, {
        selectedMenu: selectedMenu
      });
      return newState;
    case CHANGE_OPTION:
      newState = Object.assign({}, state, {
        selectedOption: selectedOption
      });
      return newState;
    case SET_GAME_TO_COPY:
        newState = Object.assign({}, state, {
          gameToCopy: gameToCopy
        });
        return newState;
  default:
    return state;
  }
};

export default menuReducer;
