import { v4 } from 'uuid';

//Constants
export const CREATE_DOOR = "CREATE_DOOR";
export const NULL_DOORS = "NULL_DOOR";
export const OPEN_DOOR = "OPEN_DOOR";

//Action Creators
export function createDoor(doorId, location, isLocked, leadsTo) {
  return {
    type: CREATE_DOOR,
    doorId: doorId,
    isLocked: isLocked,
    leadsTo: leadsTo
  }
}

export function nullDoors() {
  return {
    type: NULL_DOORS
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
  const { doorId, location, isLocked, leadsTo } = action;

  switch (action.type) {
    case CREATE_DOOR:
      newState = Object.assign({}, state, {
        [doorId]: {
          doorId: doorId,
          location: location,
          isLocked: isLocked,
          leadsTo: leadsTo
        }
      });
      return newState;
    case OPEN_DOOR:
      newDoor = Object.assign({}, state[doorId], {isLocked});
      newState = Object.assign({}, state, {
        [doorId]: newDoor
      });
      return newState;
    case NULL_DOORS:
      newState = {}
      return newState;
  default:
    return state;
  }
};

export default doorReducer;
