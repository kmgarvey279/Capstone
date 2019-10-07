import taser from '../../../assets/images/items/taser.gif';
import taserIcon from '../../../assets/images/items/taserIcon.png';
import cryoIcon from '../../../assets/images/items/cryoIcon.png';
import taserBurst from '../../../assets/images/items/taserburst.gif';
import cryostatNS from '../../../assets/images/items/cryostatNS.gif';
import cryostatEW from '../../../assets/images/items/cryostatEW.gif';
import health from '../../../assets/images/items/health.png';
import keyCard1 from '../../../assets/images/items/key.png';
import keyCard2 from '../../../assets/images/items/key2.png';
import React from 'react';

export const weapons = {
  Taser: {
    name: 'Taser',
    range: 4,
    sprites: {
      projectile: <img src={taser} width="80" height="80"/>,
      burst: <img src={taserBurst} width="80" height="80"/>
    }
  },
  Cryostat: {
    name: 'Cryostat',
    range: 3,
    sprites: {
      projectileNS: <img src={cryostatNS} width="80" height="80"/>,
      projectileEW: <img src={cryostatEW} width="80" height="80"/>
    }
  }
};

export const sprites = {
  Taser: <img src={taserIcon} width="50" height="50"/>,
  Cryostat: <img src={cryoIcon} width="50" height="50"/>,
  health: <img src={health} width="50" height="50"/>,
  keyCard1: <img src={keyCard1} width="50" height="50"/>,
  keyCard2: <img src={keyCard2} width="50" height="50"/>
}
