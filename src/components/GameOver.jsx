import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as menuModule from './../redux/modules/menu';
import * as playerModule from './../redux/modules/player';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';

class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
    this.props.dispatch(menuModule.changeMenu('gameOver'));
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
      this.selectOption();
    }
  }

  cycleOption() {
    if (this.props.menu.selectedOption === 1) {
      this.props.dispatch(menuModule.changeOption(2));
    } else if (this.props.menu.selectedOption === 2){
      this.props.dispatch(menuModule.changeOption(1));
    }
  }

  selectOption(){
    if (this.props.menu.selectedOption === 1) {
    this.props.dispatch(playerModule.updatePlayerHealth(100));
    this.props.handleStart();
  } else if (this.props.menu.selectedOption === 2) {
    this.props.history.push('/');
    }
  }

  render() {
    if(this.props.menu.selectedOption === 1) {
      return (
        <div>
          <style jsx>{`
            div#new {
              border: solid red 2px;
            }
            div#load {
            }
          `}</style>
          <h1>Title!</h1>
          <div id='new'><h4>Continue</h4></div>
          <div id ='load'><h4>Give Up</h4></div>
        </div>
      );
    } else if (this.props.menu.selectedOption === 2) {
      return (
        <div>
          <style jsx>{`
            div#new {
            }
            div#load {
              border solid red 2px;
            }
          `}</style>
          <h1>Title!</h1>
          <div id='new'><h4>Continue</h4></div>
          <div id ='load'><h4>Give Up</h4></div>
        </div>
      );
    } else {
      return (
        <div>
          <style jsx>{`
            div#new {
            }
            div#load {
            }
          `}</style>
          <h1>Title!</h1>
          {this.props.menu.selectedOption}
          <div id='new'><h4>Continue</h4></div>
          <div id ='load'><h4>Give Up</h4></div>
        </div>
      );
    }
  }
}


GameOver.propTypes = {
  menu: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  handleStart: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    menuModule : bindActionCreators(menuModule, dispatch),
    playerModule : bindActionCreators(playerModule, dispatch)
  }
};

export default withRouter(connect(mapDispatchToProps)(GameOver));
