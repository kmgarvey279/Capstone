//Constants
export const TRIGGER_FLAG = "TRIGGER_FLAG";
export const LOAD_FLAGS = "LOAD_FLAGS";

//Action Creators
export function loadFlags(flagsToLoad){
  return {
    type: LOAD_FLAGS,
    flagsToLoad: flagsToLoad
  }
};
export function triggerFlag(flagId) {
  return {
    type: TRIGGER_FLAG,
    flagId: flagId,
    triggered: true
  }
};

//Initial State
const initialState = {
  //first conversation (approch door)
  1: {triggered: false},
  //second conversation (push first switch)
  2: {triggered: false},
  //third coversation (dead end in room 7)
  3: {triggered: false},
  //fourth conversation (unsolvable puzzle in room 3)
  4: {triggered: false},
  //fifth conversation (enter room 4)
  5: {triggered: false},
  //sixth conversation (machine online)
  6: {triggered: false},
  //seventh conversation (new branch)
  7: {triggered: false},
  //8th conversation (escape!)
  8: {triggered: false},
  //9th conversation (another new branch)
  9: {triggered: false}
}

//Reducer
const flagsReducer = (state = initialState, action) => {
  let newState;
  let newFlag;
  const { flagsToLoad, flagId, triggered } = action;

  switch (action.type) {
    case LOAD_FLAGS:
      return flagsToLoad;
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
