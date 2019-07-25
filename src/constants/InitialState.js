import React from 'react';
import playerStandNorth from '../assets/images/player/playerStandNorth.png';
import playerStandEast from '../assets/images/player/playerStandEast.png';
import playerStandSouth from '../assets/images/player/playerStandSouth.png';
import playerStandWest from '../assets/images/player/playerStandWest.png';
import playerWalkNorth from '../assets/images/player/playerWalkNorth.png';
import playerWalkEast from '../assets/images/player/playerWalkEast.png';
import playerWalkSouth from '../assets/images/player/playerWalkSouth.png';
import playerWalkWest from '../assets/images/player/playerWalkWest.png';
import playerAttackNorth from '../assets/images/player/playerAttackNorth.png';
import playerAttackEast from '../assets/images/player/playerAttackEast.png';
import playerAttackSouth from '../assets/images/player/playerAttackSouth.png';
import playerAttackWest from '../assets/images/player/playerAttackWest.png';
//enemies
import blobNorth from '../assets/images/enemies/blob-back.png';
import blobEast from '../assets/images/enemies/blob.png';
import blobSouth from '../assets/images/enemies/blob-front2.png';
import blobWest from '../assets/images/enemies/blob-back2.png';
import blobKnockbackNorth from '../assets/images/enemies/blob-back-knockback.png';
import blobKnockbackEast from '../assets/images/enemies/blob-front-knockback.png';
import blobKnockbackSouth from '../assets/images/enemies/blob-front-knockback.png';
import blobKnockbackWest from '../assets/images/enemies/blob-back-knockback.png';
import taser from '../assets/images/projectiles/taser.png';

const levels = {
  1:[
      'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W',
      'W', '0', '0', '0', '0', '0', '0', '0', 'L', '0', '0', 'W',
      'W', 'W', '0', '0', '0', '0', '0', '0', 'L', '0', 'L', 'W',
      'W', 'F', '0', '0', '0', 'E', '0', '0', 'L', 'L', '0', 'W',
      'W', 'W', 'W', 'W', '0', '0', '0', '0', '0', 'L', '0', 'W',
      'W', '0', '0', 'W', '1', '0', '1', '0', '0', 'L', 'L', 'W',
      'W', '0', '0', 'W', '0', '0', '0', '0', '0', 'E', '0', 'W',
      'W', '0', '0', 'W', '0', '0', '0', '0', '0', '0', '0', 'W',
      'W', '0', '0', 'W', 'W', 'W', 'W', 'W', 'W', '0', '0', 'W',
      'W', '0', '0', 'E', '0', '0', '0', '0', '0', '0', '0', 'W',
      'W', '0', '0', '0', '0', '0', '0', '0', 'W', '0', 'S', 'W',
      'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'
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

const playerSpriteList = {
  stand: {
    north: <img id="player" src={playerStandNorth} width="55" height="55"/>,
    east: <img id="player" src={playerStandEast} width="55" height="55"/>,
    south: <img id="player" src={playerStandSouth} width="55" height="55"/>,
    west: <img id="player" src={playerStandWest} width="55" height="55"/>,
  },
  walk: {
    north: <img id="player" src={playerWalkNorth} width="50" height="55"/>,
    east: <img id="player" src={playerWalkEast} width="50" height="55"/>,
    south: <img id="player" src={playerWalkSouth} width="50" height="55"/>,
    west: <img id="player" src={playerWalkWest} width="50" height="55"/>,
  },
  knockback: {
    north: <img id="player" src={playerStandNorth} width="50" height="50"/>,
    east: <img id="player" src={playerStandEast} width="50" height="50"/>,
    south: <img id="player" src={playerStandSouth} width="50" height="50"/>,
    west: <img id="player" src={playerStandWest} width="50" height="50"/>,
  },
  attack: {
    north: <img id="player" src={playerAttackNorth} width="50" height="50" />,
    east: <img id="player" src={playerAttackEast} width="50" height="50" />,
    south: <img id="player" src={playerAttackSouth} width="50" height="50" />,
    west: <img id="player" src={playerAttackWest} width="50" height="50" />,
  },
  fall: <img id="player" src={playerStandEast} width="50" height="50"/>,
  victory: <img id="player" src={playerStandEast} width="50" height="50"/>
};

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
}

const weaponSpriteList = {
  1: {
    north: <img id="player" src={taser} width="50" height="50"/>,
    west: <img id="player" src={taser} width="50" height="50"/>,
    east: <img id="player" src={taser} width="50" height="50"/>,
    south: <img id="player" src={taser} width="50" height="50"/>,
    burst: <img id="player" src={taser} width="70" height="70"/>,
    icon: <img id="player" src={taser} width="70" height="70"/>
  }
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
}

const weapons = {
  1: {
    id: 1,
    name: 'Taser Gun',
    range: 3,
    sprites: weaponSpriteList[1]
  },
  2: {
    id: 2,
    name: 'Flamethrower',
    range: 4,
    sprites: weaponSpriteList[2]
  },
  3: {
    id: 3,
    name: 'Laser',
    range: 7,
    sprites: weaponSpriteList[3]
    }
};

const enemies = {
  1: {
    kind: 'Slime',
    sprites: enemySpriteList[1],
    health: 40
  },
  2: {
    kind: 'Robot',
    sprites: enemySpriteList[2],
    health: 60
  },
  3: {
    kind: 'Alien',
    sprites: enemySpriteList[3],
    health: 80
  }
};


export const initialState = {
  game: {
    levelId: 1,
    gameState: 'title',
    score: 0,
    weaponById: weapons,
    levelById: levels,
    enemyById: enemies,
    coolDown: false
  },
  player: {
    health: 100,
    weapon: weapons[1],
    direction: 'north',
    location: null,
    sprites: playerSpriteList
  }
};
