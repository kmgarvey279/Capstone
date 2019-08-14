//Constants
export const SET_ACTIVE_TEXT = "SET_ACTIVE_TEXT";
export const SET_LINE = "SET_LINE";
export const SET_PARAGRAPH = "SET_PARAGRAPH";
export const SET_OPTIONS = "SET_OPTIONS";
export const SELECT_OPTION = "SELECT_OPTION";
export const TOGGLE_TEXT_INPUT = "TOGGLE_TEXT_INPUT";

//Action Creators
export function setActiveText(newActiveText, newType) {
  return {
    type: SET_ACTIVE_TEXT,
    activeText: newActiveText,
    activeTextType: newType
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

export function setOptions(newOptions) {
  return {
    type: SET_OPTIONS,
    options: newOptions
  }
}

export function selectOption(option) {
  return {
    type: SELECT_OPTION,
    selectedOption: option
  }
}

export function toggleTextInput(textInput) {
  return {
    type: TOGGLE_TEXT_INPUT,
    textInput: textInput
  }
}

//Initial State
const initialState = {
  activeText: null,
  activeTextType: null,
  line: 0,
  paragraph: 1,
  options: [],
  selectedOption: null,
  textInput: false,
}

//Reducer
const textReducer = (state = initialState, action) => {
  let newState;
  const { activeText, activeTextType, line, paragraph, options, selectedOption, textInput} = action;

  switch (action.type) {
    case SET_ACTIVE_TEXT:
      newState = Object.assign({}, state, {
        activeText: activeText,
        activeTextType: activeTextType
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
    case SET_OPTIONS:
      newState = Object.assign({}, state, {
        options: options
      });
      return newState;
    case SELECT_OPTION:
      newState = Object.assign({}, state, {
        selectedOption: selectedOption
      });
      return newState;
    case TOGGLE_TEXT_INPUT:
      newState = Object.assign({}, state, {
        textInput: textInput
      });
      return newState;
  default:
    return state;
  }
};

export default textReducer;
