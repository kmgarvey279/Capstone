export function getDifference(direction) {
  if(direction == 'north') {
    return -1;
  } else if (direction == 'east') {
    return  13;
  } else if (direction == 'south') {
    return  1;
  } else {
    return  -13
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

export function checkForPlayer(enemyLocation, playerLocation) {
    if (enemyLocation - 1 === playerLocation || enemyLocation -2 === playerLocation) {
      return 'north'
    } else if (enemyLocation + 13 == playerLocation || enemyLocation + 26 == playerLocation) {
      return 'east';
    } else if (enemyLocation + 1 == playerLocation || enemyLocation + 2 == playerLocation ) {
      return 'south';
    } else if (enemyLocation -13 == playerLocation || enemyLocation -26 == playerLocation) {
      return 'west';
    } else {
      return false;
    }
  }
