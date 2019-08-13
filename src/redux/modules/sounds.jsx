//Constants
export const CHANGE_MUSIC = "CHANGE_MUSIC";
export const CHANGE_EFFECT = "CHANGE_EFFECT";

//Action Creators
export function changeMusic(music) {
  return {
    type: CHANGE_MUSIC,
    music: music
  }
}
export function changeEffect(effect) {
  return {
    type: CHANGE_EFFECT,
    effect: effect
  }
}

//Initial State
const initialState = {
  effect: null,
  music: null
}

//Reducer
const soundsReducer = (state = initialState, action) => {
  let newState;
  const { effect, music } = action;
  switch (action.type) {
    case CHANGE_EFFECT:
        newState = Object.assign({}, state, {
          effect: effect
        });
        return newState;
    case CHANGE_MUSIC:
        newState = Object.assign({}, state, {
          music: music
        });
        return newState;
  default:
    return state;
  }
};

export default soundsReducer;
