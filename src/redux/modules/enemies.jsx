import { v4 } from 'uuid';

//Constants
export const CREATE_ENEMY = "CREATE_ENEMY";
export const UPDATE_ENEMY_LOCATION = "UPDATE_ENEMY_LOCATION";
export const UPDATE_ENEMY_DIRECTION = "UPDATE_ENEMY_DIRECTION";
export const UPDATE_ENEMY_HEALTH = "UPDATE_ENEMY_HEALTH";
export const NULL_ENEMY = "NULL_ENEMY";
export const NULL_ALL_ENEMIES = "NULL_ALL_ENEMIES";
export const UPDATE_ENEMY_STATUS = "UPDATE_ENEMY_STATUS";

//Action Creators
export function createEnemy(enemyId, newKind, newSprites, newHealth, newStatus, newLocation, newDirection) {
  return {
    type: CREATE_ENEMY,
    enemyId: enemyId,
    kind: newKind,
    sprites: newSprites,
    health: newHealth,
    status: newStatus,
    location: newLocation,
    direction: newDirection
  }
}

export function updateEnemyLocation(enemyIdToUpdate, newLocation) {
  return {
    type: UPDATE_ENEMY_LOCATION,
    enemyId: enemyIdToUpdate,
    location: newLocation
  }
}

export function updateEnemyStatus(enemyIdToUpdate, newStatus) {
  return {
    type: UPDATE_ENEMY_STATUS,
    enemyId: enemyIdToUpdate,
    status: newStatus
  }
}

export function updateEnemyDirection(enemyIdToUpdate, newDirection) {
  return {
    type: UPDATE_ENEMY_DIRECTION,
    enemyId: enemyIdToUpdate,
    direction: newDirection
  }
}

export function updateEnemyHealth(enemyIdToUpdate, newHealth) {
  return {
    type: UPDATE_ENEMY_HEALTH,
    enemyId: enemyIdToUpdate,
    health: newHealth
  }
}

export function nullEnemy(enemyIdToUpdate) {
  return {
    type: NULL_ENEMY,
    enemyId: enemyIdToUpdate
  }
}

export function nullAllEnemies() {
  return {
    type: NULL_ALL_ENEMIES,
  }
}


//Initial State

//Reducer
const enemyReducer = (state = {}, action) => {
  let newState;
  let newEnemy;
  const { enemyId, kind, sprites, location, direction, health, status } = action;

  switch (action.type) {
    case CREATE_ENEMY:
      newState = Object.assign({}, state, {
        [enemyId]: {
          enemyId: enemyId,
          kind: kind,
          sprites: sprites,
          location: location,
          direction: direction,
          health: health,
          status: status
        }
      });
      return newState;
    case UPDATE_ENEMY_LOCATION:
      newEnemy = Object.assign({}, state[enemyId], {location});
      newState = Object.assign({}, state, {
        [enemyId]: newEnemy
      });
      return newState;
    case UPDATE_ENEMY_DIRECTION:
      newEnemy = Object.assign({}, state[enemyId], {direction});
      newState = Object.assign({}, state, {
        [enemyId]: newEnemy
      });
      return newState;
    case UPDATE_ENEMY_HEALTH:
      newEnemy = Object.assign({}, state[enemyId], {health});
      newState = Object.assign({}, state, {
        [enemyId]: newEnemy
      });
      return newState;
    case UPDATE_ENEMY_STATUS:
      newEnemy = Object.assign({}, state[enemyId], {status});
      newState = Object.assign({}, state, {
        [enemyId]: newEnemy
      });
      return newState;
    case NULL_ENEMY:
      newState = Object.assign({}, state, {
        [enemyId]: {}
      })
      return newState;
    case NULL_ALL_ENEMIES:
      return {};
  default:
    return state;
  }
};

export default enemyReducer;
