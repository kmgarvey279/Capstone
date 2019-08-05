import React from 'react';
//enemies
import blobNorth from '../../assets/images/enemies/blob-back.png';
import blobEast from '../../assets/images/enemies/blob.gif';
import blobSouth from '../../assets/images/enemies/blob.gif';
import blobWest from '../../assets/images/enemies/blob-back2.png';
import blobKnockbackNorth from '../../assets/images/enemies/blob-front-knockback.gif';
import blobKnockbackEast from '../../assets/images/enemies/blob-front-knockback.gif';
import blobKnockbackSouth from '../../assets/images/enemies/blob-front-knockback.gif';
import blobKnockbackWest from '../../assets/images/enemies/blob-front-knockback.gif';

import block from '../../assets/images/level/block.png';
import blockSink from '../../assets/images/level/blockSink.gif';
import switchOn from '../../assets/images/level/switchOn.gif';
import switchOff from '../../assets/images/level/switchOff.png';
import platformOffNS from '../../assets/images/level/platformOffNS.png';
import platformOnNS from '../../assets/images/level/platformOnNS.gif';
import platformOffEW from '../../assets/images/level/platformOffEW.png';
import platformOnEW from '../../assets/images/level/platformOnEW.gif';
//Constants
export const SET_LEVELID = "SET_LEVELID";
export const SET_PREVIOUS_LEVELID = "SET_PREVIOUS_LEVELID";
export const CHANGE_GAMESTATE = "CHANGE_GAMESTATE";
export const SET_RESPAWNPOINT = "SET_RESPAWNPOINT";
export const SET_ACTIVETEXT = "SET_ACTIVETEXT";

//Action Creators
export function changeGameState(newGameState) {
  return {
    type: CHANGE_GAMESTATE,
    gameState: newGameState
  };
}
export function setLevelId(newLevelId) {
  return {
    type: SET_LEVELID,
    levelId: newLevelId
  };
}
export function setPreviousLevelId(newPreviousLevelId) {
  return {
    type: SET_PREVIOUS_LEVELID,
    previousLevelId: newPreviousLevelId
  };
}

export function setRespawnPoint(newRespawnPoint) {
  return {
    type: SET_RESPAWNPOINT,
    respawnPoint: newRespawnPoint
  }
}

export function setActiveText(newActiveText) {
  return {
    type: SET_ACTIVETEXT,
    activeText: newActiveText
  }
}

//Initial State
const initialState = {
  levelId: 1,
  previousLevelId: 3,
  gameState: 'title',
  respawnPoint: '',
  enemyTimers: [],
  activeText: [],
  levelById: {
    // key: W = wall, D = door, P = pit, L = lava, B = block, E = enemy, S = switch, M = moving platform, T = terminal
    1:[
        ['W'], ['W'], ['W'], ['D','1-A',2,'locked'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
        ['W'], ['0'], ['0'], ['0'], ['P'], ['M', 'north'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
        ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['W'],
        ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
        ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['L'], ['0'], ['W'],
        ['W'], ['0'], ['0'], ['W'], ['E',1], ['0'], ['E',1], ['0'], ['0'], ['L'], ['L'], ['W'],
        ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
        ['W'], ['S', 18, 5000], ['W'], ['W'], ['$'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
        ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['$'], ['0'], ['W'],
        ['W'], ['0'], ['0'], ['I'], ['I'], ['I'], ['I'], ['0'], ['0'], ['0'], ['0'], ['W'],
        ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['T', 1], ['W'],
        ['W'], ['W'], ['W'], ['W'], ['W'], ['D','1-B',3,'open'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
      ],
       /////////////////////////////////////////////////
    2:[
        ['W'], ['W'], ['W'], ['D','2-A',1,'locked'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
        ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
        ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['W'],
        ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
        ['W'], ['0'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['L'], ['0'], ['W'],
        ['W'], ['0'], ['0'], ['W'], ['E',1], ['0'], ['E',1], ['0'], ['0'], ['L'], ['L'], ['W'],
        ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
        ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
        ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['W'],
        ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
        ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['0'], ['W'],
        ['W'], ['W'], ['W'], ['W'], ['W'], ['D','2-B',3,'open'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
      ],
       /////////////////////////////////////////////////
    3:[
        ['W'], ['W'], ['W'], ['D','3-A',1,'locked'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'],
        ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['0'], ['W'],
        ['W'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['P'], ['L'], ['0'], ['L'], ['W'],
        ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['B'], ['L'], ['L'], ['0'], ['W'],
        ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['0'], ['P'], ['P'], ['L'], ['0'], ['W'],
        ['W'], ['0'], ['0'], ['W'], ['E',1], ['0'], ['E',1], ['0'], ['0'], ['L'], ['L'], ['W'],
        ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
        ['W'], ['0'], ['0'], ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
        ['W'], ['0'], ['B'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W'], ['0'], ['0'], ['W'],
        ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'],
        ['W'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['0'], ['W'], ['0'], ['0'], ['W'],
        ['W'], ['W'], ['W'], ['W'], ['W'], ['D','3-B',2,'open'], ['W'], ['W'], ['W'], ['W'], ['W'], ['W']
      ]
  },
  map: { 1: [10, 9, -2, 8,
              -1, 7, 6, 5,
              4, 3, 2, 1]
        },
  enemyById: {
    1: {
      kind: 'Slime',
      sprites: {
        move: {
          north: <img id="player" src={blobNorth} width="70" height="70"/>,
          east: <img id="player" src={blobEast} width="70" height="70"/>,
          south: <img id="player" src={blobSouth} width="70" height="70"/>,
          west: <img id="player" src={blobWest} width="70" height="70"/>
        },
        knockback: {
          north: <img id="player" src={blobKnockbackNorth} width="40" height="40"/>,
          east: <img id="player" src={blobKnockbackNorth} width="40" height="40"/>,
          south: <img id="player" src={blobKnockbackNorth} width="40" height="40"/>,
          west: <img id="player" src={blobKnockbackNorth} width="40" height="40"/>
        }
      },
      health: 40
    },
    2: {
      kind: 'Robot',
      sprites: {},
      health: 60
    },
    3: {
      kind: 'Alien',
      sprites: {},
      health: 80
    }
  },
  miscSprites: {
    block:  <img id="player" src={block} width="80" height="80"/>,
    blockSink: <img id="player" src={blockSink} width="60" height="60"/>,
    switchOff: <img id="player" src={switchOff} width="50" height="50"/>,
    switchOn: <img id="player" src={switchOn} width="50" height="50"/>,
    platformOffNS: <img id="player" src={platformOffNS} width="50" height="50"/>,
    platformOnNS: <img id="player" src={platformOnNS} width="50" height="50"/>,
    platformOffEW: <img id="player" src={platformOffEW} width="50" height="50"/>,
    platformOnEW: <img id="player" src={platformOnEW} width="50" height="50"/>
  }
};

  // 2: {
  //   vertical: <img id="player" src={flare} width="50" height="50"/>,
  //   horizontal: <img id="player" src={flare} width="50" height="50"/>,
  //   burst: <img id="player" src={flare} width="70" height="70"/>,
  //   icon: <img id="player" src={flare} width="70" height="70"/>
  // },
  // 3: {
  //   vertical: <img id="player" src={flare} width="50" height="50"/>,
  //   horizontal: <img id="player" src={flare} width="50" height="50"/>,
  //   burst: <img id="player" src={flare} width="70" height="70"/>,
  //   icon: <img id="player" src={flare} width="70" height="70"/>
  // }
// };

const enemySpriteList = {
  //Blob Type
  1: {
    move: {
      north: <img id="player" src={blobNorth} width="50" height="50"/>,
      east: <img id="player" src={blobEast} width="50" height="50"/>,
      south: <img id="player" src={blobSouth} width="50" height="50"/>,
      west: <img id="player" src={blobWest} width="50" height="50"/>
    },
    knockback: {
      north: <img id="player" src={blobNorth} width="40" height="40"/>,
      east: <img id="player" src={blobEast} width="40" height="40"/>,
      south: <img id="player" src={blobSouth} width="40" height="40"/>,
      west: <img id="player" src={blobWest} width="40" height="40"/>
    }
  }
};

//Reducer
const gameReducer = (state = initialState, action) => {
  let newState;
  const { gameState, coolDown, levelId, respawnPoint, previousLevelId, activeText } = action;

  switch (action.type) {
    case CHANGE_GAMESTATE:
      newState = Object.assign({}, state, {
        gameState: gameState
      });
      return newState;
    case SET_LEVELID:
      newState = Object.assign({}, state, {
        levelId: levelId
      });
      return newState;
    case SET_PREVIOUS_LEVELID:
      newState = Object.assign({}, state, {
        previousLevelId: previousLevelId
      });
      return newState;
    case SET_RESPAWNPOINT:
      newState = Object.assign({}, state, {
        respawnPoint: respawnPoint
      });
      return newState;
    case SET_ACTIVETEXT:
      newState = Object.assign({}, state, {
        activeText: activeText
      });
      return newState;
  default:
    return state;
  }
};

export default gameReducer;
