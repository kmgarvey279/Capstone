import React from 'react';

import blobNorth from '../../../assets/images/enemies/blob-back.png';
import blobEast from '../../../assets/images/enemies/blob.gif';
import blobSouth from '../../../assets/images/enemies/blob.gif';
import blobWest from '../../../assets/images/enemies/blob-back2.png';
import blobKnockbackNorth from '../../../assets/images/enemies/blob-front-knockback.gif';
import blobKnockbackEast from '../../../assets/images/enemies/blob-front-knockback.gif';
import blobKnockbackSouth from '../../../assets/images/enemies/blob-front-knockback.gif';
import blobKnockbackWest from '../../../assets/images/enemies/blob-front-knockback.gif';

export const sprites = {
  //Blob Type
  slime: {
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
  }
};
