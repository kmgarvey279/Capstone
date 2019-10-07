import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as menuModule from '../../redux/modules/menu';
import * as playerModule from '../../redux/modules/player/player';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import './GameOver.css';
import branchEnd from '../../assets/images/menu/branch-end.png';

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
    this.props.dispatch(menuModule.changeMenu('title'));
    this.props.history.push('/');
    }
  }

  render() {
    if(this.props.menu.selectedOption === 1) {
      return (
        <div className="game-over">
          <h1>Branch Terminated</h1>
          <img id="branch" src={branchEnd} width="1000" height="300"/>
          <div id='select'><h4>Try Again</h4></div>
          <div><h4>Embrace the Void</h4></div>
        </div>
      );
    } else {
      return (
        <div className="game-over">
          <h1>Branch Terminated</h1>
          <img id="branch" src={branchEnd} width="1000" height="300"/>
          <div><h4>Try Again</h4></div>
          <div id='select'><h4>Embrace the Void</h4></div>
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
