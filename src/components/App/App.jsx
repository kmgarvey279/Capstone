import React from "react";
import TitleContainer from "../TitleContainer/TitleContainer";
import End from "../End/End";
import Game from "../Game/Game";
import SFX from '../SFX/SFX';
import './App.css';
import Music from '../Music/Music';
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import {bindActionCreators} from 'redux';

//redux modules
import * as blocksModule from '../../redux/modules/blocks';
import * as doorsModule from '../../redux/modules/doors';
import * as enemiesModule from '../../redux/modules/enemies/enemies';
import * as gameModule from '../../redux/modules/game';
import * as roomModule from '../../redux/modules/rooms/room';
import * as playerModule from '../../redux/modules/player/player';
import * as switchesModule from '../../redux/modules/switches';
import * as platformsModule from '../../redux/modules/platforms';
import * as mapsModule from '../../redux/modules/map';
import * as flagsModule from '../../redux/modules/flags';
import * as textModule from '../../redux/modules/text/text';
import * as soundsModule from '../../redux/modules/sounds';
import * as savesModule from '../../redux/modules/save-data';
import * as bossModule from '../../redux/modules/boss/boss';
//resources
import * as playerConsts from '../../redux/modules/player/playerConstants';
import * as enemyConsts from '../../redux/modules/enemies/enemyConstants';
import roomConsts from '../../redux/modules/rooms/roomConstants';
import * as itemConsts from '../../redux/modules/rooms/itemConstants';
import * as textConsts from '../../redux/modules/text/textConstants';
import bossShot from '../../assets/images/items/boss-shot.gif';
import bossBeam from '../../assets/images/items/boss-beam.gif';
import cryostat from '../../assets/images/items/cryostatNS.gif';
import boss from '../../assets/images/enemies/boss1.gif';
//stateless functions
import * as helpers from './helperFunctions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popUp: null
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

//Handle Input
  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
    document.addEventListener('keyup', this.onKeyUp, false);
  }

  gameLoop(){
    let status = this.props.player.status;
    if (this.props.game.north == true && this.props.player.status == 'normal'){
      this.move("north", this.props.player.location);
    } else if (this.props.game.east == true && this.props.player.status == 'normal'){
      this.move("east", this.props.player.location);
    } else if (this.props.game.south == true && this.props.player.status == 'normal'){
      this.move("south", this.props.player.location);
    } else if (this.props.game.west == true && this.props.player.status == 'normal'){
      this.move("west", this.props.player.location);
    } else if (this.props.game.fire == true && this.props.player.status == 'normal'){
      this.attack();
    };
  }

  onKeyDown(event){
    //move up
    if(event.keyCode === 38){
      event.preventDefault();
      if(this.props.player.status =='normal' && this.props.game.gameState === 'active'){
        this.props.dispatch(gameModule.toggleNorth(true));
      };
      //move down
    } else if(event.keyCode === 40){
      event.preventDefault();
      if(this.props.player.status =='normal' && this.props.game.gameState === 'active'){
        this.props.dispatch(gameModule.toggleSouth(true));
      };
      //move right
    } else if (event.keyCode === 39){
      event.preventDefault();
      if(this.props.player.status =='normal' && this.props.game.gameState === 'active'){
        this.props.dispatch(gameModule.toggleEast(true));
      };
      //move left
    } else if (event.keyCode === 37){
      event.preventDefault();
      if(this.props.player.status =='normal' && this.props.game.gameState === 'active'){
        this.props.dispatch(gameModule.toggleWest(true));
      };
    } else if (event.keyCode === 32){
      event.preventDefault();
      if(this.props.game.gameState == 'dialogue') {
        //advance text
        this.advanceLine();
      } else if (this.props.game.gameState == 'active' && this.props.player.status =='normal') {
        //check environment or attack
        let contentArr =  this.props.currentRoom[this.props.player.location].content;
        let interactArr = contentArr.find(function(content) {
          return content[0] == 'interact';
        });
        if (interactArr !== undefined) {
          this.triggerDialogue('interact', interactArr[1]);
        } else if (this.props.game.bulletCount < 4 && this.props.player.currentWeapon !== null) {
          this.props.dispatch(gameModule.toggleFire(true));
        } else if (this.props.game.gameState == 'itemGet') {
          this.closeItemGet();
        };
      };
    //change selected weapon
    } else if (event.keyCode === 16 && this.props.game.gameState == 'active' && this.props.player.weapons.length > 1) {
        let newWeaponId;
        if (this.props.player.currentWeapon < this.props.player.weapons.length) {
          newWeaponId = this.props.player.currentWeapon + 1;
        } else {
          newWeaponId = 1;
        };
        this.props.dispatch(playerModule.changeCurrentWeapon(newWeaponId));
      //dash
    } else if (event.keyCode === 17 && this.props.game.gameState == 'active' && this.props.player.status =='normal') {
        this.dash();
      //pause/unpause
    } else if (event.keyCode === 13) {
      if (this.props.game.gameState == 'active' || this.props.game.gameState == 'paused') {
        this.pauseGame();
      } else if (this.props.game.gameState == 'dialogue') {
        this.endDialogue();
      } else if (this.props.game.gameState == 'itemGet') {
        this.closeItemGet();
      };
    };
  }

  onKeyUp(event){
    if (event.keyCode == 37) {
      this.props.dispatch(gameModule.toggleWest(false));
    };
    if (event.keyCode == 39) {
      this.props.dispatch(gameModule.toggleEast(false));
    };
    if (event.keyCode == 38) {
      this.props.dispatch(gameModule.toggleNorth(false));
    };
    if (event.keyCode == 40) {
      this.props.dispatch(gameModule.toggleSouth(false));
    };
    if (event.keyCode === 32) {
      this.props.dispatch(gameModule.toggleFire(false));
    };
  }

  loadGame(){
    //load (playerless) room
    if (this.props.game.gameState == 'postExitBranch') {
      this.fadeOut();
    } else {
      //load saved state
      let saveData = this.props.saves[this.props.game.file];
      this.props.dispatch(gameModule.loadGame(saveData.game));
      this.props.dispatch(playerModule.loadPlayer(saveData.player));
      this.props.dispatch(flagsModule.loadFlags(saveData.flags));
      this.props.dispatch(mapsModule.loadMaps(saveData.maps));
      this.props.dispatch(doorsModule.loadDoors(saveData.doors));
      this.startGame();
    };
  }

  startGame(){
    //start game
    if(this.props.game.gameState == 'postExitBranch' || this.props.game.branch === 2) {
      this.generateSpecialRoom();
    } else {
      this.generateRoomFromTemplate();
      this.generateMapFromTemplate();
    };
    if(this.props.game.gameState == 'postSpecialRoom') {
      let location = this.props.player.location;
      this.props.dispatch(roomModule.updateSprite(location, playerConsts.sprites.particle.south));
      let playerAppearOne = setTimeout(() => {
        this.props.dispatch(soundsModule.changeEffect('warp'));
        this.props.dispatch(roomModule.updateSprite(location, playerConsts.sprites.dash.north));},
        1000
      );
      let playerAppearTwo = setTimeout(() =>
        {this.props.dispatch(roomModule.updateSprite(location, playerConsts.sprites.stand.north));
        this.handleChangeGameState('active');},
        2000
      );
    } else {
      this.handleChangeGameState('active');
    };
    if(this.props.game.roomId === 1) {
        setTimeout(() => 
        this.triggerPopUp(1), 
        3000
      );
    };
    setInterval(() =>
      this.gameLoop(),
    100
    );
  }

  //pop ups
  triggerPopUp(number){
    this.setState({
      popUp: number
    });
    setTimeout(() => 
      this.clearPopUp(), 
      2000
    );
  }

  clearPopUp() {
    this.setState({
      popUp: null
    });
  }

  pauseGame(){
    if (this.props.game.gameState == 'active') {
      this.handleChangeGameState('paused');
    } else if (this.props.game.gameState == 'paused') {
      this.handleChangeGameState('active');
    };
  }

  handleChangeGameState(newGameState){
    this.props.dispatch(gameModule.changeGameState(newGameState));
  }

//create map
  generateMapFromTemplate(){
    let mapsTemplate = roomConsts.maps[1];
    for(let i = 0; i < mapsTemplate.length; i++){
      this.props.dispatch(mapsModule.addMapSquare(i, mapsTemplate[i]));
    };
  }

//Create Rooms
  generateRoomFromTemplate(){
    let roomTemplate = roomConsts.rooms[this.props.game.branch][this.props.game.roomId];
    for(let i = 0; i < roomTemplate.length; i++){
      this.handleAddingSquareToRoom(i+1, roomTemplate[i]);
    };
    this.setAlerts();
    let roomTransitionTimer = setTimeout(() =>
    {this.handleChangeGameState("active");
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));},
      600
    );
    if(this.props.game.roomId == 4) {
      this.props.dispatch(soundsModule.changeMusic('machine'));
    };
    if(this.props.game.roomId == 4 && this.props.player.items.includes('keyCard2')) {
      this.props.dispatch(roomModule.updateSprite(133, roomConsts.sprites['theMachineOn']));
      this.props.dispatch(roomModule.updateValue(108, '%', roomConsts.sprites['warp']));
    };
    if(this.props.game.roomId === 7 && this.props.game.branch === 3){
      this.createBoss();
    };
  }

  generateSpecialRoom(){
    let roomTemplate = roomConsts.rooms['special'][1];
    for(let i = 0; i < roomTemplate.length; i++){
      this.handleAddingSquareToSpecialRoom(i+1, roomTemplate[i]);
    };
    this.setAlerts();
    let roomTransitionTimer = setTimeout(() =>
    {this.handleChangeGameState("active");
    this.props.dispatch(soundsModule.changeMusic('array'));
    this.props.dispatch(soundsModule.changeEffect('phone'));
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));},
      600
    );
  }

  handleAddingSquareToSpecialRoom(thisSquareId, squareArr) {
    let squareValue = squareArr[0];
    let squareImage;
    let content = [];
    let sprite = '';
    let transition = '';
    let alert = false;
    //set initial player location
    if (squareValue == '1') {
      this.props.dispatch(gameModule.setRespawnPoint(thisSquareId));
      sprite = playerConsts.sprites.stand['south'];
      content.push(['player']);
      this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
      squareImage = roomConsts.sprites['white'];
    } else if (squareValue === '2') {
      sprite = playerConsts.sprites.stand['southGray']
      squareImage = roomConsts.sprites['white'];
    } else if (squareValue == 'T'){
      sprite = roomConsts.sprites['phone'];
      content.push(['interact', 'phone1']);
      squareImage = roomConsts.sprites['white'];
    } else if (squareValue === '0') {
      squareImage = roomConsts.sprites['white'];
    };
    this.props.dispatch(roomModule.addSquare(thisSquareId, squareValue, content, squareImage, sprite, transition, alert));
  }

  setAlerts(){
    let squareArr = Object.values(this.props.currentRoom);
    let filteredSquareArrT = squareArr.filter(function(square) {
      return square.value == 'T';
    });
    filteredSquareArrT.forEach(square => {
      let text = square.content.find(function(content) {
        return content[0] == 'interact';
      });
      if (text !== undefined) {
        let contentArr = this.props.currentRoom[square.squareId + 1].content;
        contentArr.push(text);
        this.props.dispatch(roomModule.updateContent(square.squareId + 1, contentArr));
        this.props.dispatch(roomModule.toggleAlert(square.squareId + 1, true));
      };
    });
    let filteredSquareArrD = squareArr.filter(function(square) {
      return square.value == 'D';
    });
    filteredSquareArrD.forEach(square => {
      let doorArr = square.content.find(function(content) {
        return content[0] == 'door';
      });
      let door = this.props.doors[doorArr[1]];
      if (door.direction == 'north') {
        let contentArr = this.props.currentRoom[square.squareId + 1].content;
        contentArr.push(['doorTrigger', door.doorId]);
        this.props.dispatch(roomModule.updateContent(square.squareId + 1, contentArr));
      } else if (door.direction == 'east') {
        let contentArr = this.props.currentRoom[square.squareId - 13].content;
        contentArr.push(['doorTrigger', door.doorId]);
        this.props.dispatch(roomModule.updateContent(square.squareId - 13, contentArr));
      } else if (door.direction == 'south') {
        let contentArr = this.props.currentRoom[square.squareId - 1].content;
        contentArr.push(['doorTrigger', door.doorId]);
        this.props.dispatch(roomModule.updateContent(square.squareId - 1, contentArr));
      } else if (door.direction == 'west') {
        let contentArr = this.props.currentRoom[square.squareId + 13].content;
        contentArr.push(['doorTrigger', door.doorId]);
        this.props.dispatch(roomModule.updateContent(square.squareId + 13, contentArr));
      };
    });
  }

  nullAll() {
    this.props.dispatch(roomModule.nullRoom());
    for(let i = 0; i < this.props.game.enemyTimers.length; i++) {
      clearInterval(this.props.game.enemyTimers[i]);
    };
    this.props.dispatch(gameModule.clearTimers());
    this.props.dispatch(enemiesModule.nullAllEnemies());
    this.props.dispatch(blocksModule.nullAllBlock());
    this.props.dispatch(switchesModule.nullAllSwitches());
    this.props.dispatch(platformsModule.nullAllPlatforms());
  }

  handleAddingSquareToRoom(thisSquareId, squareArr) {
    let squareValue = squareArr[0];
    let squareImage;
    let content = [];
    let sprite = '';
    let transition = '';
    let alert = false;
    let tileStyle;
    //set initial player location
    if (squareValue == '1') {
      this.props.dispatch(gameModule.setRespawnPoint(thisSquareId));
      sprite = playerConsts.sprites.stand['south'];
      content.push(['player']);
      this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
      squareImage = roomConsts.sprites['tile'];
      this.props.dispatch(soundsModule.changeMusic('intro'));
    //create door
    } else if (squareValue == 'D') {
      content.push(['door', squareArr[1]]);
      let status = 'closed';
      //check if it's the door the player entered from, if so add player and set respawn point
      if (squareArr[2] == this.props.game.previousRoomId && this.props.game.gameState !== 'postExitBranch') {
        let difference = helpers.getDifference(helpers.reverseDirection(squareArr[4]));
        this.props.dispatch(gameModule.setRespawnPoint(thisSquareId + difference));
        sprite = playerConsts.sprites.stand[helpers.reverseDirection(squareArr[4])];
        content.push(['player']);
        this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
        status = 'open';
      };
      //check if door exists in state, if not, create it
      if (!this.props.doors.hasOwnProperty(squareArr[1])) {
        //id, location, leadsTo, locked/open, direction
        this.props.dispatch(doorsModule.createDoor(squareArr[1], thisSquareId, squareArr[2], status, squareArr[3], squareArr[4]));
      };
      if (this.props.game.branch == 3) {
        squareImage = roomConsts.sprites['spookyTile'];
      } else {
        squareImage = roomConsts.sprites['tile'];
      };
    //create lava
    } else if (squareValue == 'L') {
      squareImage = roomConsts.sprites['lava'];
    //create eyeball
    } else if (squareValue == 'i') {
      this.props.dispatch(gameModule.setEye('alive'));
    //create pit
    } else if (squareValue == 'P') {
      if (this.props.currentRoom[thisSquareId - 1].value !== 'P' && this.props.currentRoom[thisSquareId - 1].value !== 'V'){
        squareImage = roomConsts.sprites['pit'];
      } else {
        squareImage = '';
      };
    //create boss
    } else if (squareValue === 'boss') {
      if(squareArr[1] === 'sprite') {
        sprite = <img src={boss} width="250" height="220"/>
      };
      squareImage = roomConsts.sprites['spookyTile'];
    //create wall
    } else if (squareValue == 'W') {
      if (this.props.game.branch == 3) {
        squareImage = roomConsts.sprites[squareArr[1] + 'Spooky'];
      } else {
        squareImage = roomConsts.sprites[squareArr[1]];
      };
    //create item tile
    } else if (squareValue == '$') {
      if (this.props.player.items.includes(squareArr[2])) {
        squareValue = '0';
      } else {
        content.push([squareArr[1], squareArr[2]]);
      };
      if (this.props.game.branch == 3) {
        squareImage = roomConsts.sprites['spookyTile'];
      } else {
        squareImage = roomConsts.sprites['tile'];
      };
      //create ice tile
    } else if (squareValue == 'I') {
      squareImage = roomConsts.sprites['ice'];
    //create conveyer belt
    } else if (squareValue == 'C') {
      if (squareArr[1] == 'north') {
        squareImage = roomConsts.sprites['beltNorth'];
      } else if (squareArr[1] == 'east') {
        squareImage = roomConsts.sprites['beltEast'];
      } else if (squareArr[1] == 'south') {
        squareImage = roomConsts.sprites['beltSouth'];
      } else {
        squareImage = roomConsts.sprites['beltWest'];
      };
      content.push(['belt', squareArr[1]]);
    //create moving tile
    } else if (squareValue == 'M' || squareValue == 'MB') {
      let contentId = squareArr[1];
      content.push(['platform', contentId]);
      let direction = squareArr[2];
      if (direction == 'north' || direction == 'south'){
        squareImage = squareImage = roomConsts.sprites['platformOffNS'];
      } else {
        squareImage = roomConsts.sprites['platformOffEW'];
      };
      this.props.dispatch(platformsModule.createPlatform(contentId, thisSquareId, thisSquareId, direction, false));
    //create switch
    } else if (squareValue == 'S') {
      let contentId = v4();
      let effectId = squareArr[1];
      let effectType;
      if (squareArr[2] == 'd') {
        effectType = 'door';
      } else if (squareArr[2] == 'e') {
        effectType = 'event';
      } else {
        effectType = 'platform';
      };
      let timer = squareArr[3];
      let switchType;
      if (squareArr[4] == 'p') {
        switchType = 'pressure';
      } else {
        switchType = 'elecSwitch';
      };
      if (switchType == 'pressure') {
        squareImage = roomConsts.sprites['switchOff'];
        content.push(['switch', contentId]);
      } else {
        squareImage = roomConsts.sprites['tile'];
        sprite = roomConsts.sprites['elecSwitchOff'];
        content.push(['elecSwitch', contentId]);
      };
      this.props.dispatch(switchesModule.createSwitch(contentId, thisSquareId, false, effectId, effectType, timer, switchType));
    } else if (squareValue == 'T'){
      //square contains text
      let type = squareArr[1];
      if (type == 'terminal') {
        //create terminal
        squareImage = roomConsts.sprites[type];
        content.push(['interact', squareArr[2]]);
      } else if (type == 'machineRight' || type == 'machineLeft') {
        squareImage = roomConsts.sprites[type];
        content.push(['interact', type]);
      } else if (type !== 'extend') {
        //create examinable object
        squareImage = roomConsts.sprites['tile'];
        sprite = roomConsts.sprites[type];
        content.push(['interact', type]);
      }
    //void square
    } else if (squareValue == 'V') {
      squareImage = '';
    //create warp square
    } else if (squareValue == '@') {
      if (squareArr[1] == 0) {
        sprite = roomConsts.sprites["lightningRight"];
      }
      squareImage = roomConsts.sprites[squareArr[2]];
      content.push(['warp', squareArr[1]]);
    //create exit portal
    } else if (squareValue == '%off') {
      squareImage = roomConsts.sprites['warp'];
      if(this.props.game.gameState == 'postExitBranch') {
        content.push(['player']);
        this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
      }
    } else {
      let rng = Math.floor(Math.random() * 2);
      if (this.props.game.branch == 3) {
        squareImage = roomConsts.sprites['spookyTile'];
      } else {
        if (rng > 0) {
          squareImage = roomConsts.sprites['tile'];
        } else {
          squareImage = roomConsts.sprites['tile2'];
        };
      }
    }
    //spawn enemy
    if (squareValue == 'E') {
      let newEnemyId = this.handleCreateNewEnemy(thisSquareId, squareArr[1]);
      sprite = this.props.enemies[newEnemyId].sprites.move['south'];
      content.push(['enemy', newEnemyId]);
    }
    //spawn block
    if (squareValue == 'B' || squareValue == 'MB') {
      sprite = roomConsts.sprites['block'];
      let contentId = v4();
      content.push(['block', contentId]);
      this.props.dispatch(blocksModule.createBlock(contentId, thisSquareId));
    }
    if (squareValue == 'F') {
      sprite = roomConsts.sprites['iceChunk'];
    }
    this.props.dispatch(roomModule.addSquare(thisSquareId, squareValue, content, squareImage, sprite, transition, alert));
  }

//Handle Movement
  move(direction, originalLocation){
    //prevent moving in opposite direction as belt
    let beltArr = this.props.currentRoom[originalLocation].content.find(function(content) {
      return content[0] == 'belt';
    });
    if (beltArr !== undefined && beltArr[1] == helpers.reverseDirection(direction)) {
      this.props.dispatch(playerModule.updatePlayerStatus('normal'));
    } else if (this.exitCheck(direction, originalLocation) !== 'exit') {
      this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
      this.props.dispatch(playerModule.updatePlayerDirection(direction));
      this.props.dispatch(roomModule.updateSprite(originalLocation, playerConsts.sprites.stand[direction]));
      //check if move is legal, if not return original location
      let canMove = this.attemptMove(direction, originalLocation);
      //if move is legal and didn't cause any secondary effects...
      if (canMove !== originalLocation) {
        //check for effects of landing on new square
        let squareCheck = this.playerSquareCheck(canMove, direction);
        if (squareCheck == 'moved' || squareCheck == 'slide'){
          this.handleUpdatePlayerLocation(originalLocation, canMove);
          this.handleUpdateSprite(originalLocation, '', '');
          if (squareCheck == 'moved'){
            this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.walk[direction + '2'], direction + "Enter");
          } else {
            this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand[this.props.player.direction], this.props.player.direction + "Enter");
          };
          let spriteExitTimer = setTimeout(() =>
            {this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand[this.props.player.direction], '');
            if(squareCheck == 'slide') {
              this.move(this.props.player.direction, canMove);
              this.props.dispatch(playerModule.updatePlayerStatus('sliding'));
            } else {
              this.props.dispatch(playerModule.updatePlayerStatus('normal'));
            }},
            100
          );
        } else if (squareCheck == 'stopped') {
          this.props.dispatch(playerModule.updatePlayerStatus('normal'));
        }
      } else {
        this.props.dispatch(playerModule.updatePlayerStatus('normal'));
      }
    }
  }

  exitCheck(direction, location){
    if (this.props.currentRoom[location].value == 'D'){
      let content = this.props.currentRoom[location].content.find(function(content) {
        return content[0] == 'door';
      });
      let door = this.props.doors[content[1]];
      if (direction == door.direction && door.leadsTo !== 0) {
        this.changeRoom(door);
        return 'exit';
      }
    }
  };

  dash() {
    this.props.dispatch(playerModule.updatePlayerStatus('dash'));
    this.props.dispatch(soundsModule.changeEffect('teleport'));
    let direction = this.props.player.direction;
    let squareCheck;
    for (let i = 0; i < 3; i++) {
      //check if player can be knocked back in this direction
      let originalLocation = this.props.player.location;
      let canMove = this.attemptMove(direction, originalLocation);
      let last;
      let next;
      squareCheck = this.playerSquareCheck(canMove, direction);
      if (squareCheck == 'slide') {
        this.move(direction, originalLocation);
        break;
      } else if (squareCheck == 'fall') {
        this.handleUpdateSprite(canMove, playerConsts.sprites.dash[direction], direction + 'Enter');
      } else if (canMove !== originalLocation && squareCheck == 'moved') {
        //check for effects of landing on new square
        if (this.props.currentRoom[canMove].content == 'enemy') {
          let enemyId = this.props.currentRoom[canMove].contentId;
          this.handleEnemyDamage('dash', direction, this.props.currentRoom[canMove].contentId);
        } else {
          //update player and new square
          this.handleUpdatePlayerLocation(originalLocation, canMove);
          this.handleUpdateSprite(canMove, playerConsts.sprites.dash[direction], direction + 'Enter');
          next = this.attemptMove(direction, canMove);
          let afterImageTimer = setTimeout(() =>
            this.handleUpdateSprite(originalLocation, playerConsts.sprites.particle[direction], ''),
            200
          );
          last = originalLocation;
          let afterAfterImageTimer = setTimeout(() =>
            this.handleUpdateSprite(last, '', ''),
            800
          );
        }
      } else if (squareCheck !== 'knockback') {
        //if player can't move, just trigger animation in current square
        this.props.dispatch(roomModule.updateSprite(originalLocation, playerConsts.sprites.dash[direction]));
        break;
      }
    }
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));
    let spriteClearTimer = setTimeout(() =>
    {if (squareCheck !== 'fall') {
      this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand[direction], '')
    }},
      400
    );
  };

  attack() {
    this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
    let newSprite = playerConsts.sprites.attack[this.props.player.direction];
    this.props.dispatch(roomModule.updateSprite(this.props.player.location, newSprite));
    let direction = this.props.player.direction;
    let playerLocation = this.props.player.location;
    let name = this.props.player.currentWeapon;
    let range = itemConsts.weapons[this.props.player.currentWeapon].range;
    let startPoint = this.attemptMove(direction, playerLocation);
    let hasEnemy = this.props.currentRoom[startPoint].content.find(function(content) {
      return content[0] == 'enemy';
    });
    let hasElecSwitch = this.props.currentRoom[startPoint].content.find(function(content) {
      return content[0] == 'elecSwitch';
    });
    if (startPoint !== playerLocation) {
      if (hasEnemy !== undefined) {
        this.handleEnemyDamage(name, direction, hasEnemy[1]);
      } else if (name == 'Taser' && hasElecSwitch !== undefined) {
        this.handleSwitch(hasElecSwitch[1]);
      } else {
        this.props.dispatch(gameModule.updateBulletCount(this.props.game.bulletCount + 1));
        let newSprite;
        if (name == 'Taser') {
          this.props.dispatch(soundsModule.changeEffect(''));
          this.props.dispatch(soundsModule.changeEffect('taser'));
          newSprite = itemConsts.weapons[this.props.player.currentWeapon].sprites['projectile'];
        } else {
          this.props.dispatch(soundsModule.changeEffect('cryo'));
          if (direction == 'north' || direction == 'south') {
            newSprite = itemConsts.weapons[this.props.player.currentWeapon].sprites['projectileNS'];
          } else {
            newSprite = itemConsts.weapons[this.props.player.currentWeapon].sprites['projectileEW'];
          };
        };
        this.props.dispatch(roomModule.updateSprite(startPoint, newSprite));
        let projectileTimer = setTimeout(() =>
          this.handleProjectile(name, direction, startPoint, range, newSprite),
          100
        );
      };
    };
    let coolDownTimer = setTimeout(() =>
      this.props.dispatch(playerModule.updatePlayerStatus('normal')),
      500
    );
  }

  knockBack(knockBackDirection) {
    this.props.dispatch(playerModule.updatePlayerStatus('knockback'));
    this.props.dispatch(soundsModule.changeEffect('hit'));
    let direction = this.props.player.direction;
    let newHealth = this.props.player.health -= 10;
    this.props.dispatch(playerModule.updatePlayerHealth(newHealth));
    this.playerHealthCheck();
    if (this.props.player.health > 0) {
      let originalLocation = this.props.player.location;
      //check if player can be knocked back in this direction
      let canMove = this.attemptMove(knockBackDirection, originalLocation);
      if (canMove == originalLocation) {
        let reverse = helpers.reverseDirection(knockBackDirection)
        let canMoveReverse = this.attemptMove(reverse, originalLocation + helpers.getDifference(reverse));
        //search for valid alternative knockback direction
        if (knockBackDirection == 'north' || knockBackDirection == 'south') {
          let canMoveEast = this.attemptMove('east', originalLocation);
          let canMoveWest = this.attemptMove('west', originalLocation);
          if (canMoveEast !== originalLocation) {
            canMove = canMoveEast;
          } else if (canMoveWest !== originalLocation) {
            canMove = canMoveWest;
          } else if (canMoveReverse !== originalLocation) {
            canMove = canMoveReverse;
          };
        } else if (knockBackDirection == 'east' || knockBackDirection == 'west') {
          let canMoveNorth = this.attemptMove('north', originalLocation);
          let canMoveSouth = this.attemptMove('south', originalLocation);
          if (canMoveNorth !== originalLocation) {
            canMove = canMoveNorth;
          } else if (canMoveSouth !== originalLocation) {
            canMove = canMoveSouth;
          } else if (canMoveReverse !== originalLocation) {
            canMove = canMoveReverse;
          };
        };
      }
      //recheck if player can move
      if (canMove !== originalLocation) {
        let squareCheck = this.playerSquareCheck(canMove, direction);
        if (squareCheck === 'moved' || squareCheck === 'slide'){
          this.handleUpdatePlayerLocation(originalLocation, canMove);
          this.handleUpdateSprite(originalLocation, '', '');
          this.handleUpdateSprite(canMove, playerConsts.sprites.knockback[direction], knockBackDirection + 'Enter');
            let spriteExitTimer = setTimeout(() =>
              {this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand[direction], '');
              if(squareCheck == 'slide') {
                this.move(direction);
                this.props.dispatch(playerModule.updatePlayerStatus('sliding'));
              } else {
                this.props.dispatch(playerModule.updatePlayerStatus('normal'));
              }},
              400
            );
          } else if (squareCheck !== 'fall') {
            //if player can't move back, just trigger animation in current square
            this.props.dispatch(roomModule.updateSprite(this.props.player.location, playerConsts.sprites.knockback[direction]));
          }
        }
      }
    }

  handleUpdatePlayerLocation(originalLocation, newLocation) {
    let previousContentArr =  this.props.currentRoom[originalLocation].content;
    let filteredContentArr = previousContentArr.filter(function(content) {
      return content[0] !== 'player';
    });
    this.props.dispatch(roomModule.updateContent(originalLocation, filteredContentArr));
    let newContentArr = this.props.currentRoom[newLocation].content;
    newContentArr.push(["player"]);
    this.props.dispatch(roomModule.updateContent(newLocation, newContentArr));
    this.props.dispatch(playerModule.updatePlayerLocation(newLocation));
    //check to trigger close door animation
    let trigger = previousContentArr.find(function(content) {
      return content[0] == 'doorTrigger';
    });
    let door = newContentArr.find(function(content) {
      return content[0] == 'door';
    });
    //if new spot isn't a door, but previous was a trigger, close door
    if (trigger !== undefined && door == undefined){
      if (this.props.doors[trigger[1]].isLocked == false) {
        this.closeDoor(trigger[1]);
      };
      //trigger first event flag
      if (this.props.flags[1].triggered == false) {
        let eventTimer = setTimeout(() =>
          this.triggerEvent(1, 'A'),
          800
        );
      };
    }
    //check if player was standing on a switch
    let hasSwitch = previousContentArr.find(function(content) {
      return content[0] == 'switch';
    });
    if (hasSwitch !== undefined) {
      this.startSwitchCountdown(hasSwitch[1]);
    };
  }

  handleUpdateSprite(location, sprite, direction) {
    this.props.dispatch(roomModule.updateSprite(location, sprite));
    this.props.dispatch(roomModule.updateTransition(location, direction));
  }
  
  warp(warpedItem1, currentLocation, newLocation) {
    this.props.dispatch(soundsModule.changeEffect('warpPad'));
    let warpSprite1;
    let postWarpSprite1;
    //set new object entering warp
    if (warpedItem1 == 'player') {
      let direction = this.props.player.direction;
      //prevent player movement during animation
      this.props.dispatch(playerModule.updatePlayerStatus('warp'));
      warpSprite1 = playerConsts.sprites.dash[direction];
      postWarpSprite1 = playerConsts.sprites.stand[direction];
    } else {
      warpSprite1 = roomConsts.sprites['blockWarp'];
      postWarpSprite1 = roomConsts.sprites['block'];
    };
    //set object on other side of warp
    let warpSprite2;
    let postWarpSprite2;
    let warpedItem2 = this.props.currentRoom[newLocation].content.find(function(content) {
      return content[0] !== "warp";
    });
    if (warpedItem2 !== undefined) {
      if(warpedItem2 == 'player') {
        let direction = this.props.player.direction;
        //prevent player movement during animation
        this.props.dispatch(playerModule.updatePlayerStatus('warp'));
        warpSprite2 = playerConsts.sprites.dash[direction];
        postWarpSprite2 = playerConsts.sprites.stand[direction];
      } else {
        warpSprite2 = roomConsts.sprites['blockWarp'];
        postWarpSprite2 = roomConsts.sprites['block'];
      };
    };
    //switch to warp sprite(s)
    this.handleUpdateSprite(currentLocation, warpSprite1, '');
    if (warpSprite2 !== undefined) {
      this.handleUpdateSprite(newLocation, warpSprite2, '');
    } else {
      //add another warp sprite to new location (if empty)
      let seeingDoubleTimer = setTimeout(() =>
        this.handleUpdateSprite(newLocation, warpSprite1, ''),
      300
      );
    };
    //clear sprite from old location, change sprite in current location to normal
    let spriteClearTimer = setTimeout(() =>
      {this.handleUpdateSprite(currentLocation, '', '');
      this.handleUpdateSprite(newLocation, postWarpSprite1, '');
      if (warpedItem1 == 'player') {
        //switch player location
        this.handleUpdatePlayerLocation(currentLocation, newLocation);
        this.props.dispatch(playerModule.updatePlayerStatus('normal'));
      } else {
        //clear block from previous location 
        let oldContent = this.props.currentRoom[currentLocation].content;
        let filteredOldContent = oldContent.filter(function(content) {
          return content[1] !== warpedItem1;
        });
        this.props.dispatch(roomModule.updateContent(currentLocation, filteredOldContent));
        //add block to new location
        let newContent = this.props.currentRoom[newLocation].content;
        newContent.push(["block", warpedItem1]);
        this.props.dispatch(roomModule.updateContent(newLocation, newContent));
        this.props.dispatch(blocksModule.updateBlockLocation(warpedItem1, newLocation));
      };
      //if there is another item on connected warp
      if (postWarpSprite2 !== undefined) {
        this.handleUpdateSprite(currentLocation, postWarpSprite2, '');
        if (warpedItem2[0] == 'player') {
          this.handleUpdatePlayerLocation(newLocation, currentLocation);
          this.props.dispatch(playerModule.updatePlayerStatus('normal'));
        } else {
          //clear block from previous location 
          let oldContent = this.props.currentRoom[newLocation].content;
          let filteredOldContent = oldContent.filter(function(content) {
            return content[1] !== warpedItem2[1];
          });
          this.props.dispatch(roomModule.updateContent(newLocation, filteredOldContent));
          //add block to new location
          let newContent = this.props.currentRoom[currentLocation].content;
          this.props.dispatch(roomModule.updateContent(currentLocation, filteredOldContent));
          newContent.push(["block", warpedItem2]);
          this.props.dispatch(roomModule.updateContent(currentLocation, newContent));
          this.props.dispatch(blocksModule.updateBlockLocation(warpedItem2, currentLocation));
          };
      }},
      600
    );
  }

  fall(pitLocation, direction) {
    this.props.dispatch(playerModule.updatePlayerStatus('falling'));
    let playerLocation = this.props.player.location;
    //take damage
    let newHealth = this.props.player.health -= 10;
    this.props.dispatch(playerModule.updatePlayerHealth(newHealth));
    this.playerHealthCheck();
    if (this.props.player.health > 0) {
      //clear player from previous square
      let previousContentArr =  this.props.currentRoom[playerLocation].content;
      let filteredContentArr = previousContentArr.filter(function(content) {
        return content[0] !== 'player';
      });
      this.props.dispatch(roomModule.updateContent(playerLocation, filteredContentArr));
      this.handleUpdateSprite(playerLocation, '', '');
      //fall animation
      this.handleUpdateSprite(pitLocation, playerConsts.sprites.fall, 'fall');
      //clear pit and restart player on respawn point
      let spriteClearTimer = setTimeout(() =>
        {this.handleUpdateSprite(pitLocation, '', '');
        this.respawn();
        this.props.dispatch(playerModule.updatePlayerStatus('normal'));},
        600
      );
    };
  }

  respawn(){
    let respawnPoint = this.props.game.respawnPoint;
    this.props.dispatch(roomModule.updateSprite(respawnPoint, playerConsts.sprites.stand['south']));
    this.props.dispatch(playerModule.updatePlayerLocation(respawnPoint));
    this.playerSquareCheck(respawnPoint);
    let contentArr = this.props.currentRoom[respawnPoint].content;
    contentArr.push(['player']);
    this.props.dispatch(roomModule.updateContent(respawnPoint, contentArr));
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));
  }

  playerHealthCheck(){
    if (this.props.player.health <= 0) {
      this.props.dispatch(soundsModule.changeEffect('dead'));
      this.handleChangeGameState('gameOver');
      this.nullAll();
    };
  }

  //Handle Projectiles
  handleProjectile(name, direction, location, range, sprite) {
    if (this.props.game.gameState === 'active') {
      if (name == 'Cryostat') {
        this.laserLoop(name, direction, location, range, sprite);
      } else {
        this.projectileLoop(0, name, direction, location, range, sprite);
      };
    };
  }

  projectileMove(direction, originalLocation) {
    //get difference between two spaces
    let difference = helpers.getDifference(direction);
    //and new square id #
    let newLocation = originalLocation + difference;
    //check for pushable block
    let content = this.props.currentRoom[newLocation].content;
    let hasBlock = content.find(function(content) {
      return content[0] == 'block';
    });
    if (hasBlock == undefined
    && this.props.currentRoom[newLocation].value !== 'W'
    && this.props.currentRoom[newLocation].value !== 'T') {
      return newLocation;
    } else {
      return originalLocation;
    };
  }

  projectileLoop(i, name, direction, location, range, sprite) {
      let that = this;
      let canMove = this.projectileMove(direction, location);
      let enemyId;
      this.props.currentRoom[canMove].content.forEach(function(content) {
        if (content.includes('enemy')){
          enemyId = content[1];
        };
      });
      let hasElecSwitch = this.props.currentRoom[canMove].content.find(function(content) {
        return content[0] == 'elecSwitch';
      });
      //void projectile if it can't progress
      if (location === canMove) {
        this.handleUpdateSprite(location, '', '');
        this.props.dispatch(gameModule.updateBulletCount(this.props.game.bulletCount - 1));
        //damage enemy and void projectile if it hits
      } else if (enemyId !== undefined) {
        this.handleEnemyDamage(name, direction, enemyId);
        this.handleUpdateSprite(location, '', '');
        //check for elec switch
      } else if (name == 'Taser' && hasElecSwitch !== undefined) {
        this.handleSwitch(hasElecSwitch[1]);
        this.handleUpdateSprite(location, '', '');
        this.props.dispatch(gameModule.updateBulletCount(this.props.game.bulletCount - 1));
        //destroy eyeball
      } else if (this.props.currentRoom[canMove].value == 'i') {
        this.props.dispatch(gameModule.setEye('hurt'));
        let setExplosionTimer = setTimeout(() =>
          this.props.dispatch(gameModule.setEye('none')),
          500
        );
        this.handleUpdateSprite(location, '', '');
        this.props.dispatch(gameModule.updateBulletCount(this.props.game.bulletCount - 1));
      } else {
        //update sprites
        this.handleUpdateSprite(location, '', '');
        this.handleUpdateSprite(canMove, sprite, direction + 'Enter');
        location = canMove;
        setTimeout(function() {
          i++;
          if (i < range) {
            that.projectileLoop(i, name, direction, location, range, sprite);
          } else {
            that.props.dispatch(gameModule.updateBulletCount(that.props.game.bulletCount - 1));
          }
        }, 200);
      };
      let projectileTimer = setTimeout(() =>
        this.handleUpdateSprite(location, '', ''),
        200
      );
    }

  laserLoop(name, direction, location, range, sprite) {
    let originalLocation = location;
    let next;
    this.handleUpdateSprite(originalLocation, sprite, '');
    for (let i = 0; i < range; i++) {
      //check if player can be knocked back in this direction
      let canMove = this.projectileMove(direction, originalLocation);
      let enemyId;
      this.props.currentRoom[canMove].content.forEach(function(content) {
        if (content.includes('enemy')){
          enemyId = content[1];
        }
      });
      let last;
      next = this.attemptMove(direction, canMove);
      if (canMove !== originalLocation) {
        //check for effects of landing on new square
        if (enemyId !== undefined) {
          this.handleEnemyDamage(name, direction, enemyId);
          this.props.dispatch(gameModule.updateBulletCount(this.props.game.bulletCount - 1));
          this.handleUpdateSprite(location, '', '');
        } else {
          //update new square
          this.handleUpdateSprite(canMove, sprite, direction);
          last = originalLocation;
          originalLocation = canMove;
          let afterAfterImageTimer = setTimeout(() =>
            this.handleUpdateSprite(last, '', ''),
            800
          );
        };
      } else {
        this.handleUpdateSprite(originalLocation, '', '');
        this.props.dispatch(gameModule.updateBulletCount(0));
      };
    };
    this.props.dispatch(gameModule.updateBulletCount(this.props.game.bulletCount - 1));
    let afterAfterImageTimer = setTimeout(() =>
      this.handleUpdateSprite(originalLocation, '', ''),
      200
    );
  }

  handleSwitch(switchId) {
    this.props.dispatch(soundsModule.changeEffect('switchOn'));
    let thisSwitch = this.props.switches[switchId];
    if (thisSwitch.isPushed === false) {
      if (thisSwitch.kind == 'pressure') {
        this.props.dispatch(roomModule.updateValue(thisSwitch.location, 'S', roomConsts.sprites['switchOn']));
      } else {
        this.props.dispatch(roomModule.updateSprite(thisSwitch.location, roomConsts.sprites['elecSwitchOn']));
      };
      this.props.dispatch(switchesModule.pushSwitch(thisSwitch.switchId, true));
      let effectId = this.props.switches[switchId].effectId;
      let effectType = this.props.switches[switchId].effectType;
      if (effectType == 'platform') {
        this.props.dispatch(platformsModule.activatePlatform(effectId, true));
        this.platformStart(effectId);
      } else if (effectType == 'event') {
        if(effectId == 'machine') {
          this.props.dispatch(roomModule.updateSprite(133, roomConsts.sprites['theMachineOn']));
          this.props.dispatch(roomModule.updateValue(108, '%', roomConsts.sprites['warp']));
        };
      } else {
        this.props.dispatch(doorsModule.updateDoorLock(effectId, false));
      };
    };
  }

  startSwitchCountdown(switchId){
    let thisSwitch = this.props.switches[switchId];
    let switchTimer = setTimeout(() =>
      {this.props.dispatch(switchesModule.pushSwitch(thisSwitch.switchId, false));
      this.props.dispatch(roomModule.updateValue(thisSwitch.location, 'S', roomConsts.sprites['switchOff']));
      this.voidSwitchEffect(thisSwitch);
      this.props.dispatch(soundsModule.changeEffect('switchOff'));},
    thisSwitch.timer
    );
    if (this.props.flags[2].triggered == false) {
      let eventTimer = setTimeout(() =>
        this.triggerEvent(2, 'A'),
        1000
      );
    };
  }

  voidSwitchEffect(thisSwitch) {
    if (thisSwitch.effectType == 'door') {
      this.props.dispatch(doorsModule.updateDoorLock(thisSwitch.effectId, true));
    } else {
      this.props.dispatch(platformsModule.activatePlatform(thisSwitch.effectId, false));
      this.platformReturn(thisSwitch.effectId);
    };
  }

  triggerEvent(eventNum, branch){
    this.props.dispatch(flagsModule.triggerFlag(eventNum));
    this.triggerDialogue('dialogue', branch + eventNum);
  }

  attemptMove(direction, originalLocation) {
    //get difference between two spaces
    let difference = helpers.getDifference(direction);
    //and new square id #
    let newLocation = originalLocation + difference;
    //check for pushable block
    let content = this.props.currentRoom[newLocation].content;
    let hasBlock = content.find(function(content) {
      return content[0] == 'block';
    });
    let hasElec = this.props.currentRoom[newLocation].content.find(function(content) {
      return content[0] == 'elecSwitch';
    });
    if (hasBlock !== undefined && originalLocation === this.props.player.location){
      let blockMove = this.attemptMove(direction, newLocation);
      if (blockMove !== newLocation) {
        this.moveBlock(hasBlock[1], direction, newLocation, newLocation + difference);
        return newLocation;
      } else {
        return originalLocation
      };
    //check if move is possible
    } else if (hasBlock == undefined
    && hasElec == undefined
    && this.props.currentRoom[newLocation].value !== 'W'
    && this.props.currentRoom[newLocation].value !== 'T') {
      return newLocation;
    } else {
      return originalLocation;
    };
  }

  //check for effects caused by landing on square
  playerSquareCheck(squareId, direction) {
    let currentLocation = this.props.player.location;
    let squareToCheck = this.props.currentRoom[squareId];
    //check for enemy
    let hasEnemy = squareToCheck.content.find(function(content) {
      return content[0] == 'enemy';
    });
    //check for door
    let hasDoor = squareToCheck.content.find(function(content) {
      return content[0] == 'door';
    });
    //check for door trigger
    let hasDoorTrigger = squareToCheck.content.find(function(content) {
      return content[0] == 'doorTrigger';
    });
    //take damage
    if ((hasEnemy !== undefined && this.props.player.status !== 'dash') || squareToCheck.value == 'L' || squareToCheck.value == 'boss' || squareToCheck.value == 'H' || (squareToCheck.value == 'i' && this.props.game.eye == true)|| (squareToCheck.value == '~' && this.props.game.eye == true)) {
      let knockBackDirection = helpers.reverseDirection(direction);
      this.knockBack(knockBackDirection);
      return 'knockback';
    //attempt to open door
    } else if (hasDoorTrigger !== undefined) {
      this.attemptOpen(hasDoorTrigger[1]);
      return 'moved';
    //prevent player from entering closed door
    } else if (hasDoor !== undefined) {
      if (this.props.doors[hasDoor[1]].status == 'open') {
        return 'moved';
      } else {
        this.props.dispatch(playerModule.updatePlayerStatus('normal'));
      };
    //fall to your doom and respawn 
    } else if (squareToCheck.value == 'P'){
      this.fall(squareId, direction);
      return 'fall';
    //slide on ice
    } else if (squareToCheck.value == 'I' && this.attemptMove(direction, squareId) !== squareId){
      this.props.dispatch(soundsModule.changeEffect('slide'));
      return 'slide';
    //move in direction of c belt
    } else if (squareToCheck.value == 'C'){
      let belt = squareToCheck.content.find(function(content) {
        return content[0] == 'belt';
      });
      let beltDirection = belt[1];
      this.props.dispatch(playerModule.updatePlayerDirection(beltDirection));
      if (this.attemptMove(beltDirection, squareId) !== squareId) {
        return 'slide';
      } else {
        return 'moved';
      };
    //activate switch
    } else if (squareToCheck.value == 'S') {
      let hasPressureSwitch = squareToCheck.content.find(function(content) {
        return content[0] == 'switch';
      });
      if (hasPressureSwitch !== undefined) {
        this.handleSwitch(hasPressureSwitch[1]);
        return 'moved';
      } else {
        return 'stopped';
      };
    //pick up item
    } else if (squareToCheck.value == '$') {
      this.getItem(squareToCheck)
      return 'moved';
    //warp
    } else if (squareToCheck.value == '@') {
      let thisWarp = squareToCheck.content.find(function(content) {
        return content[0] == 'warp';
      });
      this.handleUpdatePlayerLocation(currentLocation, squareId);
      this.handleUpdateSprite(currentLocation, '', '');
      this.warp("player", squareId, thisWarp[1]);
    } else if (squareToCheck.value == '%') {
      this.handleUpdateSprite(currentLocation, '', '');
      this.switchBranch(squareToCheck.squareId);
    //move normally
    } else {
      return 'moved';
    };
  }

  attemptOpen(doorId) {
    let door = this.props.doors[doorId];
    if (door.isLocked == true) {
      this.props.dispatch(soundsModule.changeEffect('doorLocked'));
    } else if (door.status !== 'open') {
      this.props.dispatch(soundsModule.changeEffect('doorOpen'));
      this.props.dispatch(doorsModule.updateDoorStatus(doorId, 'opening'));
      let doorTimer = setTimeout(() =>
        this.props.dispatch(doorsModule.updateDoorStatus(doorId, 'open')),
        600
      );
    };
  }

  closeDoor(doorId){
    this.props.dispatch(soundsModule.changeEffect('doorClose'));
    this.props.dispatch(doorsModule.updateDoorStatus(doorId, 'closing'));
    let doorTimer = setTimeout(() =>
      this.props.dispatch(doorsModule.updateDoorStatus(doorId, 'closed')),
      600
    );
  }

  changeRoom(door) {
    if (this.props.game.roomId === 1 && this.props.flags[2].triggered === false || this.props.game.currentRoom === 4 && this.props.game.branch !== 3) {
      this.props.dispatch(soundsModule.changeMusic('bgm1'))
    };
    let newRoom = door.leadsTo;
    let thisRoom = this.props.game.roomId;
    this.props.dispatch(gameModule.setPreviousRoomId(thisRoom));
    let mapArr = Object.values(this.props.maps);
    let mapsRoom = mapArr.find(function(room) {
      return room.roomId == thisRoom;
    });
    this.props.dispatch(mapsModule.changeVisited(mapsRoom.mapsId));
    this.props.dispatch(gameModule.setRoomId(newRoom));
    this.nullAll();
    this.handleChangeGameState("building");
    this.generateRoomFromTemplate();
  }

  switchBranch(location) {
    this.props.dispatch(soundsModule.changeEffect('warp'));
    this.props.dispatch(roomModule.updateSprite(location, playerConsts.sprites.dash.south));
    let afterImageTimer = setTimeout(() => {
      this.handleUpdateSprite(location, playerConsts.sprites.particle['south'], '');},
      500
    );
    let afterAfterImageTimer = setTimeout(() =>
      {this.handleUpdateSprite(location, '', '');
      this.fadeOut();},
      1000
    );
  }

  fadeOut() {
    this.props.dispatch(soundsModule.changeEffect('wind'));
    let fadeOutTimer = setTimeout(() =>
    {this.props.dispatch(gameModule.changeGameState("exitBranch"));
    this.props.dispatch(soundsModule.changeEffect('wind'));},
      4000
    );
    let exitTimer = setTimeout(() =>
    {this.handleSaveGame();
    this.props.dispatch(gameModule.changeGameState("postExitBranch"));
    this.props.dispatch(soundsModule.changeMusic(''));
    this.props.history.push('/');},
      10000
    );
  }

  handleSaveGame() {
    let file = this.props.game.file;
    if (this.props.saves[file].status == 'empty') {
      this.props.dispatch(savesModule.changeStatus(file, 'active'));
    }
    let player = this.props.player;
    let flags = this.props.flags;
    let game = this.props.game;
    let maps = this.props.maps;
    let doors = this.props.doors;
    this.props.dispatch(savesModule.saveGame(file, player, flags, game, maps, doors));
  }

  //text
  getItem(square){
    this.props.dispatch(roomModule.updateValue(square.squareId, '0', roomConsts.sprites['tile']));
    let itemArr = square.content.find(function(content) {
      return content[0] == "weapon" || content[0] == "item";
    });
    if (itemArr[0] == "weapon"){
      let weaponArr = this.props.player.weapons;
      weaponArr.push(itemArr[1]);
      this.props.dispatch(soundsModule.changeEffect('jingle1'));
      this.props.dispatch(playerModule.addWeaponToInventory(weaponArr));
      this.props.dispatch(playerModule.changeCurrentWeapon(itemArr[1]));
      this.props.dispatch(playerModule.updateNewItem(itemArr[1]));
      this.props.dispatch(gameModule.changeGameState("itemGet"));
    } else {
      if (itemArr[1] == 'health') {
        this.props.dispatch(soundsModule.changeEffect('regen'));
        let newHealth = this.props.player.health + 10;
        this.props.dispatch(playerModule.updatePlayerHealth(newHealth));
      } else {
        let inventoryArr = this.props.player.items;
        inventoryArr.push(itemArr[1]);
        this.props.dispatch(soundsModule.changeEffect('jingle1'));
        this.props.dispatch(playerModule.addItemToInventory(inventoryArr));
        this.props.dispatch(playerModule.updateNewItem(itemArr[1]));
        this.props.dispatch(gameModule.changeGameState("itemGet"));
      };
    };
    let newContent = square.content.filter(function(content) {
      return content[0] !== "weapon" || content[0] !== "item";
    });
    this.props.dispatch(roomModule.updateContent(square.squareId, newContent));
  }

  closeItemGet(){
    let item = this.props.player.newItem;
    this.props.dispatch(gameModule.changeGameState('active'));
    this.props.dispatch(playerModule.updateNewItem(''));
    if(item === 'Taser'){
      this.triggerPopUp(2);
    };
  }

  triggerDialogue(type, textKey){
    this.props.dispatch(textModule.setActiveText(textKey, type));
    this.props.dispatch(gameModule.changeGameState('dialogue'));
    if(textKey.includes('terminal')){
      this.props.dispatch(soundsModule.changeEffect('bootUp'));
    } else if(textKey.includes('phone')){
      this.props.dispatch(soundsModule.changeEffect('pickUp'));
    } else {
      this.props.dispatch(soundsModule.changeEffect('menu'));
    };
  }

  endDialogue() {
    this.handlePlayerChoice();
    this.props.dispatch(gameModule.changeGameState('active'));
    if (this.props.text.activeText.includes('terminal')){
        this.props.dispatch(soundsModule.changeEffect('bootDown'));
    } else if (this.props.text.activeText.includes('phone')){
      this.props.dispatch(soundsModule.changeEffect('pickUp'));
    } else {
      this.props.dispatch(soundsModule.changeEffect('menu'));
    };
    this.props.dispatch(textModule.setActiveText(null, null));
    this.props.dispatch(textModule.setLine(0));
    this.props.dispatch(textModule.setParagraph(1));
  }

  handlePlayerChoice(){
    if (this.props.text.activeText == 'terminal1') {
      this.props.dispatch(soundsModule.changeEffect('changeDoor'));
      if (this.props.text.selectedOption == 1) {
        this.props.dispatch(doorsModule.updateDoorLock('1-A', false));
      } else {
        this.props.dispatch(doorsModule.updateDoorLock('1-A', true));
      };
    };
  }

  advanceLine() {
    this.props.dispatch(soundsModule.changeEffect('menu'));
    //get current paragraph
    let activeParagraph;
    if (this.props.text.activeTextType == 'dialogue') {
      activeParagraph = textConsts.dialogue[this.props.text.activeText][this.props.text.paragraph][1];
    } else {
      activeParagraph = textConsts.examine[this.props.text.activeText][this.props.text.paragraph];
    };
    if (activeParagraph[0] == 'options') {
      this.props.dispatch(textModule.setOptions(activeParagraph[2]));
    } else if (activeParagraph[0] == 'textInput') {
      this.props.dispatch(textModule.toggleTextInput(true));
    } else {
      let newLine = this.props.text.line + 1;
      //if you've reached the end of the current paragraph...
      if (newLine >= activeParagraph.length || activeParagraph[0] == 'results') {
        this.advanceParagraph();
      } else {
        this.props.dispatch(textModule.setLine(newLine));
      };
    };
  }

  advanceParagraph(){
    //get current text chunk
    let activeTextChunk;
    let newParagraph = this.props.text.paragraph + 1;
    if (this.props.text.activeTextType == 'dialogue') {
      activeTextChunk = textConsts.dialogue[this.props.text.activeText];
    } else {
      activeTextChunk = textConsts.examine[this.props.text.activeText];
    };
    if (newParagraph > Object.keys(activeTextChunk).length) {
      this.endDialogue();
    } else {
      this.props.dispatch(textModule.setParagraph(newParagraph));
      this.props.dispatch(textModule.setLine(0));
    };
  }

  //Platforms

  platformStart(platformId) {
    let thisPlatform = this.props.platforms[platformId];
    let platformTimerArr = this.props.game.platformTimers;
    platformTimerArr[platformId] = setInterval(() =>
        this.platformMove(platformId),
      1000
    );
    this.props.dispatch(gameModule.updatePlatformTimers(platformTimerArr));
  }

  platformMove(platformId){
    let platform = this.props.platforms[platformId];
    let originalLocation = platform.location;
    let canMove = this.attemptMove(platform.direction, originalLocation);
    if (canMove == originalLocation || this.props.currentRoom[canMove].value !== "P"){
      let newDirection = helpers.reverseDirection(platform.direction);
      this.props.dispatch(platformsModule.updatePlatformDirection(platform.platformId, newDirection));
    } else {
      this.handleUpdatePlatformLocation(platform.platformId, originalLocation, canMove);
    };
    if (canMove == platform.start){
      let newDirection = helpers.reverseDirection(platform.direction);
      this.props.dispatch(platformsModule.updatePlatformDirection(platform.platformId, newDirection));
    };
  }

  platformReturn(platformId){
    let timerArr = this.props.game.platformTimers;
    let timerToClear = timerArr[platformId]
    clearInterval(timerToClear);
    let newTimerArr = this.props.game.platformTimers.filter(function(timer) {
      return timer !== platformId;
    });
    this.props.dispatch(gameModule.updatePlatformTimers(newTimerArr));
    let platform = this.props.platforms[platformId];
    let next;
    if (platform.location !== platform.start){
      if (platform.direction == 'north' || platform.direction == 'south') {
        if (platform.start > platform.location) {
          next = 1;
        } else {
          next = -1;
        };
      } else {
        if (platform.start > platform.location) {
          next = 13;
        } else {
          next = -13;
        };
      };
      let location = platform.location;
      let rapidMoveTimer = setInterval(() =>
        {if (location !== platform.start) {
          let newLocation = location + next;
          this.handleUpdatePlatformLocation(platform.platformId, location, newLocation);
          location = newLocation
        } else {
          clearInterval(rapidMoveTimer);
        }},
        100
      );
    };
  }

  handleUpdatePlatformLocation(platformId, originalLocation, newLocation){
    let platform = this.props.platforms[platformId];
    //set new tile images
    let image;
    if (newLocation == platform.start && platform.isActive == false) {
      if (platform.direction == 'north' || platform.direction == 'south') {
        image = roomConsts.sprites['platformOffNS'];
      } else {
        image = roomConsts.sprites['platformOffEW'];
      };
    } else if (platform.direction == 'north' || platform.direction == 'south') {
      image = roomConsts.sprites['platformOnNS'];
    } else if (platform.direction == 'east' || platform.direction == 'west') {
      image = roomConsts.sprites['platformOnEW']
    };
    this.props.dispatch(roomModule.updateValue(originalLocation, 'P', ''));
    this.handleUpdateSprite(originalLocation, '', '');
    this.props.dispatch(roomModule.updateValue(newLocation, 'M', image));
    //remove ALL content from previous content array
    let contentArr = this.props.currentRoom[originalLocation].content;
    this.props.dispatch(roomModule.updateContent(originalLocation, []));
    //move ALL content to new content array
    this.props.dispatch(roomModule.updateContent(newLocation, contentArr));
    this.props.dispatch(platformsModule.updatePlatformLocation(platformId, newLocation));
    if (contentArr.length > 1) {
      this.resolvePlatformContent(newLocation, platform.direction);
    };
  }

  resolvePlatformContent(location, direction) {
    let content = this.props.currentRoom[location].content;
    let contentToUpdate = content.find(function(content){
      return content[0] == 'player';
    });
    if (contentToUpdate == undefined){
      contentToUpdate = content.find(function(content){
        return content[0] == 'block';
      });
    };
    let sprite;
    if (contentToUpdate[0] == 'player') {
      this.props.dispatch(playerModule.updatePlayerLocation(location));
      sprite = playerConsts.sprites.stand[this.props.player.direction];
    } else if (contentToUpdate[0] == 'block') {
      this.props.dispatch(blocksModule.updateBlockLocation(contentToUpdate[1], location));
      sprite = roomConsts.sprites.block;
    };
    this.handleUpdateSprite(location, sprite, direction+"Enter");
  }

  //Handle Blocks
  moveBlock(blockId, direction, originalLocation, newLocation) {
    //move animation
    this.props.dispatch(soundsModule.changeEffect('scrape'));
    this.props.dispatch(roomModule.updateTransition(originalLocation, direction));
    //check properties of new square
    let blockCheck = this.props.currentRoom[newLocation];
    //enemy?
    let hasEnemy = blockCheck.content.find(function(content) {
      return content[0] == 'enemy';
    });
    //player?
    let hasPlayer = blockCheck.content.find(function(content) {
      return content[0] == 'player';
    });
    //update location
    let previousContentArr = this.props.currentRoom[originalLocation].content;
    let filteredContentArr = previousContentArr.filter(function(content) {
      return content[0] !== 'block';
    });
    this.props.dispatch(roomModule.updateContent(originalLocation, filteredContentArr));
    this.handleUpdateSprite(originalLocation, '', '');
    //check for enemy
    if (hasEnemy !== undefined && this.attemptMove(direction, newLocation) !== newLocation) {
      this.enemyKnockBack(direction, hasEnemy[1]);
    };
    if (hasPlayer != undefined && this.attemptMove(direction, newLocation) !== newLocation) {
      this.knockBack(direction);
    };
    //if new square is a pit
    if (blockCheck.value == 'P') {
      this.blockFall(blockId, newLocation, direction);
    //if new square is lava
    } else if (blockCheck.value == 'L') {
      this.blockSink(blockId, newLocation, direction);
    //if new square is a warp
    } else if (blockCheck.value == '@') {
      //add block to warp entry content array
      let newContentArr = this.props.currentRoom[newLocation].content;
      newContentArr.push(["block", blockId]);
      this.props.dispatch(roomModule.updateContent(newLocation, newContentArr));
      //trigger warp
      let thisWarp = this.props.currentRoom[newLocation].content.find(function(content) {
        return content[0] == 'warp';
      });
      this.warp(blockId, newLocation, thisWarp[1]);
      //remove block from warp entry array
      let blockClearTimer = setTimeout(() =>
        {filteredContentArr = newContentArr.filter(function(content) {
        return content[0] !== 'block';
        });
        this.props.dispatch(roomModule.updateContent(newLocation, filteredContentArr));},
        100
      );
    } else {
      //otherwise, move normally
      let newContentArr = this.props.currentRoom[newLocation].content;
      newContentArr.push(["block", blockId]);
      this.props.dispatch(roomModule.updateContent(newLocation, newContentArr));
      this.props.dispatch(blocksModule.updateBlockLocation(blockId, newLocation));
      this.props.dispatch(roomModule.updateSprite(newLocation, roomConsts.sprites['block']));
      let nextLocation = this.attemptMove(direction, newLocation);
      if (this.props.currentRoom[newLocation].value == "I" && nextLocation !== newLocation) {
        let blockMoveTimer = setTimeout(() =>
          this.moveBlock(blockId, direction, newLocation, nextLocation),
          100
        );
      };
      //move in direction of c belt
      if (this.props.currentRoom[newLocation].value == "C") {
        let beltArr = this.props.currentRoom[newLocation].content.find(function(content) {
          return content[0] == 'belt';
        });
        direction = beltArr[1];
        nextLocation = this.attemptMove(direction, newLocation);
        if (nextLocation !== newLocation) {
          let blockMoveTimer = setTimeout(() =>
            this.moveBlock(blockId, direction, newLocation, nextLocation),
            100
          );
        };
      };
      //trigger switch
      if (blockCheck.value == 'S') {
        let thisSwitchId = blockCheck.content.find(function(content) {
          return content[0] == 'switch';
        });
        this.handleSwitch(thisSwitchId[1]);
      };
    };
  }

  blockFall(blockId, pitLocation, direction) {
    this.handleUpdateSprite(pitLocation, roomConsts.sprites['block'], direction);
    let spriteClearTimer = setTimeout(() =>
      {this.handleUpdateSprite(pitLocation, '', '');
      this.props.dispatch(blocksModule.nullBlock(blockId));},
      500
    );
  };

  blockSink(blockId, lavaLocation, direction) {
    this.props.dispatch(roomModule.updateSprite(lavaLocation, roomConsts.sprites['blockSink']));
    let spriteClearTimer = setTimeout(() =>
      {this.props.dispatch(roomModule.updateSprite(lavaLocation, ''));
      this.props.dispatch(blocksModule.nullBlock(blockId));
      this.props.dispatch(roomModule.updateValue(lavaLocation, 'L-sunk', roomConsts.sprites['lavaCovered']))},
      800
    );
  };

//Handle Enemies
  handleCreateNewEnemy(locationId, enemyType) {
    let thisEnemy = enemyConsts.enemies[enemyType];
    let enemyId = v4();
    this.props.dispatch(enemiesModule.createEnemy(enemyId, thisEnemy.kind, thisEnemy.sprites, thisEnemy.health, 'normal', locationId, 'south'));
    //stagger enemy movement
    let rng = Math.floor(Math.random() * 5) + 1 * 2000;
    let enemyTimer = setInterval(() =>
      this.enemyMove(enemyId),
      rng
    );
    this.props.game.enemyTimers.push(enemyTimer);
    return enemyId;
  }

  createBoss(){
    this.props.dispatch(bossModule.updateBossStatus('alive'));
    this.props.dispatch(gameModule.setEye('alive'));
    this.props.dispatch(soundsModule.changeMusic('bossIntro'));
    let titles = this.props.boss.titles;
    setTimeout(() => {
      this.props.dispatch(soundsModule.changeEffect(''));
      this.props.dispatch(soundsModule.changeEffect('whoosh'));
      this.props.dispatch(bossModule.updateBossName('Chalazion'));
      titles.push('Monster what did all that stuff');
      this.props.dispatch(bossModule.updateBossTitles(titles));},
      2000
    );
    setTimeout(() => {
      this.props.dispatch(soundsModule.changeEffect('scream'));},
      4000
    );
    setTimeout(() => {
      this.startBossFight();},
      7000
    );
  }

  startBossFight() {
    this.props.dispatch(bossModule.updateBossName(''));
    this.props.dispatch(bossModule.updateBossTitles([]));
    this.props.dispatch(soundsModule.changeMusic('boss'));
    let bossTimer = setInterval(() =>
      {let rng = Math.floor(Math.random() * 2);
        if (rng === 1){
          this.bossMove();
        } else {
          this.bossAttack();
        };
      },
      1000
    );
  }

  bossAttack(){
    let rng = Math.floor(Math.random() * 4);
    let start1 = this.props.boss.tileArr[3];
    let start2 = this.props.boss.tileArr[7];
    let direction = this.getRandomDirection();
    if (rng === 0) {
      setTimeout(() => {
       //fire projectile
       this.handleProjectile('Taser', 'north', this.props.boss.tileArr[5], 8, <img src={bossShot} width="60" height="60"/>)
       this.handleProjectile('Taser', 'south', this.props.boss.tileArr[4], 8, <img src={bossShot} width="60" height="60"/>)
       this.handleProjectile('Taser', 'east', this.props.boss.tileArr[8] - 13, 8, <img src={bossShot} width="60" height="60"/>)
       this.handleProjectile('Taser', 'west', this.props.boss.tileArr[0] + 13, 8, <img src={bossShot} width="60" height="60"/>)
      },
        2000
      );
    } else if (rng === 1){
      //summon tentacle
      rng = Math.floor(Math.random() * 140);
      if(this.props.currentRoom[rng].value === '0') {
        this.props.dispatch(roomModule.setWarning(rng, true));
        setTimeout(() => 
          {this.props.dispatch(roomModule.setWarning(rng, false));
          this.props.dispatch(roomModule.updateValue(rng, '~', roomConsts.sprites['spookyTile']));},
          3000
        );
        setTimeout(() => 
          {if(this.props.currentRoom[rng].value === '~') {
            this.props.dispatch(roomModule.updateValue(rng, '0', roomConsts.sprites['spookyTile']));
          }},
          9000
        );
      };
    } else if (rng === 2){
      //aoe explosion
      let bossArr = this.props.boss.tileArr;
      let explosionTiles = [];
      for(let i=0; i < bossArr.length; i++) {
        if(i % 2 === 0) {
          explosionTiles.push(bossArr[i] - 1, bossArr[i] - 2); 
        } else {
          explosionTiles.push(bossArr[i] + 1, bossArr[i] + 2); 
        };
      };
      explosionTiles.push(
        bossArr[0] - 13,
        bossArr[0] - 14,
        bossArr[0] - 26,
        bossArr[1] - 13,
        bossArr[1] - 26,
        bossArr[1] - 12,
        bossArr[8] + 13,
        bossArr[8] + 26,
        bossArr[8] + 12,
        bossArr[9] + 13,
        bossArr[9] + 26,
        bossArr[9] + 14
      );
      let room = this.props.currentRoom;
      let filteredTiles = explosionTiles.filter(function(tile) {
        if(tile > 0 && tile < 156) {
          return room[tile].value === '0';
        }
      });
      filteredTiles.forEach(tile => {
        this.props.dispatch(roomModule.setWarning(tile, true));
      });
      let shuffledTiles = this.shuffleArray(filteredTiles)
      setTimeout(() => {
        this.props.dispatch(soundsModule.changeEffect('explosion'));
        shuffledTiles.forEach(tile => {
          setTimeout(() => {
            this.props.dispatch(roomModule.updateSprite(tile, <img src={bossBeam} width="50" height="100"/>));
            setTimeout(() => {
              this.props.dispatch(roomModule.setExplosion(tile, true));},
              200
            );
            setTimeout(() => {
              this.props.dispatch(roomModule.updateSprite(tile, ''));
              this.props.dispatch(roomModule.setWarning(tile, false));
              this.props.dispatch(roomModule.setExplosion(tile, false));},
              600
            );
          }),
          200
        })},
      1000
      );
    } else {
      //extend tenticles across stage
      let walls = [];
      let keys = Object.keys(this.props.currentRoom);
      let tiles = this.props.currentRoom;
      keys.forEach(key => {
        let num = parseInt(key);
        if(tiles[key].value === 'W' && num !== 2 && num !== 13 && num !== 145 && num !== 156) {
          walls.push(num);
        };
      });
      rng = Math.floor(Math.random() * walls.length);
      let direction = this.getDirection(walls[rng]);
      let next = helpers.getDifference(direction);
      let start = walls[rng] + next;
      this.props.dispatch(roomModule.setWarning(start, true));
      let tentacleArr = [];
      for(let i=0; i < 10; i++) {
        tentacleArr.push(start);
        start = start + next;
      };
      tentacleArr.forEach(tile => {
        this.props.dispatch(roomModule.setWarning(tile, true));
      })
    }
  }


getDirection(num) {
  const north = [13, 26, 39, 52, 65, 78, 93, 106, 119, 132];
  const south = [26, 39, 52, 65, 78, 91, 104, 117, 130, 143];
  if(north.includes(num)){
    return 'south';
  } else if (south.includes(num)){
    return 'north';
  } else if (num < 13) {
    return 'east';
  } else if (num > 145) {
    return 'west';
  };
}

shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

  getRandomDirection(){
    let rng = Math.floor(Math.random() * 4);
    if (rng == 0) {
      return 'north';
    } else if (rng == 1) {
      return 'south';
    } else if (rng == 2) {
      return 'east';
    } else if (rng == 3) {
      return 'west';
    };
  }

  bossMove() {
    let direction = this.getRandomDirection();
    let bossArr = this.props.boss.tileArr;
    let canMove = true;
    bossArr.forEach(bossSpace => {
      if(this.attemptMove(direction, bossSpace) === bossSpace){
        canMove = false;
      };
    });
    if (canMove) {
      bossArr.forEach(bossSpace => {
        this.props.dispatch(roomModule.updateValue(bossSpace, '0', roomConsts.sprites['spookyTile']));
      });
      let newArr = [];
      bossArr.forEach(bossSpace => {
        let newSpace = this.attemptMove(direction, bossSpace);
        this.props.dispatch(roomModule.updateValue(newSpace, 'boss', roomConsts.sprites['spookyTile']));
        newArr.push(newSpace);
      });
      this.props.dispatch(roomModule.updateSprite(bossArr[newArr.length -1], ''));
      this.props.dispatch(bossModule.updateTileArray(newArr));
      this.props.dispatch(roomModule.updateSprite(newArr[newArr.length -1], <img src={boss} width="250" height="220"/>));
    }
  }

  enemyMove(enemyId) {
    if (this.props.game.gameState === 'active' && this.props.enemies[enemyId].status == 'normal') {
      let enemy = this.props.enemies[enemyId];
      let enemyLocation = this.props.enemies[enemyId].location;
      if (enemy.kind === 'Slime' || enemy.kind === 'bubble') {
        this.moveRandom(enemyId, enemyLocation);
      } else if (enemy.kind === 'Robot') {
        this.moveRandom(enemyId, enemyLocation);
      } else if (enemy.kind === 'Boss') {
        this.movePursue(enemyId, enemyLocation);
      }
    }
  }

  moveRandom(enemyId, currentLocation) {
    let direction;
    //check if player is on neighboring square
    let playerNear = helpers.checkForPlayer(currentLocation, this.props.player.location);
    //otherwise, move at random
    if (playerNear !== false) {
      direction = playerNear;
    } else {
      let rng = Math.floor(Math.random() * 4);
      if (rng == 0) {
        direction = 'north';
      } else if (rng == 1) {
        direction = 'south';
      } else if (rng == 2) {
        direction = 'east';
      } else if (rng == 3) {
        direction = 'west'
      }
    }
    this.executeEnemyMove(enemyId, currentLocation, direction);
  }

  executeEnemyMove(enemyId, currentLocation, direction) {
    let roomId = this.props.game.currentRoom;
    if (this.props.game.gameState == 'active') {
      this.props.dispatch(enemiesModule.updateEnemyDirection(enemyId, direction));
      this.props.dispatch(roomModule.updateSprite(currentLocation, this.props.enemies[enemyId].sprites.move[direction]));
      //check if move is legal, if not return original location
      let canMove = this.attemptMove(direction, currentLocation);
      let content = this.props.currentRoom[canMove].content;
      let hasEnemy = content.find(function(content) {
        return content[0] == 'enemy';
      });
      let hasPlayer = content.find(function(content) {
        return content[0] == 'player';
      });
      let hasElecSwitch = content.find(function(content) {
        return content[0] == 'elecSwitch';
      });
      if (canMove !== currentLocation
      && hasEnemy == undefined
      && this.props.currentRoom[canMove].value !== 'M'
      && this.props.currentRoom[canMove].value !== 'D'
      && this.props.currentRoom[canMove].value !== 'L'
      && !(this.props.currentRoom[canMove].value == '~' && this.props.game.eye == true) 
      && this.props.currentRoom[canMove].value !== 'P'){
        //hurt player, but don't move if they can't be knocked back to another square
        if (hasPlayer !== undefined) {
          this.knockBack(direction);
          if (this.props.enemies[enemyId].kind == 'bubble') {
            this.killEnemy(enemyId);
            this.createSlime(currentLocation);
          };
        } else {
          //update enemy location and new square
          this.handleUpdateEnemyLocation(enemyId, currentLocation, canMove);
          if (this.props.enemies[enemyId].kind == 'bubble') {
            let rng = Math.floor(Math.random() * 5);
            if (rng === 0) {
              this.killEnemy(enemyId);
              this.createSlime(currentLocation);
            };
          };
          if (this.props.enemies[enemyId].kind == 'Slime' && this.props.currentRoom[currentLocation].value !== 'H') {
            this.createSlime(currentLocation);
          }
          //start walk animation
          let EnemyEnterTimer = setTimeout(() =>
            {if (this.props.game.currentRoom == roomId) {
              this.handleUpdateSprite(currentLocation, '', '');
              this.handleUpdateSprite(canMove, this.props.enemies[enemyId].sprites.move[direction], direction + 'Enter');
            }},
            200
          );
        }
      }
    }
  }

  createSlime(currentLocation){
    let tile;
    if (this.props.game.branch === 3) {
      tile = 'spookyTile';
    } else {
      tile = 'tile'
    };
    this.props.dispatch(roomModule.updateValue(currentLocation, 'H', roomConsts.sprites[tile]));
    let roomId = this.props.game.roomId;
    let gooTimer = setTimeout(() =>
    //prevent updates after changing room
    {if (this.props.game.roomId == roomId) {
      this.props.dispatch(roomModule.updateValue(currentLocation, '0', roomConsts.sprites[tile]));
    }},
      5000
    );
  }

  handleUpdateEnemyLocation(enemyId, originalLocation, newLocation) {
    let previousContentArr =  this.props.currentRoom[originalLocation].content;
    let filteredContentArr = previousContentArr.filter(function(content) {
      return content[0] !== 'enemy';
    });
    this.props.dispatch(roomModule.updateContent(originalLocation, filteredContentArr));
    let newContentArr = this.props.currentRoom[newLocation].content;
    newContentArr.push(["enemy", enemyId]);
    this.props.dispatch(roomModule.updateContent(newLocation, newContentArr));
    this.props.dispatch(enemiesModule.updateEnemyLocation(enemyId, newLocation));
  }

  handleEnemyDamage(source, knockBackDirection, enemyId) {
    //if attack == dash
    if (source == 'dash' || source == 'blast') {
      if (this.props.enemies[enemyId].status == 'frozen') {
        this.killEnemy(enemyId);
      } else {
        this.props.dispatch(enemiesModule.updateEnemyHealth(enemyId, this.props.enemies[enemyId].health -= 10));
        this.enemyHealthCheck(enemyId);
        this.enemyKnockBack(knockBackDirection, enemyId);
      }
    //if attack == taser
    } else if (source == 'Taser'){
      this.props.dispatch(enemiesModule.updateEnemyHealth(enemyId, this.props.enemies[enemyId].health -= 10));
      this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'shocked'));
      this.props.dispatch(roomModule.updateSprite(this.props.enemies[enemyId].location, this.props.enemies[enemyId].sprites['shock']));
      let statusTimer = setTimeout(() =>
        this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'normal')),
        600
      );
      this.enemyHealthCheck(enemyId);
    //if attack == cryostat
    } else if (source == 'Cryostat'){
      this.props.dispatch(enemiesModule.updateEnemyHealth(enemyId, this.props.enemies[enemyId].health -= 10));
      this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'frozen'));
      this.props.dispatch(roomModule.updateSprite(this.props.enemies[enemyId].location, this.props.enemies[enemyId].sprites['frozen']));
      let statusTimer = setTimeout(() =>
        this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'normal')),
        10000
      );
      this.enemyHealthCheck(enemyId);
    }
  }

  enemyHealthCheck(enemyId) {
    if (this.props.enemies[enemyId].health <= 0) {
      this.killEnemy(enemyId);
    }
  }

  killEnemy(enemyId){
    let location = this.props.enemies[enemyId].location;
    // this.props.dispatch(updateSprite(this.props.enemies[enemyId].sprites['dead'], location));
    this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'dead'));
    let statusTimer = setTimeout(() =>
      {this.handleUpdateSprite(location, '', '');
      this.props.dispatch(roomModule.updateContent(location, []));
      if(this.props.enemies[enemyId].type === 'bubble') {
        this.createSlime(location);
      };
      this.props.dispatch(enemiesModule.nullEnemy(enemyId));},
      600
    );
  }

  enemyKnockBack(knockBackDirection, enemyId) {
    let direction = this.props.enemies[enemyId].direction;
    let originalLocation = this.props.enemies[enemyId].location;
    let canMove = this.attemptMove(knockBackDirection, originalLocation);
    if (canMove !== location) {
      //update enemy and new square
      this.handleUpdateEnemyLocation(enemyId, originalLocation, canMove);
      this.handleUpdateSprite(originalLocation, this.props.enemies[enemyId].sprites.knockback[direction], knockBackDirection + 'Exit');
      let knockbackTimer = setTimeout(() =>
        {this.handleUpdateSprite(originalLocation, '', '');
        this.handleUpdateSprite(canMove, this.props.enemies[enemyId].sprites.knockback[direction], knockBackDirection + 'Enter');},
        200
      );
      let knockBackClearTimer = setTimeout(() =>
        this.handleUpdateSprite(this.props.enemies[enemyId].location, this.props.enemies[enemyId].sprites.move[direction], ''),
        300
      );
    } else {
      //if enemy can't move back, just trigger animation in current square
      this.props.dispatch(roomModule.updateSprite(canMove, this.props.enemies[enemyId].sprites.knockback[direction]));
    }
  }

  // enemyFall() {
  //   let newSprite = this.props.enemies[enemyId].sprites.knockback[direction];
  //   dispatch(roomModule.updateSprite(location, newSprite));
  //   dispatch(roomModule.updateSpriteOut(location, this.props.player.direction));
  //   let spriteClearTimer = setTimeout(() =>
  //     this.clearPlayerSprite(location),
  //     400
  //   );
  //   let spriteAddTimer = setTimeout(() =>
  //     this.handleUpdatePlayerLocation(this.props.game.respawnPoint, this.props.player.direction),
  //     400
  //   );
  // }


  render(){
    return (
      <div id="overWrap">
          <Music sounds={this.props.sounds}/>
          <SFX sounds={this.props.sounds}/>
          <Route exact path='/' render={()=><TitleContainer
            handleStart={() => this.startGame()}
            handleLoad={() => this.loadGame()}
            menu={this.props.menu}
            player={this.props.player}
            saves={this.props.saves}
            game={this.props.game}
            sounds={this.props.sounds}/>}/>
          <Route exact path='/end' render={()=><End />} />
          <Route exact path='/game' render={()=><Game
            handleStart={() => this.startGame()}
            handleLoad={() => this.loadGame()}
            currentRoom={this.props.currentRoom}
            player={this.props.player}
            game={this.props.game}
            blocks={this.props.blocks}
            doors={this.props.doors}
            menu={this.props.menu}
            maps={this.props.maps}
            text={this.props.text}
            flags={this.props.flags}
            sounds={this.props.sounds}
            popUp={this.state.popUp}
            boss={this.props.boss}/>} />
      </div>
    );
  }
}

App.propTypes = {
  currentRoom: PropTypes.object,
  game: PropTypes.object,
  player: PropTypes.object,
  enemies: PropTypes.object,
  blocks: PropTypes.object,
  doors: PropTypes.object,
  menu: PropTypes.object,
  switches: PropTypes.object,
  platforms: PropTypes.object,
  maps: PropTypes.object,
  flags: PropTypes.object,
  text: PropTypes.object,
  sounds: PropTypes.object,
  saves: PropTypes.object,
  boss: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    currentRoom: state.currentRoom,
    game: state.game,
    player: state.player,
    enemies: state.enemies,
    blocks: state.blocks,
    doors: state.doors,
    menu: state.menu,
    switches: state.switches,
    platforms: state.platforms,
    maps: state.maps,
    flags: state.flags,
    text: state.text,
    sounds: state.sounds,
    saves: state.saves,
    boss: state.boss
  }
};

function mapDispatchToProps(dispatch) {
  return {
    blocksModule : bindActionCreators(blocksModule, dispatch),
    doorsModule : bindActionCreators(doorsModule, dispatch),
    enemiesModule : bindActionCreators(enemiesModule, dispatch),
    gameModule : bindActionCreators(gameModule, dispatch),
    roomModule : bindActionCreators(roomModule, dispatch),
    playerModule : bindActionCreators(playerModule, dispatch),
    menuModule : bindActionCreators(menuModule, dispatch),
    platformsModule : bindActionCreators(platformsModule, dispatch),
    switchesModule : bindActionCreators(switchesModule, dispatch),
    mapsModule: bindActionCreators(mapsModule, dispatch),
    textModule: bindActionCreators(textModule, dispatch),
    flagsModule: bindActionCreators(flagsModule, dispatch),
    soundsModule: bindActionCreators(soundsModule, dispatch),
    savesModule: bindActionCreators(savesModule, dispatch),
    bossModule: bindActionCreators(bossModule, dispatch)
  }
};

export default withRouter(connect(mapStateToProps)(App));
