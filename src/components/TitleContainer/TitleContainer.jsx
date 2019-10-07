import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as menuModule from '../../redux/modules/menu';
import * as soundsModule from '../../redux/modules/sounds';
import * as savesModule from '../../redux/modules/save-data';
import * as gameModule from '../../redux/modules/game';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import Select from '../Select/Select';
import Title from '../Title/Title';
import Error from '../Error/Error';
import BranchSelect from '../BranchSelect/BranchSelect';
import './TitleContainer.css';

class TitleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  };

  handleKeyPress(event){
    if (this.props.menu.selectedMenu !== 'title'){
      if(event.keyCode === 38){
        this.cycleOption(-1);
      } else if(event.keyCode === 40){
        this.cycleOption(1);
      }
    }
    if (event.keyCode === 32 || event.keyCode === 13) {
      this.selectOption();
    }
  };

  cycleOption(direction) {
    this.props.dispatch(soundsModule.changeEffect('select'));
    let nextOption = this.props.menu.selectedOption + direction;
    if (nextOption > 6) {
      this.props.dispatch(menuModule.changeOption(1));
    } else if (nextOption <= 0) {
      this.props.dispatch(menuModule.changeOption(6));
    } else {
      this.props.dispatch(menuModule.changeOption(nextOption));
    }
  };

  selectOption(){
    let selectNum = this.props.menu.selectedOption;
    //Title Screen
    if (this.props.menu.selectedMenu == 'title' && this.props.game.gameState == 'postExitBranch'){
      this.props.dispatch(menuModule.changeMenu('branchSelect'));
    } else if (this.props.menu.selectedMenu == 'title') {
      this.props.dispatch(menuModule.changeMenu('select'));
      this.props.dispatch(soundsModule.changeEffect('ping'));
      this.props.dispatch(soundsModule.changeMusic('title'));
    //select branch
    } else if (this.props.menu.selectedMenu == 'branchSelect') {
      if (selectNum <= 3) {
        //set the new file which will continue the game
        let nextFile;
        if (this.props.game.file == 3) {
          nextFile = 2;
        } else {
          nextFile = this.props.game.file + 1;
        };
        if (selectNum == this.props.game.file) {
          this.props.handleLoad();
          this.props.history.push('/game');
        } else if (selectNum == nextFile) {
          this.props.dispatch(gameModule.setBranch(this.props.game.branch + 1));
          if(this.props.game.branch === 3) {
            this.props.dispatch(soundsModule.changeMusic('spookyTitle'));
            this.props.dispatch(menuModule.changeMenu('error'));
          } else {
            this.props.handleStart();
            this.props.history.push('/game');
          };
        } else {
          alert('file is empty');
        };
      } else if (selectNum == 4) {
        alert('unable to delete');
      } else if (selectNum == 5) {
        alert('unable to copy');
      } else if (selectNum == 6) {
        this.props.dispatch(menuModule.changeMenu('title'));
      }
    //select file
    } else if (this.props.menu.selectedMenu == 'select'){
      if (selectNum <= 3) {
        this.props.dispatch(gameModule.setFile(selectNum));
        if (this.props.saves[selectNum].status === 'empty') {
          this.props.handleStart();
        } else {
          this.props.handleLoad();
        }
        this.props.history.push('/game');
        this.props.dispatch(menuModule.changeMenu('title'));
      } else if (selectNum == 4) {
        this.props.dispatch(menuModule.changeMenu('delete'));
      } else if (selectNum == 5) {
        this.props.dispatch(menuModule.changeMenu('copy'));
      } else if (selectNum == 6) {
        this.props.dispatch(menuModule.changeMenu('title'));
      }
    //File Delete
    } else if (this.props.menu.selectedMenu == 'delete'){
      if (selectNum <= 3) {
        this.props.dispatch(savesModule.eraseGame(selectNum))
      } else if (selectNum == 4) {
        this.props.dispatch(menuModule.changeMenu('select'));
      } else if (selectNum == 5) {
        this.props.dispatch(menuModule.changeMenu('copy'));
      } else if (selectNum == 6) {
        this.props.dispatch(menuModule.changeMenu('title'));
      }
    //Select File To Copy
    } else if (this.props.menu.selectedMenu == 'copy'){
      if (selectNum <= 3) {
        this.props.dispatch(menuModule.setGameToCopy(selectNum));
        this.props.dispatch(menuModule.changeMenu('copySelected'));
      } else if (selectNum == 4) {
        this.props.dispatch(menuModule.changeMenu('delete'));
      } else if (selectNum == 5) {
        this.props.dispatch(menuModule.changeMenu('select'));
      } else if (selectNum == 6) {
        this.props.dispatch(menuModule.changeMenu('title'));
      }
    //Select file to copy to
    } else if (this.props.menu.selectedMenu == 'copySelected'){
      if (selectNum >= 3) {
        if (selectNum == this.props.menu.gameToCopy) {
          //can't copy to itself!
        } else {
          this.props.dispatch(savesModule.copyGame(this.props.saves[selectNum], this.props.menu.gameToCopy));
          this.props.dispatch(menuModule.setGameToCopy(null));
        }
      } else if (selectNum == 4) {
        this.props.dispatch(menuModule.setGameToCopy(null));
        this.props.dispatch(menuModule.changeMenu('delete'));
      } else if (selectNum == 5) {
        this.props.dispatch(menuModule.setGameToCopy(null));
        this.props.dispatch(menuModule.changeMenu('select'));
      } else if (selectNum == 6) {
        this.props.dispatch(menuModule.setGameToCopy(null));
        this.props.dispatch(menuModule.changeMenu('title'));
      }
    }
  };

  render() {
    if(this.props.menu.selectedMenu === 'title') {
      return (
        <div>
          <Title/>
        </div>
      );
    } else if (this.props.menu.selectedMenu === 'branchSelect') {
      return (
        <div>
          <BranchSelect menu={this.props.menu} game={this.props.game} player={this.props.player} saves={this.props.saves}/>
        </div>
      );
    } else if (this.props.menu.selectedMenu === 'error') {
      return (
        <div>
          <Error />
        </div>
      );
    } else {
      return (
        <div>
          <Select menu={this.props.menu} game={this.props.game} player={this.props.player} saves={this.props.saves}/>
        </div>
      );
    }
  }
};


TitleContainer.propTypes = {
  menu: PropTypes.object.isRequired,
  handleStart: PropTypes.func,
  handleLoad: PropTypes.func,
  sounds: PropTypes.object,
  player: PropTypes.object,
  game: PropTypes.object,
  saves: PropTypes.onject
};

function mapDispatchToProps(dispatch) {
  return {
    menuModule : bindActionCreators(menuModule, dispatch),
    soundsModule : bindActionCreators(soundsModule, dispatch),
    savesModule : bindActionCreators(savesModule, dispatch),
    gameModule : bindActionCreators(gameModule, dispatch)
  }
};

export default withRouter(connect(mapDispatchToProps)(TitleContainer));
