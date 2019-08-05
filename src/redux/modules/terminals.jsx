//Constants
export const CREATE_TERMINAL = "CREATE_TERMINAL";
export const NULL_ALL_SWITCHES = "NULL_ALL_TERMINALS";

//Action Creators
export function createSwitch( switchId, location, isPushed, effectLocation, timer ) {
  return {
    type: CREATE_SWITCH,
    switchId: switchId,
    location: location,
    isPushed: isPushed,
    effectLocation: effectLocation,
    timer: timer
  }
}

export function pushSwitch(switchId, isPushed) {
  return {
    type: PUSH_SWITCH,
    switchId: switchId,
    isPushed: isPushed
  }
}

export function nullAllSwitches() {
  return {
    type: NULL_ALL_SWITCHES
  }
}

//Initial State

//Reducer
const switchReducer = (state = {}, action) => {
  let newState;
  let newSwitch;
  const { switchId, location, isPushed, effect, effectLocation, timer } = action;

  switch (action.type) {
    case CREATE_SWITCH:
      newState = Object.assign({}, state, {
        [switchId]: {
          switchId: switchId,
          location: location,
          isPushed: isPushed,
          effectLocation: effectLocation,
          timer: timer
        }
      });
      return newState;
    case PUSH_SWITCH:
      newSwitch = Object.assign({}, state[switchId], {isPushed});
      newState = Object.assign({}, state, {
        [switchId]: newSwitch
      });
      return newState;
  default:
    return state;
  }
};

export default switchReducer;
