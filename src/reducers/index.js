import levelReducer from './level-reducer';
import gameReducer from './game-reducer';
import playerReducer from './player-reducer';
import projectileReducer from './projectile-reducer';
import enemyReducer from './enemy-reducer';
import blockReducer from './block-Reducer';
import doorReducer from './door-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  player: playerReducer,
  currentLevel: levelReducer,
  game: gameReducer,
  projectiles: projectileReducer,
  enemies: enemyReducer,
  doors: doorReducer,
  blocks: blockReducer
});

export default rootReducer;
