import { v4 } from 'uuid';

//Constants
export const CREATE_PROJECTILE = "CREATE_PROJECTILE";
export const UPDATE_PROJECTILE_LOCATION = "UPDATE_PROJECTILE_LOCATION";
export const NULL_PROJECTILE = "NULL_PROJECTILE";
export const NULL_ALL_PROJECTILES = "NULL_ALL_PROJECTILES";

//Action Creators
export function createProjectile(newProjectileId, newDirection, newLocation, newTarget) {
  return {
    type: CREATE_PROJECTILE,
    projectileId: newProjectileId,
    direction: newDirection,
    location: newLocation,
    target: newTarget
  };
}
export function updateProjectileLocation(newProjectileId, newLocation) {
  return {
    type: UPDATE_PROJECTILE_LOCATION,
    projectileId: newProjectileId,
    location: newLocation
  };
}
export function nullProjectile(projectileId) {
  return {
    type: NULL_PROJECTILE,
    projectileId: projectileId
  };
}

export function nullAllProjectiles() {
  return {
    type: NULL_ALL_PROJECTILES,
  }
}

//Initial State

//Reducer
const projectileReducer = (state = {}, action) => {
  let newState;
  let newProjectile;
  const { projectileId, location, direction, target } = action;

  switch (action.type) {
    case CREATE_PROJECTILE:
      newState = Object.assign({}, state, {
        [projectileId]: {
          projectileId: projectileId,
          location: location,
          direction: direction,
          target: target
        }
      });
      return newState;
    case UPDATE_PROJECTILE_LOCATION:
      newProjectile = Object.assign({}, state[projectileId], {location});
      newState = Object.assign({}, state, {
        [projectileId]: newProjectile
      });
      return newState;
    case NULL_PROJECTILE:
      newState = Object.assign({}, state, {
        [projectileId]: {}
      });
      return newState;
    case NULL_ALL_PROJECTILES:
      return {};
  default:
    return state;
  }
};

export default projectileReducer;
