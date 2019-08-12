//Constants
export const TRIGGER_FLAG = "TRIGGER_FLAG";

//Action Creators
export function triggerFlag(flagId) {
  return {
    type: TRIGGER_FLAG,
    flagId: flagId,
    triggered: true
  }
}

//Initial State
const initialState = {
  1: {triggered: false},
  2: {triggered: false},
  3: {triggered: false},
  4: {triggered: false},
  5: {triggered: false},
  6: {triggered: false},
  7: {triggered: false},
  8: {triggered: false},
  9: {triggered: false}
}

//Reducer
const flagsReducer = (state = initialState, action) => {
  let newState;
  let newFlag;
  const { flagId, triggered } = action;

  switch (action.type) {
    case TRIGGER_FLAG:
      newFlag = Object.assign({}, state[flagId], {triggered});
      newState = Object.assign({}, state, {
        [flagId]: newFlag
      });
      return newState;
  default:
    return state;
  }
};

export default flagsReducer;
