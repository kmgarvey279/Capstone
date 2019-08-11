import React from 'react';

import ice from '../../../assets/images/room/ice.png';
import lava from '../../../assets/images/lava.gif';
import coin from '../../../assets/images/coin.png';
import wall from '../../../assets/images/room/wall-inner-horizontal.png';
import tile from '../../../assets/images/tile.png';

import terminal from '../../../assets/images/room/terminal.gif';
import tank from '../../../assets/images/room/cryoTank.gif';
import uglyBed from '../../../assets/images/room/uglyBed.png';
import uglyBed1 from '../../../assets/images/room/uglyBed1.png';
import uglyBed2 from '../../../assets/images/room/uglyBed2.png';

import wallCorner1 from '../../../assets/images/room/wall-corner1.png';
import wallCorner2 from '../../../assets/images/room/wall-corner2.png';
import wallCorner3 from '../../../assets/images/room/wall-corner3.png';
import wallCorner4 from '../../../assets/images/room/wall-corner4.png';
import wallTop from '../../../assets/images/room/wall-top.png';
import wallBottom from '../../../assets/images/room/wall-bottom.png';
import wallLeft from '../../../assets/images/room/wall-left.png';
import wallRight from '../../../assets/images/room/wall-right.png';
import block from '../../../assets/images/room/block.png';
import blockSink from '../../../assets/images/room/blockSink.gif';
import switchOn from '../../../assets/images/room/switchOn.gif';
import switchOff from '../../../assets/images/room/switchOff.png';
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

export const rooms = {
  // key: W = wall, D = door, P = pit, L = lava, B = block, E = enemy, S = switch, M = moving platform, T = terminal
  1:[
      ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'],
      ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'],
      ['P'], ['P'], ['W', 'northWest'], ['W', 'west'], ['W', 'west'], ['W', 'west'], ['W', 'west'], ['W', 'west'], ['W', 'west'], ['W', 'southWest'], ['P'], ['P'],
      ['P'], ['P'], ['W', 'north'], ['T', 'tank'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W', 'south'], ['P'], ['P'],
      ['P'], ['P'], ['W', 'north'], ['T', 'tank'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W', 'south'], ['P'], ['P'],
      ['P'], ['P'], ['W', 'north'], ['T', 'terminal', 1], ['0'], ['0'], ['0'], ['T', 'uglyBed1'], ['1'], ['W', 'south'], ['P'], ['P'],
      ['P'], ['P'], ['D','1-A',2, false, 'north'], ['0'], ['0'], ['0'], ['0'], ['T', 'uglyBed2'], ['0'], ['W', 'south'], ['P'], ['P'],
      ['P'], ['P'], ['W', 'north'], ['0'], ['$'], ['0'], ['0'], ['0'], ['0'], ['W', 'south'], ['P'], ['P'],
      ['P'], ['P'], ['W', 'north'], ['T', 'tank'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W', 'south'], ['P'], ['P'],
      ['P'], ['P'], ['W', 'northEast'], ['D','1-B',2, true, 'east'], ['W', 'east'], ['W', 'east'], ['W', 'east'], ['W', 'east'], ['W', 'east'], ['W', 'southEast'], ['P'], ['P'],
      ['P'], ['P'], ['P' ], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'],
      ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P'], ['P']
    ],
  2:[
      ['W'], ['W'], ['W'], ['D','2-C',6,'locked'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
      ['W'], ['0'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['L'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['E', 'slime'], ['0'], ['E', 'slime'], ['0'], ['0'], ['L'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['D','2-A',1,'open'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['D','2-B',3,'locked'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
    ],
  3:[
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
      ['D','3-B',4,'locked'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['E', 'slime'], ['0'], ['E', 'slime'], ['0'], ['0'], ['L'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['0'], ['D','3-A',2,'open'],
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
    ],
  4:[
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['D','4-A',3,'open'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['E', 'slime'], ['0'], ['E', 'slime'], ['0'], ['0'], ['L'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
    ],
  5:[
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['D','5-B',8,'open'], ['W'], ['W'], ['W'], ['W'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
      ['D','5-A',6,'open'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['E', 'slime'], ['0'], ['E', 'slime'], ['0'], ['0'], ['L'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
    ],
  6:[
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['D','6-B',5,'open'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['W'],
      ['D','5-C',7,'open'], ['0'], ['0'], ['W'], ['E', 'slime'], ['0'], ['E', 'slime'], ['0'], ['0'], ['L'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['D','6-A',2,'open'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
    ],
  7:[
      ['W'], ['W'], ['D','7-B',9,'open'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['W'],
      ['D','5-C',7,'open'], ['0'], ['0'], ['W'], ['E', 'slime'], ['0'], ['E', 'slime'], ['0'], ['0'], ['L'], ['L'], ['D','7-A',6,'open'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['D','5-A',2,'open'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
    ],
  8:[
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['E', 'slime'], ['0'], ['E', 'slime'], ['0'], ['0'], ['L'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['D','8-A',5,'open'], ['W'], ['W'], ['W'], ['W'], ['W']
    ],
  9:[
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['E', 'slime'], ['0'], ['E', 'slime'], ['0'], ['0'], ['L'], ['L'], ['W'],
      ['D','9-B',10,'open'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['D','9-A',7,'open'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
    ],
  10:[
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['E', 'boss'], ['0'], ['0'], ['0'], ['0'], ['L'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['D','10-A',9,'open'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
    ],
};

export const sprites = {
  ice: <img id="player" src={ice} width="50" height="50"/>,
  lava: <img id="player" src={lava} width="50" height="50"/>,
  coin: <img id="player" src={coin} width="50" height="50"/>,
  wall: <img id="player" src={wall} width="50" height="50"/>,
  tile: <img id="player" src={tile} width="50" height="50"/>,
  terminal: <img id="player" src={terminal} width="50" height="50"/>,
  tank: <img id="player" src={tank} width="70" height="90"/>,
  uglyBed: <img id="player" src={uglyBed} width="120" height="90"/>,
  uglyBed1: <img id="player" src={uglyBed1} width="70" height="90"/>,
  uglyBed2: <img id="player" src={uglyBed2} width="70" height="90"/>,
  wallCorner1: <img id="player" src={wallCorner1} width="50" height="50"/>,
  wallCorner2: <img id="player" src={wallCorner2} width="50" height="50"/>,
  wallCorner3: <img id="player" src={wallCorner3} width="50" height="50"/>,
  wallCorner4: <img id="player" src={wallCorner4} width="50" height="50"/>,
  wallTop: <img id="player" src={wallTop} width="50" height="50"/>,
  wallBottom: <img id="player" src={wallBottom} width="50" height="50"/>,
  wallLeft: <img id="player" src={wallLeft} width="50" height="50"/>,
  wallRight: <img id="player" src={wallRight} width="50" height="50"/>,
  block:  <img id="player" src={block} width="80" height="80"/>,
  blockSink: <img id="player" src={blockSink} width="60" height="60"/>,
  switchOff: <img id="player" src={switchOff} width="50" height="50"/>,
  switchOn: <img id="player" src={switchOn} width="50" height="50"/>,
  platformOffNS: <img id="player" src={platformOffNS} width="50" height="50"/>,
  platformOnNS: <img id="player" src={platformOnNS} width="50" height="50"/>,
  platformOffEW: <img id="player" src={platformOffEW} width="50" height="50"/>,
  platformOnEW: <img id="player" src={platformOnEW} width="50" height="50"/>,

  lockedDoorNorth: <img id="player" src={lockedDoorNorth} width="55" height="58"/>,
  unlockedDoorNorth: <img id="player" src={unlockedDoorNorth} width="55" height="58"/>,
  openingDoorNorth: <img id="player" src={openingDoorNorth} width="55" height="58"/>,
  openDoorNorth: <img id="player" src={openDoorNorth} width="55" height="58"/>,
  closingDoorNorth: <img id="player" src={closingDoorNorth} width="55" height="58"/>,

  lockedDoorEast: <img id="player" src={lockedDoorEast} width="58" height="50"/>
};

export const maps = {
  1: [10, 9, -2, 8,
      -1, 7, 6, 5,
      4, 3, 2, 1]
};
