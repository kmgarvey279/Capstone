import React from 'react';

import blobNorth from '../../../assets/images/enemies/blob-back.gif';
import blobEast from '../../../assets/images/enemies/blob.gif';
import blobSouth from '../../../assets/images/enemies/blob.gif';
import blobWest from '../../../assets/images/enemies/blob-back.gif';
import blobKnockbackNorth from '../../../assets/images/enemies/blob-front-knockback.gif';
import blobKnockbackEast from '../../../assets/images/enemies/blob-front-knockback.gif';
import blobKnockbackSouth from '../../../assets/images/enemies/blob-front-knockback.gif';
import blobKnockbackWest from '../../../assets/images/enemies/blob-front-knockback.gif';
import blobShock from '../../../assets/images/enemies/blob-shock.gif';
import blobFrozen from '../../../assets/images/enemies/blob-frozen.png';
import bubble from '../../../assets/images/enemies/bubble.gif';

import bossNorth from '../../../assets/images/enemies/boss1.gif';
import bossEast from '../../../assets/images/enemies/boss1.gif';
import bossSouth from '../../../assets/images/enemies/boss1.gif';
import bossWest from '../../../assets/images/enemies/boss1.gif';

export const sprites = {
  //Blob Type
  slime: {
    move: {
      north: <img id="player" src={blobNorth} width="80" height="80"/>,
      east: <img id="player" src={blobEast} width="80" height="80"/>,
      south: <img id="player" src={blobSouth} width="80" height="80"/>,
      west: <img id="player" src={blobWest} width="80" height="80"/>
    },
    knockback: {
      north: <img id="player" src={blobNorth} width="40" height="40"/>,
      east: <img id="player" src={blobEast} width="40" height="40"/>,
      south: <img id="player" src={blobSouth} width="40" height="40"/>,
      west: <img id="player" src={blobWest} width="40" height="40"/>
    },
    frozen: <img id="player" src={blobFrozen} width="90" height="90"/>,
    shock: <img id="player" src={blobShock} width="90" height="90"/>
  },
  bubble: {
    move: {
      north: <img src={bubble} width="80" height="80"/>,
      east: <img src={bubble} width="80" height="80"/>,
      south: <img src={bubble} width="80" height="80"/>,
      west: <img src={bubble} width="80" height="80"/>
    }
  },
  boss: {
    move: {
      north: <img id="player" src={bossNorth} width="300" height="300"/>,
      east: <img id="player" src={bossEast} width="300" height="300"/>,
      south: <img id="player" src={bossSouth} width="300" height="300"/>,
      west: <img id="player" src={bossWest} width="300" height="300"/>
    }
  }
};

export const enemies = {
  slime: {
    kind: 'Slime',
    sprites: sprites['slime'],
    health: 40
  },
  robot: {
    kind: 'Robot',
    health: 60
  },
  alien: {
    kind: 'Alien',
    health: 80
  },
  boss: {
    kind: 'Boss',
    sprites: sprites['boss'],
    health: 1000
  },
  bubble: {
    kind: 'bubble',
    sprites: sprites['bubble'],
    health: 1
  }
};
