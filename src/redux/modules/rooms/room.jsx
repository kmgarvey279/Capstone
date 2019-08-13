//Constants
export const NULL_ROOM = "NULL_ROOM";
export const ADD_SQUARE = "ADD_SQUARE";
export const UPDATE_CONTENT = "UPDATE_CONTENT";
export const UPDATE_VALUE = "UPDATE_VALUE";
export const UPDATE_SPRITE = "UPDATE_SPRITE";
export const UPDATE_TRANSITION = "UPDATE_TRANSITION";
export const TOGGLE_ALERT = "TOGGLE_ALERT";

//Action Creators
export function nullRoom() {
  return {
    type: NULL_ROOM,
  };
}
export function addSquare(newSquareId, newValue, newContent, newTileImage, newSprite, newTransition, alertBool) {
  return {
    type: ADD_SQUARE,
    squareId: newSquareId,
    value: newValue,
    content: newContent,
    tileImage: newTileImage,
    sprite: newSprite,
    transition: newTransition,
    alert: alertBool
  };
}
export function updateContent(squareId, newContent) {
  return {
    type: UPDATE_CONTENT,
    squareId: squareId,
    content: newContent,
  };
}
export function updateSprite(squareIdToUpdate, newSprite) {
  return {
    type: UPDATE_SPRITE,
    squareId: squareIdToUpdate,
    sprite: newSprite
  };
}
export function updateTransition(squareIdToUpdate, newTransition) {
  return {
    type: UPDATE_TRANSITION,
    squareId: squareIdToUpdate,
    transition: newTransition
  };
}
export function updateValue(squareIdToUpdate, newValue, newTileImage) {
  return {
    type: UPDATE_VALUE,
    squareId: squareIdToUpdate,
    value: newValue,
    tileImage: newTileImage
  };
}
export function toggleAlert(squareId, alertBool){
  return {
    type: TOGGLE_ALERT,
    squareId: squareId,
    alert: alertBool
  }
}
//Initial State

//Reducer
const roomReducer = (state = {}, action) => {
  let newState;
  let newSquare;
  const { squareId, value, content, tileImage, sprite, transition, alert} = action;

  switch (action.type) {
    case NULL_ROOM:
      newState = {};
      return newState;
    case ADD_SQUARE:
        newState = Object.assign({}, state, {
          [squareId]: {
            squareId: squareId,
            value: value,
            content: content,
            tileImage: tileImage,
            sprite: sprite,
            transition: transition,
            alert: alert
          }
        });
        return newState;
    case UPDATE_VALUE:
      newSquare = Object.assign({}, state[squareId], {value, tileImage});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
    case UPDATE_CONTENT:
      newSquare = Object.assign({}, state[squareId], {content});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
    case UPDATE_SPRITE:
      newSquare = Object.assign({}, state[squareId], {sprite});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
    case TOGGLE_ALERT:
      newSquare = Object.assign({}, state[squareId], {alert});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
    case UPDATE_TRANSITION:
      newSquare = Object.assign({}, state[squareId], {transition});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
  default:
    return state;
  }
};

export default roomReducer;
