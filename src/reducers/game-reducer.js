import constants from './../constants';
const { initialState, types } = constants;

const gameReducer = (state = initialState.game, action) => {
  let newState;
  const { gameState, coolDown, levelId } = action;

  switch (action.type) {
    case types.CHANGE_GAMESTATE:
      newState = Object.assign({}, state, {
        gameState: gameState
      });
      return newState;
    case types.LEVELID_UP:
      newState = Object.assign({}, state, {
        levelId: levelId
      });
      return newState;
    case types.TOGGLE_COOLDOWN:
      newState = Object.assign({}, state, {
        coolDown: coolDown
      });
      return newState;
  default:
    return state;
  }
};

export default gameReducer;
