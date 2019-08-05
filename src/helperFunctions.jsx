export function getDifference(direction) {
  if(direction == 'north') {
    return -1;
  } else if (direction == 'east') {
    return  12;
  } else if (direction == 'south') {
    return  1;
  } else {
    return  -12
  }
};

export function reverseDirection(direction) {
  if (direction == 'north') {
    return 'south';
  } else if (direction == 'south') {
    return 'north';
  } else if (direction == 'east') {
    return 'west';
  } else {
    return 'east';
  }
};

export function getTileDirection(thisSquareId) {
    if (thisSquareId == 1) {
      return 'northWest';
    } else if (thisSquareId === 133) {
      return 'southWest';
    } else if (thisSquareId === 12) {
      return 'northEast';
    } else if (thisSquareId === 144) {
      return 'southEast';
    } else if (thisSquareId %12 === 0) {
      return 'south';
    } else if (thisSquareId < 12) {
      return 'west';
    } else if (thisSquareId >= 131) {
      return 'east';
    } else if ((thisSquareId - 1) %12 === 0) {
      return 'north';
    } else {
      return 'other';
    }
  };

export function checkForPlayer(enemyLocation, playerLocation) {
    if (enemyLocation - 1 === playerLocation || enemyLocation -2 === playerLocation) {
      return 'north'
    } else if (enemyLocation + 12 == playerLocation || enemyLocation + 24 == playerLocation) {
      return 'east';
    } else if (enemyLocation + 1 == playerLocation || enemyLocation + 2 == playerLocation ) {
      return 'south';
    } else if (enemyLocation -12 == playerLocation || enemyLocation -24 == playerLocation) {
      return 'west';
    } else {
      return false;
    }
  }
