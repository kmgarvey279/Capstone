//Constants
export const SET_ACTIVETEXT = "SET_ACTIVETEXT";
export const SET_LINE = "SET_LINE";
export const SET_PARAGRAPH = "SET_PARAGRAPH";

//Action Creators
export function setActiveText(newActiveText) {
  return {
    type: SET_ACTIVETEXT,
    activeText: newActiveText
  }
}

export function setLine(newLine) {
  return {
    type: SET_LINE,
    line: newLine
  }
}

export function setParagraph(newParagraph) {
  return {
    type: SET_PARAGRAPH,
    paragraph: newParagraph
  }
}

//Initial State
const initialState = {
  activeText: [],
  line: 0,
  paragraph: 1
}

//Reducer
const textReducer = (state = initialState, action) => {
  let newState;
  const { activeText, line, paragraph } = action;

  switch (action.type) {
    case SET_ACTIVETEXT:
      newState = Object.assign({}, state, {
        activeText: activeText
      });
      return newState;
    case SET_LINE:
      newState = Object.assign({}, state, {
        line: line
      });
      return newState;
    case SET_PARAGRAPH:
      newState = Object.assign({}, state, {
        paragraph: paragraph
      });
      return newState;
  default:
    return state;
  }
};

export default textReducer;
