//Constants
export const NULL_LEVEL = "NULL_LEVEL";
export const ADD_SQUARE = "ADD_SQUARE";
export const UPDATE_ISYOU = "UPDATE_ISYOU";
export const UPDATE_ISENEMY = "UPDATE_ISENEMY";
export const UPDATE_VALUE = "UPDATE_VALUE";
export const UPDATE_ISPROJECTILE = "UPDATE_ISPROJECTILE";
export const UPDATE_SPRITE = "UPDATE_SPRITE";
export const UPDATE_SPRITEIN = "UPDATE_SPRITEIN";
export const UPDATE_SPRITEOUT = "UPDATE_SPRITEOUT";

//Action Creators

export function nullLevel() {
  return {
    type: NULL_LEVEL,
  };
}
export function addSquare(newSquareId, newValue, newIsYou, newIsEnemy, newIsProjectile, newImage, newSprite, newSpriteIn, newSpriteOut) {
  return {
    type: ADD_SQUARE,
    squareId: newSquareId,
    value: newValue,
    isYou: newIsYou,
    isEnemy: newIsEnemy,
    isProjectile: newIsProjectile,
    tileImage: newImage,
    sprite: newSprite,
    spriteIn: newSpriteIn,
    spriteOut: newSpriteOut
  };
}
export function updateIsYou(squareId, newBool) {
  return {
    type: UPDATE_ISYOU,
    squareId: squareId,
    isYou: newBool
  };
}

export function updateIsEnemy(squareIdToUpdate, enemyId) {
    return {
      type: UPDATE_ISENEMY,
      squareId: squareIdToUpdate,
      isEnemy: enemyId
    }
}

export function updateIsProjectile(squareIdToUpdate, newProjectileId) {
  return {
    type: UPDATE_ISPROJECTILE,
    squareId: squareIdToUpdate,
    isProjectile: newProjectileId
  };
}
export function updateSprite(squareIdToUpdate, newSprite) {
  return {
    type: UPDATE_SPRITE,
    squareId: squareIdToUpdate,
    sprite: newSprite
  };
}
export function updateSpriteIn(squareIdToUpdate, newSpriteIn) {
  return {
    type: UPDATE_SPRITEIN,
    squareId: squareIdToUpdate,
    spriteIn: newSpriteIn
  }
}
export function updateSpriteOut(squareIdToUpdate, newSpriteOut) {
  return {
    type: UPDATE_SPRITEOUT,
    squareId: squareIdToUpdate,
    spriteOut: newSpriteOut
  }
}

//Initial State

//Reducer
const levelReducer = (state = {}, action) => {
  let newState;
  let newSquare;
  const { squareId, value, isYou, isEnemy, isProjectile, tileImage, sprite, spriteIn, spriteOut} = action;

  switch (action.type) {
    case NULL_LEVEL:
      newState = {};
      return newState;
    case ADD_SQUARE:
        newState = Object.assign({}, state, {
          [squareId]: {
            squareId: squareId,
            value: value,
            isYou: isYou,
            isEnemy: isEnemy,
            isProjectile: isProjectile,
            tileImage: tileImage,
            sprite: sprite,
            spriteIn: spriteIn,
            spriteOut: spriteOut
          }
        });
        return newState;
    // case c.UPDATE_VALUE:
    //   newSquare = Object.assign({}, state[id], {value});
    //   newState = Object.assign({}, state, {
    //     [id]: newSquare
    //   });
    //     return newState;
    case UPDATE_ISYOU:
      newSquare = Object.assign({}, state[squareId], {isYou});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
    case UPDATE_ISPROJECTILE:
      newSquare = Object.assign({}, state[squareId], {isProjectile});
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
    case UPDATE_SPRITEIN:
      newSquare = Object.assign({}, state[squareId], {spriteIn});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
    case UPDATE_SPRITEOUT:
      newSquare = Object.assign({}, state[squareId], {spriteOut});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
    case UPDATE_ISENEMY:
      newSquare = Object.assign({}, state[squareId], {isEnemy});
      newState = Object.assign({}, state, {
        [squareId]: newSquare
      });
        return newState;
  default:
    return state;
  }
};

export default levelReducer;
