//Constants
export const CREATE_PLATFORM = "CREATE_PLATFORM";
export const ACTIVATE_PLATFORM = "ACTIVATE_PLATFORM";
export const NULL_ALL_PLATFORMS = "NULL_ALL_PLATFORMS";
export const UPDATE_PLATFORM_LOCATION = "UPDATE_PLATFORM_LOCATION";
export const UPDATE_PLATFORM_DIRECTION = "UPDATE_PLATFORM_DIRECTION";

//Action Creators
export function createPlatform(platformId, start, location, direction, isActive) {
  return {
    type: CREATE_PLATFORM,
    platformId: platformId,
    start: start,
    location: location,
    direction: direction,
    isActive: isActive
  }
}

export function updatePlatformLocation(platformId, location) {
  return {
    type: UPDATE_PLATFORM_LOCATION,
    platformId: platformId,
    location: location
  }
}

export function updatePlatformDirection(platformId, direction) {
  return {
    type: UPDATE_PLATFORM_DIRECTION,
    platformId: platformId,
    direction: direction
  }
}


export function activatePlatform(platformId, isActive) {
  return {
    type: ACTIVATE_PLATFORM,
    platformId: platformId,
    isActive: isActive
  }
}

export function nullAllPlatforms() {
  return {
    type: NULL_ALL_PLATFORMS
  }
}

//Initial State

//Reducer
const platformReducer = (state = {}, action) => {
  let newState;
  let newPlatform;
  const { platformId, location, start, direction, isActive } = action;

  switch (action.type) {
    case CREATE_PLATFORM:
      newState = Object.assign({}, state, {
        [platformId]: {
          platformId: platformId,
          start: start,
          location: location,
          direction: direction,
          isActive: isActive
        }
      });
      return newState;
    case ACTIVATE_PLATFORM:
      newPlatform = Object.assign({}, state[platformId], {isActive});
      newState = Object.assign({}, state, {
        [platformId]: newPlatform
      });
      return newState;
    case UPDATE_PLATFORM_LOCATION:
      newPlatform = Object.assign({}, state[platformId], {location});
      newState = Object.assign({}, state, {
        [platformId]: newPlatform
      });
      return newState;
    case UPDATE_PLATFORM_DIRECTION:
      newPlatform = Object.assign({}, state[platformId], {direction});
      newState = Object.assign({}, state, {
        [platformId]: newPlatform
      });
      return newState;
    case NULL_ALL_PLATFORMS:
      return {};
  default:
    return state;
  }
};

export default platformReducer;
