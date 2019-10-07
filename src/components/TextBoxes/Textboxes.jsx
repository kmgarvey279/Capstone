import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameModule from '../../redux/modules/game';
import * as textModule from '../../redux/modules/text/text';
import './Textboxes.css'
import Options from '../Options/Options';
import Input from '../Input/Input';
import Speaker from '../Speaker/Speaker';
import * as textConsts from '../../redux/modules/text/textConstants';

class TextBoxes extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    let paragraphToRender;
    let activeSpeaker;
    //get paragraph and speaker (if applicable)
    if (this.props.text.activeTextType == 'dialogue') {
      activeSpeaker = textConsts.dialogue[this.props.text.activeText][this.props.text.paragraph][0];
      paragraphToRender = textConsts.dialogue[this.props.text.activeText][this.props.text.paragraph][1];
    } else {
      paragraphToRender = textConsts.examine[this.props.text.activeText][this.props.text.paragraph];
    }
    let lineToRender = '';
    if (paragraphToRender[this.props.text.line] == 'options') {
      lineToRender = paragraphToRender[this.props.text.line + 1];
    } else if (paragraphToRender[this.props.text.line] == 'results') {
      lineToRender = paragraphToRender[1][this.props.text.selectedOption];
    } else if (paragraphToRender[this.props.text.line] == 'textInput') {
      lineToRender = paragraphToRender[this.props.text.line + 1];
    } else {
      lineToRender = paragraphToRender[this.props.text.line];
    }

    if (this.props.text.textInput == true) {
      return (
        <div id="wrap">
          <div id="content">
            <div id="text">{lineToRender}</div>
            <Input text={this.props.text} menu={this.props.menu}/>
            <span className="next-prompt">Next: <span className="next-button-prompt">Space</span></span>
          </div>
        </div>
      )
    } else if (this.props.text.options.length > 1) {
      return (
        <div id="wrap">
          <div id="content">
            <div id="text">{lineToRender}</div>
            <Options text={this.props.text} menu={this.props.menu}/>
            <span className="next-prompt">Next: <span className="next-button-prompt">Space</span></span>
          </div>
        </div>
      )
    } else if (this.props.text.activeTextType == 'dialogue') {
      return (
        <div id="wrap">
          <div id="content">
            <Speaker speaker={activeSpeaker}/>
            <div id="dialogueText">{lineToRender}</div>
            <span className="next-prompt">Next: <span className="next-button-prompt">Space</span></span>
          </div>
        </div>
      );
    } else if (this.props.text.activeText.includes("phone")) {
      return (
        <div id="wrap">
          <div id="content" className="special">
            <div id="text">{lineToRender}</div>
            <div className="next-prompt">Next: <span className="next-button-prompt">Space</span></div> 
          </div>
        </div>
      );
    } else {
      return (
        <div id="wrap">
          <div id="content">
            <div id="text">{lineToRender}</div>
            <div className="next-prompt">Next: <span className="next-button-prompt">Space</span></div> 
          </div>
        </div>
      );
    }
  }
}

TextBoxes.propTypes = {
  text: PropTypes.object.isRequired,
  menu: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    textModule: bindActionCreators(textModule, dispatch),
    gameModule: bindActionCreators(gameModule, dispatch)
  }
}

export default (connect(mapDispatchToProps)(TextBoxes));
