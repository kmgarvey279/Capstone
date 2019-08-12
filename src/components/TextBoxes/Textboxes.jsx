import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Textboxes.css'

function TextBoxes(props) {
  let textArr = props.text.activeText[props.text.paragraph];
  let speaker;
  let text;

  if (textArr.length > 1) {
    text = textArr[1].split("|");
    speaker = textArr[0];
  } else {
    text = textArr[0].split("|");
  }
  if (speaker !== undefined) {
    return (
      <div id='wrap'>
        <div id='content'>
        {speaker + ":"} {text[props.text.line]}
        </div>
      </div>
    );
  } else {
    return (
      <div id='wrap'>
        <div id='content'>
          {text}
        </div>
      </div>
    );
  }
}

TextBoxes.propTypes = {
  text: PropTypes.object.isRequired
};

export default connect()(TextBoxes);
