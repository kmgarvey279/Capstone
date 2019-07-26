import React from 'react';
//enemies
import blobNorth from '../../assets/images/enemies/blob-back.png';
import blobEast from '../../assets/images/enemies/blob.png';
import blobSouth from '../../assets/images/enemies/blob-front2.png';
import blobWest from '../../assets/images/enemies/blob-back2.png';
import blobKnockbackNorth from '../../assets/images/enemies/blob-back-knockback.png';
import blobKnockbackEast from '../../assets/images/enemies/blob-front-knockback.png';
import blobKnockbackSouth from '../../assets/images/enemies/blob-front-knockback.png';
import blobKnockbackWest from '../../assets/images/enemies/blob-back-knockback.png';
import taser from '../../assets/images/projectiles/taser.png';

//Constants
export const LEVELID_UP = "LEVELID_UP";
export const CHANGE_GAMESTATE = "CHANGE_GAMESTATE";
export const TOGGLE_COOLDOWN = "TOGGLE_COOLDOWN";

//Action Creators
export function changeGameState(newGameState) {
  return {
    type: CHANGE_GAMESTATE,
    gameState: newGameState
  };
}
export function levelIdUp(newLevelId) {
  return {
    type: LEVELID_UP,
    levelId: newLevelId
  };
}

export function coolDown(newBool) {
  return {
    type: TOGGLE_COOLDOWN,
    coolDown: newBool
  }
}

//Initial State
const initialState = {
  levelId: 1,
  gameState: 'title',
  score: 0,
  currentWeapon: 1,
  weaponById: weapons,
  levelById: levels,
  enemyById: enemies,
  coolDown: false
}

const levels = {
  1:[
      'W', 'W', 'W', 'F', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W',
      'W', '0', '0', '0', '0', '0', '0', '0', 'L', '0', '0', 'W',
      'W', 'W', '0', '0', '0', '0', '0', '0', 'L', '0', 'L', 'W',
      'W', '0', '0', '0', '0', '0', '0', '0', 'L', 'L', '0', 'W',
      'W', 'W', 'W', 'W', '0', '0', '0', '0', '0', 'L', '0', 'W',
      'W', '0', '0', 'W', '1', '0', '1', '0', '0', 'L', 'L', 'W',
      'W', '0', '0', 'W', '0', '0', '0', '0', '0', '0', '0', 'W',
      'W', '0', '0', 'W', '0', '0', '0', '0', '0', '0', '0', 'W',
      'W', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'W',
      'W', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'W',
      'W', '0', '0', '0', '0', '0', '0', '0', 'W', '0', '0', 'W',
      'W', 'W', 'W', 'W', 'W', 'S', 'W', 'W', 'W', 'W', 'W', 'W'
    ],
     /////////////////////////////////////////////////
  2:['0', 'E', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', 'L', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', 'L', '0', '0', '0', '0',
     '0', '0', 'F', '0', '0', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', 'L', 'L', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', 'S', '0', '0', '0', '0', '0'],
     /////////////////////////////////////////////////
  3:['0', 'E', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', 'F', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', 'W',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', 'S', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
     '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
};

const weapons = {
  1: {
    id: 1,
    name: 'Taser Gun',
    range: 3,
    sprites: {
      north: <img id="player" src={taser} width="50" height="50"/>,
      west: <img id="player" src={taser} width="50" height="50"/>,
      east: <img id="player" src={taser} width="50" height="50"/>,
      south: <img id="player" src={taser} width="50" height="50"/>,
      burst: <img id="player" src={taser} width="70" height="70"/>,
      icon: <img id="player" src={taser} width="70" height="70"/>
    }
  },
  2: {
    id: 2,
    name: 'Flamethrower',
    range: 4,
    sprites: {}
  },
  3: {
    id: 3,
    name: 'Laser',
    range: 7,
    sprites: {}
    }
};

const enemies = {
  1: {
    kind: 'Slime',
    sprites: {
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
