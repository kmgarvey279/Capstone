import { v4 } from 'uuid';

//Constants
export const CREATE_BLOCK = "CREATE_BLOCK";
export const NULL_BLOCK = "NULL_BLOCK";
export const NULL_ALL_BLOCKS = "NULL_ALL_BLOCKS";
export const UPDATE_BLOCK_LOCATION = "UPDATE_BLOCK_LOCATION";

//Action Creators
export function createBlock(blockId, location) {
  return {
    type: CREATE_BLOCK,
    blockId: blockId,
    location: location
  }
}

export function updateBlockLocation(blockId, location) {
  return {
    type: UPDATE_BLOCK_LOCATION,
    blockId: blockId,
    location: location
  }
}

export function nullBlock(blockId) {
  return {
    type: NULL_BLOCK,
    blockId: blockId
  }
}

export function nullAllBlock() {
  return {
    type: NULL_ALL_BLOCKS,
  }
}

//Initial State

//Reducer
const blockReducer = (state = {}, action) => {
  let newState;
  let newBlock;
  const { blockId, location } = action;

  switch (action.type) {
    case CREATE_BLOCK:
      newState = Object.assign({}, state, {
        [blockId]: {
          blockId: blockId,
          location: location
        }
      });
      return newState;
    case UPDATE_BLOCK_LOCATION:
      newBlock = Object.assign({}, state[blockId], {location});
      newState = Object.assign({}, state, {
        [blockId]: newBlock
      });
      return newState;
    case NULL_BLOCK:
      newState = Object.assign({}, state, {
        [blockId]: {}
      });
      return newState;
    case NULL_ALL_BLOCKS:
      return {};
  default:
    return state;
  }
};

export default blockReducer;
