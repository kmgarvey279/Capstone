import levelReducer from './levels/level';
import gameReducer from './game';
import playerReducer from './player/player';
import enemyReducer from './enemies/enemies';
import blockReducer from './blocks';
import doorReducer from './doors';
import menuReducer from './menu';
import platformReducer from './platforms';
import switchReducer from './switches';
import mapReducer from './map';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  player: playerReducer,
  currentLevel: levelReducer,
  game: gameReducer,
  enemies: enemyReducer,
  doors: doorReducer,
  blocks: blockReducer,
  menu: menuReducer,
  platforms: platformReducer,
  switches: switchReducer,
  map: mapReducer
});

export default rootReducer;
