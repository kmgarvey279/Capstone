//Constants
export const CREATE_DOOR = "CREATE_DOOR";
export const OPEN_DOOR = "OPEN_DOOR";
export const UPDATE_DOOR_STATUS = "UPDATE_DOOR_STATUS";

//Action Creators
export function createDoor(doorId, location, leadsTo, status, isLocked, direction, newBool) {
  return {
    type: CREATE_DOOR,
    doorId: doorId,
    location: location,
    leadsTo: leadsTo,
    status: status,
    isLocked: isLocked,
    direction: direction
  }
}

export function openDoor(doorId, newBool) {
  return {
    type: OPEN_DOOR,
    doorId: doorId,
    isLocked: newBool
  }
}

export function updateDoorStatus(doorId, newStatus) {
  return {
    type: UPDATE_DOOR_STATUS,
    doorId: doorId,
    status: newStatus
  }
}

//Initial State

//Reducer
const doorReducer = (state = {}, action) => {
  let newState;
  let newDoor;
  const { doorId, location, isLocked, leadsTo, status, direction } = action;

  switch (action.type) {
    case CREATE_DOOR:
      newState = Object.assign({}, state, {
        [doorId]: {
          doorId: doorId,
          location: location,
          leadsTo: leadsTo,
          status: status,
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
    case UPDATE_DOOR_STATUS:
      newDoor = Object.assign({}, state[doorId], {status});
      newState = Object.assign({}, state, {
        [doorId]: newDoor
      });
      return newState;
  default:
    return state;
  }
};

export default doorReducer;
