//Constants
export const CREATE_DOOR = "CREATE_DOOR";
export const OPEN_DOOR = "OPEN_DOOR";

//Action Creators
export function createDoor(doorId, location, leadsTo, isLocked, direction) {
  return {
    type: CREATE_DOOR,
    doorId: doorId,
    location: location,
    leadsTo: leadsTo,
    isLocked: isLocked,
    direction: direction
  }
}

export function openDoor(doorId) {
  return {
    type: OPEN_DOOR,
    doorId: doorId,
    isLocked: false
  }
}

//Initial State

//Reducer
const doorReducer = (state = {}, action) => {
  let newState;
  let newDoor;
  const { doorId, location, isLocked, leadsTo, direction } = action;

  switch (action.type) {
    case CREATE_DOOR:
      newState = Object.assign({}, state, {
        [doorId]: {
          doorId: doorId,
          location: location,
          leadsTo: leadsTo,
          isLocked: isLocked,
          direction: direction
        }
      });
      return newState;
    case OPEN_DOOR:
      newDoor = Object.assign({}, state[doorId], {isLocked});
      newState = Object.assign({}, state, {
        [doorId]: newDoor
      });
      return newState;
  default:
    return state;
  }
};

export default doorReducer;
