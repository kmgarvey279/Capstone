import React from 'react';

import ice from '../../../assets/images/level/ice.png';
import lava from '../../../assets/images/lava.gif';
import coin from '../../../assets/images/coin.png';
import wall from '../../../assets/images/wall.jpeg';
import tile from '../../../assets/images/tile.png';
import stairs from '../../../assets/images/stairs.png';
import wallCorner1 from '../../../assets/images/level/wall-corner1.png';
import wallCorner2 from '../../../assets/images/level/wall-corner2.png';
import wallCorner3 from '../../../assets/images/level/wall-corner3.png';
import wallCorner4 from '../../../assets/images/level/wall-corner4.png';
import wallTop from '../../../assets/images/level/wall-top.png';
import wallBottom from '../../../assets/images/level/wall-bottom.png';
import wallLeft from '../../../assets/images/level/wall-left.png';
import wallRight from '../../../assets/images/level/wall-right.png';
import block from '../../../assets/images/level/block.png';
import blockSink from '../../../assets/images/level/blockSink.gif';
import switchOn from '../../../assets/images/level/switchOn.gif';
import switchOff from '../../../assets/images/level/switchOff.png';
import platformOffNS from '../../../assets/images/level/platformOffNS.png';
import platformOnNS from '../../../assets/images/level/platformOnNS.gif';
import platformOffEW from '../../../assets/images/level/platformOffEW.png';
import platformOnEW from '../../../assets/images/level/platformOnEW.gif';

export const levels = {
  // key: W = wall, D = door, P = pit, L = lava, B = block, E = enemy, S = switch, M = moving platform, T = terminal
  1:[
      ['W'], ['W'], ['W'], ['D','1-A',2,'locked'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
      ['W'], ['P'], ['P'], ['P'], ['P'], ['M', 'north'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['L'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['E', 'slime'], ['0'], ['E', 'slime'], ['0'], ['0'], ['L'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['S', 18, 5000], ['0'], ['W'], ['$'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['$'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['I'], ['I'], ['I'], ['I'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['T', 1], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['W'], ['D','1-B',3,'open'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
    ],
  2:[
      ['W'], ['W'], ['W'], ['D','2-A',1,'locked'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
      ['W'], ['0'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['L'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['E', 'slime'], ['0'], ['E', 'slime'], ['0'], ['0'], ['L'], ['L'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
      ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['0'], ['W'],
      ['W'], ['W'], ['W'], ['W'], ['W'], ['D','2-B',3,'open'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
    ],
  3:[
      ['W'], ['W'], ['W'], ['D','3-A',1,'locked'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
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
      ['W'], ['W'], ['W'], ['W'], ['W'], ['D','3-B',2,'open'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
    ]
};

export const sprites = {
  ice: <img id="player" src={ice} width="50" height="50"/>,
  lava: <img id="player" src={lava} width="50" height="50"/>,
  coin: <img id="player" src={coin} width="50" height="50"/>,
  wall: <img id="player" src={wall} width="50" height="50"/>,
  tile: <img id="player" src={tile} width="50" height="50"/>,
  stairs: <img id="player" src={stairs} width="50" height="50"/>,
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
  platformOnEW: <img id="player" src={platformOnEW} width="50" height="50"/>
};

export const map = {
  1: [10, 9, -2, 8,
      -1, 7, 6, 5,
      4, 3, 2, 1]
};
