import React from 'react';

import
import taser from '../../../assets/images/projectiles/taser.png';
import cryostat from '../../../assets/images/projectiles/cryostatEast.gif';

export const weapons = {
  1: {
    id: 1,
    name: 'Taser Gun',
    range: 4,
    sprites: {
      north: <img id="player" src={taser} width="80" height="80"/>,
      west: <img id="player" src={taser} width="80" height="80"/>,
      east: <img id="player" src={taser} width="80" height="80"/>,
      south: <img id="player" src={taser} width="80" height="80"/>,
      burst: <img id="player" src={taser} width="80" height="80"/>,
      icon: <img id="player" src={taser} width="80" height="80"/>
    }
  },
  2: {
    id: 2,
    name: 'Cryostat',
    range: 3,
    sprites: {
      north: <img id="player" src={cryostat} width="80" height="80"/>,
      west: <img id="player" src={cryostat} width="80" height="80"/>,
      east: <img id="player" src={cryostat} width="80" height="80"/>,
      south: <img id="player" src={cryostat} width="80" height="80"/>,
      burst: <img id="player" src={taser} width="80" height="80"/>,
      icon: <img id="player" src={taser} width="80" height="80"/>
    }
  }
};
