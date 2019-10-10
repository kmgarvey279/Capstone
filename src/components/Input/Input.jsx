import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as textModule from '../../redux/modules/text/text';
import * as menuModule from '../../redux/modules/menu';
import * as soundsModule from '../../redux/modules/sounds';
import './Input.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

  handleKeyPress(event){
    if (event.keyCode === 32 || event.keyCode === 13) {
      this.props.dispatch(textModule.selectOption(this.state.value));
      this.props.dispatch(textModule.toggleTextInput(false));
      this.props.dispatch(textModule.setParagraph(this.props.text.paragraph + 1));
      this.props.dispatch(textModule.setLine(0));
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
    return (
      <div id="input-wrap">
        <input
        type='text'
        autoFocus={true}
        value={this.state.value}
        onChange={this.handleChange}
        id='name'/>
      </div>
    );
  }
}

Input.propTypes = {
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

export default (connect(mapDispatchToProps)(Input));
