//Constants
export const CREATE_SWITCH = "CREATE_SWITCH";
export const PUSH_SWITCH = "PUSH_SWITCH";
export const NULL_ALL_SWITCHES = "NULL_ALL_SWITCHES";

//Action Creators
export function createSwitch( switchId, location, isPushed, effectId, effectType, timer, kind ) {
  return {
    type: CREATE_SWITCH,
    switchId: switchId,
    location: location,
    isPushed: isPushed,
    effectId: effectId,
    effectType: effectType,
    timer: timer,
    kind: kind
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
  const { switchId, location, isPushed, effectId, effectType, timer, kind } = action;

  switch (action.type) {
    case CREATE_SWITCH:
      newState = Object.assign({}, state, {
        [switchId]: {
          switchId: switchId,
          location: location,
          isPushed: isPushed,
          effectId: effectId,
          effectType: effectType,
          timer: timer,
          kind: kind
        }
      });
      return newState;
    case PUSH_SWITCH:
      newSwitch = Object.assign({}, state[switchId], {isPushed});
      newState = Object.assign({}, state, {
        [switchId]: newSwitch
      });
      return newState;
    case NULL_ALL_SWITCHES:
      return {};
  default:
    return state;
  }
};

export default switchReducer;
