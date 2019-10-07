import React from 'react';

import playerStandNorth from '../../../assets/images/player/playerStandNorth.gif';
import playerStandEast from '../../../assets/images/player/playerStandEast.gif';
import playerStandSouth from '../../../assets/images/player/playerStandSouth.gif';
import playerStandSouthGray from '../../../assets/images/player/playerStandSouth-gray.png';
import playerStandWest from '../../../assets/images/player/playerStandWest.gif';
import playerWalkNorth from '../../../assets/images/player/playerWalkNorth.gif';
import playerWalkNorth2 from '../../../assets/images/player/playerWalkNorth2.gif';
import playerWalkEast1 from '../../../assets/images/player/playerWalkEast.gif';
import playerWalkEast2 from '../../../assets/images/player/playerWalkEast2.gif';
import playerWalkSouth from '../../../assets/images/player/playerWalkSouth.gif';
import playerWalkSouth2 from '../../../assets/images/player/playerWalkSouth2.gif';
import playerWalkWest1 from '../../../assets/images/player/playerWalkWest.gif';
import playerWalkWest2 from '../../../assets/images/player/playerWalkWest2.gif';
import playerAttackNorth from '../../../assets/images/player/playerWalkEast.gif';
import playerAttackEast from '../../../assets/images/player/playerAttackEast.gif';
import playerAttackSouth from '../../../assets/images/player/playerAttackSouth.gif';
import playerAttackWest from '../../../assets/images/player/playerAttackWest.gif';
import playerKnockbackSouth from '../../../assets/images/player/playerKnockbackSouth.gif';
import playerKnockbackNorth from '../../../assets/images/player/playerKnockbackNorth.gif';
import playerDashSouth from '../../../assets/images/player/playerDashSouth.gif';
import playerParticleSouth from '../../../assets/images/player/playerParticleSouth.gif';
import playerParticleEast from '../../../assets/images/player/playerParticleEast.gif';
import playerPunchSouth from '../../../assets/images/player/playerPunchSouth.gif';
import playerPunchNorth from '../../../assets/images/player/playerPunchSouth.gif';
import playerPunchEast from '../../../assets/images/player/playerPunchSouth.gif';
import playerPunchWest from '../../../assets/images/player/playerPunchSouth.gif';

import punchImpact from '../../../assets/images/player/punch.gif';

export const sprites = {
  stand: {
    north: <img id="player" src={playerStandNorth} width="80" height="80"/>,
    east: <img id="player" src={playerStandEast} width="80" height="80"/>,
    south: <img id="player" src={playerStandSouth} width="80" height="80"/>,
    southGray: <img id="player" src={playerStandSouthGray} width="80" height="80"/>,
    west: <img id="player" src={playerStandWest} width="80" height="80"/>,
  },
  walk: {
    north: <img id="player" src={playerWalkNorth} width="80" height="80"/>,
    north2: <img id="player" src={playerWalkNorth2} width="80" height="80"/>,
    east: <img id="player" src={playerWalkEast1} width="80" height="80"/>,
    east2: <img id="player" src={playerWalkEast2} width="80" height="80"/>,
    south: <img id="player" src={playerWalkSouth} width="80" height="80"/>,
    south2: <img id="player" src={playerWalkSouth2} width="80" height="80"/>,
    west: <img id="player" src={playerWalkWest1} width="80" height="80"/>,
    west2: <img id="player" src={playerWalkWest2} width="80" height="80"/>,
  },
  knockback: {
    north: <img id="player" src={playerKnockbackNorth} width="80" height="80"/>,
    east: <img id="player" src={playerKnockbackSouth} width="80" height="80"/>,
    south: <img id="player" src={playerKnockbackSouth} width="80" height="80"/>,
    west: <img id="player" src={playerKnockbackSouth} width="80" height="80"/>,
  },
  attack: {
    north: <img id="player" src={playerAttackNorth} width="80" height="80" />,
    east: <img id="player" src={playerAttackEast} width="80" height="80" />,
    south: <img id="player" src={playerAttackSouth} width="80" height="80" />,
    west: <img id="player" src={playerAttackWest} width="80" height="80" />,
  },
  dash: {
    north: <img id="player" src={playerDashSouth} width="80" height="80" />,
    east: <img id="player" src={playerDashSouth} width="80" height="80" />,
    west: <img id="player" src={playerDashSouth} width="80" height="80" />,
    south: <img id="player" src={playerDashSouth} width="80" height="80" />,
  },
  punch: {
    north: <img id="player" src={playerPunchNorth} width="80" height="80" />,
    east: <img id="player" src={playerPunchEast} width="80" height="80" />,
    west: <img id="player" src={playerPunchWest} width="80" height="80" />,
    south: <img id="player" src={playerPunchSouth} width="80" height="80" />,
  },
  particle: {
    north: <img id="player" src={playerParticleSouth} width="80" height="80"/>,
    east: <img id="player" src={playerParticleEast} width="80" height="80"/>,
    south: <img id="player" src={playerParticleSouth} width="80" height="80"/>,
    west: <img id="player" src={playerParticleEast} width="80" height="80"/>
  },
  punchImpact: <img id="player" src={punchImpact} width="80" height="80"/>,
  fall: <img id="player" src={playerStandEast} width="80" height="80"/>,
  victory: <img id="player" src={playerStandEast} width="80" height="80"/>
};
