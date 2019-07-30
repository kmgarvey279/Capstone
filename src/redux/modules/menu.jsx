import React from 'react';

//Constants
export const CHANGE_OPTION = "CHANGE_OPTION";
export const CHANGE_MENU = "CHANGE_MENU";

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

//Initial State
const initialState = {
  selectedMenu: 1,
  selectedOption: 1
};

//Reducer
const menuReducer = (state = initialState, action) => {
  const { selectedMenu, selectedOption } = action;
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
  default:
    return state;
  }
};

export default menuReducer;
