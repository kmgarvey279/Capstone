import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as textModule from '../../redux/modules/text/text';
import * as menuModule from '../../redux/modules/menu';
import * as soundsModule from '../../redux/modules/sounds';
import './Options.css';

class Options extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  handleKeyPress(event){
    if(event.keyCode === 38){
      this.cycleOption();
    } else if(event.keyCode === 40){
      this.cycleOption();
    } else if (event.keyCode === 32 || event.keyCode === 13) {
      if (this.props.text.activeText.includes("terminal")){
        this.props.dispatch(soundsModule.changeEffect('confirm'));
      }
      this.props.dispatch(textModule.selectOption(this.props.menu.selectedOption - 1));
      this.props.dispatch(textModule.setParagraph(this.props.text.paragraph + 1));
      this.props.dispatch(textModule.setLine(0));
      this.props.dispatch(textModule.setOptions([]));
    }
  }

  cycleOption() {
    this.props.dispatch(soundsModule.changeEffect('select'));
    if (this.props.menu.selectedOption === 1) {
      this.props.dispatch(menuModule.changeOption(2));
    } else if (this.props.menu.selectedOption === 2){
      this.props.dispatch(menuModule.changeOption(1));
    }
  }

  render(){
    if (this.props.menu.selectedOption == 1) {
      return (
        <div>
          <div id="selectedOption">{this.props.text.options[0]}</div>
          {this.props.text.options[1]}
        </div>
      );
    } else {
      return (
        <div>
          {this.props.text.options[0]}
          <div id="selectedOption">{this.props.text.options[1]}</div>
        </div>
      );
    }
  }
}

Options.propTypes = {
  menu: PropTypes.object,
  text: PropTypes.object
}

function mapDispatchToProps(dispatch) {
  return {
    textModule: bindActionCreators(textModule, dispatch),
    menuModule: bindActionCreators(menuModule, dispatch),
    soundsModule: bindActionCreators(soundsModule, dispatch)
  }
}

export default (connect(mapDispatchToProps)(Options));
