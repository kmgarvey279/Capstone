import doorLocked from './Error or failed.mp3';
import changeDoor from './generic_sounds/tick.wav';
import select from './menuClick.wav';
import doorOpen from './generic_sounds/doorOpen.wav';
import doorClose from './generic_sounds/doorClose.wav';
import roboVoice from './robot.mp3';
import taser from './littlerobotsoundfactory/Laser_04.mp3'
import cryo from './littlerobotsoundfactory/Laser_08.mp3'
import confirm from './littlerobotsoundfactory/Menu_Select_00.mp3'
import bootUp from './krank_sounds/menu/exit.wav';
import recordScratch from './krank_sounds/space/magnet_off.wav';
import jingle1 from './krank_sounds/summer/anchor_action.wav';
import jingle2 from './krank_sounds/water/exit.wav'
import bootDown from './krank_sounds/summer/exit.wav';
import suspense from './krank_sounds/water/anchor_action.wav';
import teleport from './generic_sounds/teleport.wav';
import shutdown from './generic_sounds/shutdown.wav';
import scrape from './scrape-7.wav';


const effects = {
  changeDoor: changeDoor,
  doorLocked: doorLocked,
  select: select,
  doorOpen: doorOpen,
  doorClose: doorClose,
  roboVoice: roboVoice,
  taser: taser,
  cryo: cryo,
  confirm: confirm,
  bootUp: bootUp,
  bootDown: bootDown,
  recordScratch: recordScratch,
  jingle1: jingle1,
  jingle2: jingle2,
  suspense: suspense,
  teleport: teleport,
  shutdown: shutdown,
  scrape: scrape
};

export default effects
