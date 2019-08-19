import sprites from './roomSprites.jsx';
import rooms from './roomTemplates.jsx';

const maps = {
  1: [10, 9, -2, 8,
      -1, 7, 6, 5,
      4, 3, 2, 1]
};

const roomConsts = {
  sprites: sprites,
  rooms: rooms,
  maps: maps
}

export default roomConsts;
