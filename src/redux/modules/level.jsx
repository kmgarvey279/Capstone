//Constants
export const NULL_LEVEL = "NULL_LEVEL";
export const ADD_SQUARE = "ADD_SQUARE";
export const UPDATE_CONTENT = "UPDATE_CONTENT";
export const UPDATE_VALUE = "UPDATE_VALUE";
export const UPDATE_SPRITE = "UPDATE_SPRITE";
export const UPDATE_TRANSITION = "UPDATE_TRANSITION";

//Action Creators

export function nullLevel() {
  return {
    type: NULL_LEVEL,
  };
}

export function addSquare(newSquareId, newValue, newContent, newContentId, newImage, newSprite, newTransition) {
  return {
    type: ADD_SQUARE,
    squareId: newSquareId,
    value: newValue,
    content: newContent,
    contentId: newContentId,
    tileImage: newImage,
    sprite: newSprite,
    transition: newTransition
  };
}
export function updateContent(squareId, newContent, newContentId) {
  return {
    type: UPDATE_CONTENT,
    squareId: squareId,
    content: newContent,
    contentId: newContentId
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
  }
}

//Initial State

//Reducer
const levelReducer = (state = {}, action) => {
  let newState;
  let newSquare;
  const { squareId, value, content, contentId, tileImage, sprite, transition} = action;

  switch (action.type) {
    case NULL_LEVEL:
      newState = {};
      return newState;
    case ADD_SQUARE:
        newState = Object.assign({}, state, {
          [squareId]: {
            squareId: squareId,
            value: value,
            content: content,
            contentId: contentId,
            tileImage: tileImage,
            sprite: sprite,
            transition: transition,
          }
        });
        return newState;
    // case c.UPDATE_VALUE:
    //   newSquare = Object.assign({}, state[id], {value});
    //   newState = Object.assign({}, state, {
    //     [id]: newSquare
    //   });
    //     return newState;
    case UPDATE_CONTENT:
      newSquare = Object.assign({}, state[squareId], {content, contentId});
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

export default levelReducer;
