import constants from './../constants';
const { initialState, types } = constants;

const blockReducer = (state = {}, action) => {
  let newState;
  let newProjectile;
  const { blockId, location } = action;

  switch (action.type) {
    case types.CREATE_BLOCK:
      newState = Object.assign({}, state, {
        [blockId]: {
          blockId: blockId,
          location: location
        }
      });
      return newState;
    case types.UPDATE_BLOCK_LOCATION:
      newBlock = Object.assign({}, state[blockId], {location});
      newState = Object.assign({}, state, {
        [blockId]: newblock
      });
      return newState;
    case types.NULL_BLOCK:
      newState = Object.assign({}, state, {
        [blockId]: {}
      });
      return newState;
  default:
    return state;
  }
};

export default blockReducer;
