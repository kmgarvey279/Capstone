import constants from './../constants';
const { initialState, types } = constants;

const doorReducer = (state = {}, action) => {
  let newState;
  let newDoor;
  const { doorId, location, isLocked, leadsTo } = action;

  switch (action.type) {
    case types.CREATE_DOOR:
      newState = Object.assign({}, state, {
        [doorId]: {
          doorId: doorId,
          location: location,
          isLocked: isLocked,
          leadsTo: leadsTo
        }
      });
      return newState;
    case types.OPEN_DOOR:
      newDoor = Object.assign({}, state[doorId], {isLocked});
      newState = Object.assign({}, state, {
        [doorId]: newDoor
      });
      return newState;
    case types.NULL_DOOR:
      newState = Object.assign({}, state, {
        [doorId]: {}
      });
      return newState;
  default:
    return state;
  }
};

export default doorReducer;
