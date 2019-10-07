import roomReducer from './rooms/room';
import gameReducer from './game';
import playerReducer from './player/player';
import enemyReducer from './enemies/enemies';
import textReducer from './text/text';
import blockReducer from './blocks';
import doorReducer from './doors';
import menuReducer from './menu';
import platformReducer from './platforms';
import switchReducer from './switches';
import mapReducer from './map';
import flagReducer from './flags';
import soundsReducer from './sounds';
import savesReducer from './save-data';
import bossReducer from './boss/boss';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  player: playerReducer,
  currentRoom: roomReducer,
  game: gameReducer,
  enemies: enemyReducer,
  doors: doorReducer,
  blocks: blockReducer,
  menu: menuReducer,
  platforms: platformReducer,
  switches: switchReducer,
  maps: mapReducer,
  flags: flagReducer,
  text: textReducer,
  sounds: soundsReducer,
  saves: savesReducer,
  boss: bossReducer
});

export default rootReducer;
