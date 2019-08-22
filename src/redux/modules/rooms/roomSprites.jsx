import React from 'react';

import ice from '../../../assets/images/room/ice.png';
import lava from '../../../assets/images/room/lava.gif';
import coin from '../../../assets/images/coin.png';
import wall from '../../../assets/images/room/wall-inner-horizontal.png';
import tile from '../../../assets/images/room/tile.png';
import tile2 from '../../../assets/images/room/tile2.png';
import goo from '../../../assets/images/room/goo.png';
import pit from '../../../assets/images/room/pit.png';
import beltNorth from '../../../assets/images/room/belt-north.gif';
import beltEast from '../../../assets/images/room/belt-east.gif';
import beltSouth from '../../../assets/images/room/belt-south.gif';
import beltWest from '../../../assets/images/room/belt-west.gif';

import terminal from '../../../assets/images/room/terminal.gif';
import tank from '../../../assets/images/room/cryoTank.gif';
import uglyBed1 from '../../../assets/images/room/uglyBed1.png';
import uglyBed2 from '../../../assets/images/room/uglyBed2.png';
import shelf from '../../../assets/images/room/shelf.png';
import dead1 from '../../../assets/images/room/dead1.png';
import dead2 from '../../../assets/images/room/dead2.png';

import corner1 from '../../../assets/images/room/wall-corner1.png';
import corner2 from '../../../assets/images/room/wall-corner2.png';
import corner3 from '../../../assets/images/room/wall-corner3.png';
import corner4 from '../../../assets/images/room/wall-corner4.png';
import innerCorner1 from '../../../assets/images/room/wall-inner-corner1.png';
import innerCorner2 from '../../../assets/images/room/wall-inner-corner2.png';
import innerCorner3 from '../../../assets/images/room/wall-inner-corner3.png';
import innerCorner4 from '../../../assets/images/room/wall-inner-corner4.png';
import top from '../../../assets/images/room/wall-top.png';
import bottom from '../../../assets/images/room/wall-bottom.png';
import left from '../../../assets/images/room/wall-left.png';
import innerLeft from '../../../assets/images/room/wall-inner-left.png';
import innerRight from '../../../assets/images/room/wall-inner-right.png';
import right from '../../../assets/images/room/wall-right.png';
import connectNE from '../../../assets/images/room/wall-connect-top-left.png';
import connectNW from '../../../assets/images/room/wall-connect-top-right.png';

import block from '../../../assets/images/room/block.png';
import blockSink from '../../../assets/images/room/blockSink.gif';
import iceChunk from '../../../assets/images/room/iceChunk.png';

import switchOn from '../../../assets/images/room/switchOn.gif';
import switchOff from '../../../assets/images/room/switchOff.png';
import elecSwitchOn from '../../../assets/images/room/elecswitch-on.png';
import elecSwitchOff from '../../../assets/images/room/elecswitch-off.png';

import platformOffNS from '../../../assets/images/room/platformOffNS.png';
import platformOnNS from '../../../assets/images/room/platformOnNS.gif';
import platformOffEW from '../../../assets/images/room/platformOffEW.png';
import platformOnEW from '../../../assets/images/room/platformOnEW.gif';

import lockedDoorNorth from '../../../assets/images/room/door-locked-north.png';
import unlockedDoorNorth from '../../../assets/images/room/door-unlocked-north.png';
import openingDoorNorth from '../../../assets/images/room/door-open-north.gif';
import openDoorNorth from '../../../assets/images/room/door-open-north.png';
import closingDoorNorth from '../../../assets/images/room/door-close-north.gif';

import lockedDoorEast from '../../../assets/images/room/door-locked-east.png';
import unlockedDoorEast from '../../../assets/images/room/door-unlocked-east.png';
import openingDoorEast from '../../../assets/images/room/door-open-east.gif';
import openDoorEast from '../../../assets/images/room/door-open-east.png';
import closingDoorEast from '../../../assets/images/room/door-close-east.gif';

import lockedDoorWest from '../../../assets/images/room/door-locked-west.png';
import unlockedDoorWest from '../../../assets/images/room/door-unlocked-west.png';
import openingDoorWest from '../../../assets/images/room/door-open-west.gif';
import openDoorWest from '../../../assets/images/room/door-open-west.png';
import closingDoorWest from '../../../assets/images/room/door-close-west.gif';

import lockedDoorSouth from '../../../assets/images/room/door-locked-south.png';
import unlockedDoorSouth from '../../../assets/images/room/door-unlocked-south.png';
import openingDoorSouth from '../../../assets/images/room/door-open-south.gif';
import openDoorSouth from '../../../assets/images/room/door-open-south.png';
import closingDoorSouth from '../../../assets/images/room/door-close-south.gif';

const sprites = {
  pit: <img src={pit} width="50" height="50"/>,
  ice: <img src={ice} width="50" height="50"/>,
  lava: <img src={lava} width="50" height="50"/>,
  coin: <img src={coin} width="50" height="50"/>,
  wall: <img src={wall} width="50" height="50"/>,
  tile: <img src={tile} width="50" height="50"/>,
  tile2: <img src={tile2} width="50" height="50"/>,
  goo: <img src={goo} width="50" height="50"/>,
  beltNorth: <img src={beltNorth} width="50" height="50"/>,
  beltEast: <img src={beltEast} width="50" height="50"/>,
  beltSouth: <img src={beltSouth} width="50" height="50"/>,
  beltWest: <img src={beltWest} width="50" height="50"/>,

  terminal: <img src={terminal} width="50" height="50"/>,
  tank: <img src={tank} width="70" height="90"/>,
  shelf: <img src={shelf} width="70" height="90"/>,
  uglyBed1: <img src={uglyBed1} width="70" height="90"/>,
  uglyBed2: <img src={uglyBed2} width="70" height="90"/>,
  dead1: <img src={dead1} width="70" height="90"/>,
  dead2: <img src={dead2} width="70" height="90"/>,

  corner1: <img src={corner1} width="50" height="50"/>,
  innerCorner1: <img src={innerCorner1} width="50" height="50"/>,
  corner2: <img src={corner2} width="50" height="50"/>,
  innerCorner2: <img src={innerCorner2} width="50" height="50"/>,
  corner3: <img src={corner3} width="50" height="50"/>,
  innerCorner3: <img src={innerCorner3} width="50" height="50"/>,
  corner4: <img src={corner4} width="50" height="50"/>,
  innerCorner4: <img src={innerCorner4} width="50" height="50"/>,
  top: <img src={top} width="50" height="50"/>,
  bottom: <img src={top} width="50" height="50"/>,
  left: <img src={left} width="50" height="50"/>,
  innerRight: <img src={innerRight} width="50" height="50"/>,
  innerLeft: <img src={innerLeft} width="50" height="50"/>,
  right: <img src={right} width="50" height="50"/>,
  connectNE: <img src={connectNE} width="50" height="50"/>,

  block:  <img src={block} width="80" height="80"/>,
  blockSink: <img src={blockSink} width="60" height="60"/>,
  iceChunk: <img src={iceChunk} width="60" height="60"/>,

  switchOff: <img src={switchOff} width="50" height="50"/>,
  switchOn: <img src={switchOn} width="50" height="50"/>,
  elecSwitchOn: <img src={elecSwitchOn} width="70" height="60"/>,
  elecSwitchOff: <img src={elecSwitchOff} width="70" height="60"/>,

  platformOffNS: <img src={platformOffNS} width="50" height="50"/>,
  platformOnNS: <img src={platformOnNS} width="50" height="50"/>,
  platformOffEW: <img src={platformOffEW} width="50" height="50"/>,
  platformOnEW: <img src={platformOnEW} width="50" height="50"/>,

  lockedDoorNorth: <img src={lockedDoorNorth} width="50" height="40"/>,
  unlockedDoorNorth: <img src={unlockedDoorNorth} width="50" height="40"/>,
  openingDoorNorth: <img src={openingDoorNorth} width="50" height="58"/>,
  openDoorNorth: <img src={openDoorNorth} width="50" height="58"/>,
  closingDoorNorth: <img src={closingDoorNorth} width="50" height="58"/>,

  lockedDoorEast: <img src={lockedDoorEast} width="58" height="50"/>,
  unlockedDoorEast: <img src={unlockedDoorEast} width="58" height="50"/>,
  openingDoorEast: <img src={openingDoorEast} width="58" height="50"/>,
  openDoorEast: <img src={openDoorEast} width="58" height="50"/>,
  closingDoorEast: <img src={closingDoorEast} width="58" height="50"/>,

  lockedDoorSouth: <img src={lockedDoorSouth} width="55" height="58"/>,
  unlockedDoorSouth: <img src={unlockedDoorSouth} width="55" height="58"/>,
  openingDoorSouth: <img src={openingDoorSouth} width="55" height="58"/>,
  openDoorSouth: <img src={openDoorSouth} width="55" height="58"/>,
  closingDoorSouth: <img src={closingDoorSouth} width="55" height="58"/>,

  lockedDoorWest: <img src={lockedDoorWest} width="58" height="50"/>,
  unlockedDoorWest: <img src={unlockedDoorWest} width="58" height="50"/>,
  openingDoorWest: <img src={openingDoorWest} width="58" height="50"/>,
  openDoorWest: <img src={openDoorWest} width="58" height="50"/>,
  closingDoorWest: <img src={closingDoorWest} width="58" height="50"/>,
};

export default sprites;
