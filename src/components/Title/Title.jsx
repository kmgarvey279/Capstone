import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as menuModule from '../../redux/modules/menu';
import * as soundsModule from '../../redux/modules/sounds';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import './Title.css'

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
    this.props.dispatch(soundsModule.changeMusic('title'));
  }

  handleKeyPress(event){
    if(event.keyCode === 38){
      this.cycleOption();
    } else if(event.keyCode === 40){
      this.cycleOption();
    } else if (event.keyCode === 32 || event.keyCode === 13) {
      this.selectOption();
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

  selectOption(){
    if (this.props.menu.selectedOption === 1) {
    this.props.handleStart();
    this.props.history.push('/game');
  } else if (this.props.menu.selectedOption === 2) {
    }
  }

  render() {
    let newGame;
    let load;
    if(this.props.menu.selectedOption === 1) {
      newGame = <div id='selected'><h4>New Game</h4></div>;
      load = <div><h4>Load</h4></div>;
    } else {
      newGame = <div><h4>New Game</h4></div>;
      load = <div id='selected'><h4>Load</h4></div>;
    }
    return (
      <div>
        <h1>Title!</h1>
        {newGame}
        {load}
      </div>
    );
  }
}


Title.propTypes = {
  menu: PropTypes.object.isRequired,
  handleStart: PropTypes.func,
  sounds: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    menuModule : bindActionCreators(menuModule, dispatch),
    soundsModule : bindActionCreators(soundsModule, dispatch)
  }
};

export default withRouter(connect(mapDispatchToProps)(Title));
