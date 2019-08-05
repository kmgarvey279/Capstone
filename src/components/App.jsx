import React from "react";
import Title from "./Title";
import End from "./End";
import Game from "./Game";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import {bindActionCreators} from 'redux';

import * as blocksModule from './../redux/modules/blocks';
import * as doorsModule from './../redux/modules/doors';
import * as enemiesModule from './../redux/modules/enemies/enemies';
import * as gameModule from './../redux/modules/game';
import * as levelModule from './../redux/modules/levels/level';
import * as playerModule from './../redux/modules/player/player';
import * as switchesModule from './../redux/modules/switches';
import * as platformsModule from './../redux/modules/platforms';
import * as mapModule from './../redux/modules/map';

import logs from './../text/logs.jsx';
import * as playerConsts from './../redux/modules/player/playerConstants';
import * as enemyConsts from './../redux/modules/enemies/enemyConstants';
import * as levelConsts from './../redux/modules/levels/levelConstants';
import * as helpers from './../helperFunctions';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

//Handle Input
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  handleKeyPress(event){
    //move up
    if(event.keyCode === 38 && this.props.player.status =='normal' && this.props.game.gameState === 'active'){
      this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
      this.move("north")
      //move down
    } else if(event.keyCode === 40 && this.props.player.status =='normal' && this.props.game.gameState === 'active'){
      this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
      this.move("south")
      //move right
    } else if (event.keyCode === 39 && this.props.player.status =='normal' && this.props.game.gameState === 'active'){
      this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
      this.move("east")
      //move left
    } else if (event.keyCode === 37 && this.props.player.status =='normal' && this.props.game.gameState === 'active'){
      this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
      this.move("west")
      //attack!
    } else if (event.keyCode === 32 && this.props.game.gameState == 'active' && this.props.player.status =='normal') {
      if (this.props.currentLevel[this.props.player.location].value == 'T') {
        this.activateTerminal(this.props.player.location);
      } else {
        this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
        this.attack();
      }
      //change selected weapon
    } else if (event.keyCode === 16 && this.props.game.gameState == 'active') {
        let newWeaponId;
        if (this.props.player.currentWeapon < Object.keys(this.props.player.weapons).length) {
          newWeaponId = this.props.player.currentWeapon + 1;
        } else {
          newWeaponId = 1;
        }
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
      }
    }
  }

//Change Level State
  startGame(){
    this.handleChangeGameState('active')
    this.generateMapFromTemplate();
    this.generateLevelFromTemplate();
  }

  pauseGame(){
    if (this.props.game.gameState == 'active') {
      this.handleChangeGameState('paused');
    } else if (this.props.game.gameState == 'paused') {
      this.handleChangeGameState('active');
    }
  }

  handleChangeGameState(newGameState){
    this.props.dispatch(gameModule.changeGameState(newGameState));
  }

//create map
  generateMapFromTemplate(){
    let mapTemplate = levelConsts.map[1];
    for(let i = 0; i < mapTemplate.length; i++){
      this.props.dispatch(mapModule.addMapSquare(i, mapTemplate[i]));
    }
  }

//Create Levels
  generateLevelFromTemplate(){
    this.nullAll();
    let levelTemplate = levelConsts.levels[this.props.game.levelId];
    for(let i = 0; i < levelTemplate.length; i++){
      this.handleAddingSquareToLevel(i+1, levelTemplate[i]);
    }
    let levelTransitionTimer = setTimeout(() =>
    {this.handleChangeGameState("active");
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));},
      500
    );
  }

  nullAll() {
    this.props.dispatch(levelModule.nullLevel());
    for(let i = 0; i < this.props.game.enemyTimers.length; i++) {
      clearInterval(this.props.game.enemyTimers[i]);
    }
    this.props.dispatch(enemiesModule.nullAllEnemies());
    this.props.dispatch(blocksModule.nullAllBlock());
    this.props.dispatch(switchesModule.nullAllSwitches());
    this.props.dispatch(platformsModule.nullAllPlatforms());
  }

  handleAddingSquareToLevel(thisSquareId, squareArr) {
    let squareValue = squareArr[0];
    let squareImage;
    let content = [];
    let sprite = '';
    let transition = '';
    let alert = false;
    //create door
    if (squareValue == 'D') {
      content.push(['door', squareArr[1]]);
      let doorDirection = helpers.getTileDirection(thisSquareId);
      //check if door exists in state, if not, create it
      if (!this.props.doors.hasOwnProperty(squareArr[1])) {
        //id, location, leadsTo, locked/open, direction
        this.props.dispatch(doorsModule.createDoor(squareArr[1], thisSquareId, squareArr[2], squareArr[3], doorDirection));
      }
      //create invisible exit tile on other side of door
      let exit;
      if (doorDirection == 'north') {
        exit = thisSquareId - 1;
      } else if (doorDirection == 'east') {
        exit = thisSquareId + 12;
      } else if (doorDirection == 'west') {
        exit = thisSquareId - 12;
      } else if (doorDirection == 'south') {
        exit = thisSquareId + 1;
      }
      this.props.dispatch(levelModule.addSquare(exit, 'EX', [['exit', squareArr[1]]], '', ''));
      //check if it's the door the player entered from, if so add player and set respawn point
      if (squareArr[2] == this.props.game.previousLevelId) {
        this.props.dispatch(gameModule.setRespawnPoint(thisSquareId));
        sprite = playerConsts.sprites.stand[helpers.reverseDirection(doorDirection)];
        content.push(['player']);
        this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
      }
      if (squareArr[3] == 'locked') {
        squareValue == 'LD'
        if (doorDirection == 'north') {
          squareImage = levelConsts.sprites['tile'];
        } else if (doorDirection == 'west') {
          squareImage = levelConsts.sprites['tile'];
        } else if (doorDirection == 'east') {
          squareImage = levelConsts.sprites['tile'];
        } else if (doorDirection == 'south') {
          squareImage = levelConsts.sprites['tile'];
        }
      } else {
        squareImage = levelConsts.sprites['tile'];
      }
    //create lava
    } else if (squareValue == 'L') {
      squareImage = levelConsts.sprites['lava'];
    //create pit
    } else if (squareValue == 'P') {
      squareImage = '';
    //create wall
    } else if (squareValue == 'W') {
      let wallType = helpers.getTileDirection(thisSquareId);
      if (wallType == 'northWest') {
        squareImage = levelConsts.sprites['wallCorner1'];
      } else if (wallType == 'northEast') {
        squareImage = levelConsts.sprites['wallCorner3'];
      } else if (wallType == 'southWest') {
        squareImage = levelConsts.sprites['wallCorner2'];
      } else if (wallType == 'southEast') {
        squareImage = levelConsts.sprites['wallCorner4'];
      } else if (wallType == 'south') {
        squareImage = levelConsts.sprites['wallBottom'];
      } else if (wallType == 'west') {
        squareImage = levelConsts.sprites['wallLeft'];
      } else if (wallType == 'east') {
        squareImage = levelConsts.sprites['wallRight'];
      } else if (wallType == 'north') {
        squareImage = levelConsts.sprites['wallTop'];
      } else {
        squareImage = levelConsts.sprites['wall'];
      }
    //create coin tile
    } else if (squareValue == '$') {
      squareImage = levelConsts.sprites['coin'];
    //create ice tile
    } else if (squareValue == 'I') {
      squareImage = levelConsts.sprites['ice'];
    //create moving tile
  } else if (squareValue == 'M') {
      let contentId = v4();
      content.push(['platform', contentId]);
      let direction = squareArr[1];
      if (direction == 'north' || direction == 'south'){
        squareImage = squareImage = levelConsts.sprites['platformOffNS'];
      } else {
        squareImage = levelConsts.sprites['platformOffEW'];
      }
      this.props.dispatch(platformsModule.createPlatform(contentId, thisSquareId, thisSquareId, direction, false));
    //spawn switch
    } else if (squareValue == 'S') {
      squareImage = levelConsts.sprites['switchOff'];
      let contentId = v4();
      content.push(['switch', contentId]);
      this.props.dispatch(switchesModule.createSwitch(contentId, thisSquareId, false, squareArr[1], squareArr[2]));
    } else if (squareValue == 'T'){
      squareImage = levelConsts.sprites['stairs'];
      content.push(['terminal', logs[squareArr[1]]]);
      alert = true;
    } else {
      squareImage = levelConsts.sprites['tile'];
    }
    //spawn enemy
    if (squareValue == 'E') {
      let newEnemyId = this.handleCreateNewEnemy(thisSquareId, squareArr[1]);
      sprite = this.props.enemies[newEnemyId].sprites.move['south'];
      content.push(['enemy', newEnemyId]);
    }
    //spawn block
    if (squareValue == 'B') {
      sprite = levelConsts.sprites['block'];
      let contentId = v4();
      content.push(['block', contentId]);
      this.props.dispatch(blocksModule.createBlock(contentId));
    }
    this.props.dispatch(levelModule.addSquare(thisSquareId, squareValue, content, squareImage, sprite, transition, alert));
  }

//Handle Movement
  move(direction){
    let originalLocation = this.props.player.location;
    this.props.dispatch(playerModule.updatePlayerDirection(direction));
    this.props.dispatch(levelModule.updateSprite(originalLocation, playerConsts.sprites.stand[direction]));
    //check if move is legal, if not return original location
    let canMove = this.attemptMove(direction, originalLocation);
    //if move is legal and didn't cause any secondary effects...
    if (canMove !== originalLocation) {
      //check for effects of landing on new square
      let squareCheck = this.playerSquareCheck(canMove, direction);
      if (squareCheck == 'moved' || squareCheck == 'slide'){
        //update player location and new square
        this.handleUpdatePlayerLocation(originalLocation, canMove);
        //sprite: exit current square
        if (squareCheck == 'moved'){
          this.handleUpdateSprite(originalLocation, playerConsts.sprites.walk[direction], direction + "Exit");
        } else {
          this.handleUpdateSprite(originalLocation, playerConsts.sprites.stand[direction], direction + "Exit");
        }
        let spriteEnterTimer = setTimeout(() =>
          {this.handleUpdateSprite(originalLocation, '', '');
          if (squareCheck == 'moved'){
            this.handleUpdateSprite(canMove, playerConsts.sprites.walk[direction + '2'], direction + "Enter");
          } else {
            this.handleUpdateSprite(canMove, playerConsts.sprites.stand[direction], direction + "Enter");
          }},
          200
        );
        let spriteExitTimer = setTimeout(() =>
          {this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand[direction], '');
          if(squareCheck == 'slide') {
            this.move(direction);
            this.props.dispatch(playerModule.updatePlayerStatus('sliding'));
          } else {
            this.props.dispatch(playerModule.updatePlayerStatus('normal'));
          }},
          300
        );
      }
    } else {
      this.props.dispatch(playerModule.updatePlayerStatus('normal'));
    }
  }

  dash() {
    this.props.dispatch(playerModule.updatePlayerStatus('dash'));
    let direction = this.props.player.direction;
    let squareCheck;
    this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.dash[direction], direction + 'Exit');
    for (let i = 0; i < 3; i++) {
      //check if player can be knocked back in this direction
      let originalLocation = this.props.player.location;
      let canMove = this.attemptMove(direction, originalLocation);
      let last;
      let next;
      squareCheck = this.playerSquareCheck(canMove, direction);
      if (squareCheck == 'slide') {
        this.move(direction);
        break;
      } else if (squareCheck == 'fall') {
        this.handleUpdateSprite(canMove, playerConsts.sprites.dash[direction], direction + 'Enter');
      } else if (canMove !== originalLocation && squareCheck == 'moved') {
        //check for effects of landing on new square
        if (this.props.currentLevel[canMove].content == 'enemy') {
          let enemyId = this.props.currentLevel[canMove].contentId;
          this.handleEnemyDamage('dash', direction, this.props.currentLevel[canMove].contentId);
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
        this.props.dispatch(levelModule.updateSprite(originalLocation, playerConsts.sprites.dash[direction]));
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
    let newSprite = playerConsts.sprites.attack[this.props.player.direction];
    this.props.dispatch(levelModule.updateSprite(this.props.player.location, newSprite));
    let direction = this.props.player.direction;
    let playerLocation = this.props.player.location;
    let name = playerConsts.weapons[this.props.player.currentWeapon].name;
    let range = playerConsts.weapons[this.props.player.currentWeapon].range;
    let startPoint = this.attemptMove(direction, playerLocation);
    if (startPoint !== playerLocation) {
      if (this.props.currentLevel[startPoint].content == 'enemy') {
        this.handleEnemyDamage(name, direction, this.props.currentLevel[startPoint].contentId);
      } else {
        let newSprite = playerConsts.weapons[this.props.player.currentWeapon].sprites[direction];
        this.props.dispatch(levelModule.updateSprite(startPoint, newSprite));
        let projectileTimer = setTimeout(() =>
          this.handleProjectile(name, direction, startPoint, range, newSprite),
          100
        );
      }
    } else {
      alert('fizzz...')
    }
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));
  };

  knockBack(knockBackDirection) {
    let direction = this.props.player.direction;
    let newHealth = this.props.player.health -= 10;
    this.props.dispatch(playerModule.updatePlayerHealth(newHealth));
    this.playerHealthCheck();
    if (this.props.player.health > 0) {
      let originalLocation = this.props.player.location;
      //check if player can be knocked back in this direction
      let canMove = this.attemptMove(knockBackDirection, originalLocation);
      if (canMove !== originalLocation || this.props.currentLevel[canMove].value !== 'EX'){
        let squareCheck = this.playerSquareCheck(canMove, direction);
        if (squareCheck === 'moved' || squareCheck === 'slide'){
          this.handleUpdatePlayerLocation(originalLocation, canMove);
          this.handleUpdateSprite(originalLocation, playerConsts.sprites.knockback[direction], knockBackDirection + 'Exit');
            let spriteEnterTimer = setTimeout(() =>
              {this.handleUpdateSprite(originalLocation, '', '');
              this.handleUpdateSprite(canMove, playerConsts.sprites.knockback[direction], knockBackDirection + 'Enter')},
              200
            );
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
          }
        } else if (squareCheck !== 'fall') {
          //if player can't move back, just trigger animation in current square
          this.props.dispatch(levelModule.updateSprite(this.props.player.location, playerConsts.sprites.knockback[direction]));
        }
      }
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
      this.props.dispatch(levelModule.updateContent(playerLocation, []));
      this.handleUpdateSprite(playerLocation, '', '');
      //fall animation
      this.handleUpdateSprite(pitLocation, playerConsts.sprites.fall, direction+'Enter');
      //clear pit and restart player on respawn point
      let spriteClearTimer = setTimeout(() =>
        {this.handleUpdateSprite(pitLocation, '', '');
        this.respawn();},
        600
      );
    }
  }

  respawn(){
    this.props.dispatch(levelModule.updateSprite(this.props.game.respawnPoint, playerConsts.sprites.stand['south']));
    this.props.dispatch(playerModule.updatePlayerLocation(this.props.game.respawnPoint));
    this.props.dispatch(levelModule.updateContent(this.props.game.respawnPoint, ['player']));
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));
  }

  playerHealthCheck(){
    if (this.props.player.health <= 0) {
      this.handleChangeGameState('gameOver');
    }
  }

  //Handle Projectiles

  handleProjectile(name, direction, location, range, sprite) {
    if (this.props.game.gameState === 'active') {
      if (name == 'Cryostat') {
        this.laserLoop(name, direction, location, range, sprite);
      } else {
        this.projectileLoop(0, name, direction, location, range, sprite);
      }
    }
  };

  projectileLoop(i, name, direction, location, range, sprite) {
      let that = this;
      let canMove = this.attemptMove(direction, location);
      //void projectile if it can't progress
      if (location === canMove) {
        this.handleUpdateSprite(location, '', '');
        //damage enemy and void projectile if it hits
      } else if (this.props.currentLevel[canMove].content === 'enemy') {
        this.handleEnemyDamage(name, direction, this.props.currentLevel[canMove].contentId);
        this.handleUpdateSprite(location, '', '');
        //otherwise move the projectile
      } else {
        //update sprites
        this.handleUpdateSprite(location, '', '');
        this.handleUpdateSprite(canMove, sprite, direction + 'Enter');
        location = canMove;
        setTimeout(function() {
          i++;
          if (i < range) {
            that.projectileLoop(i, name, direction, location, range, sprite);
          }
        }, 200);
      }
      let projectileTimer = setTimeout(() =>
        this.handleUpdateSprite(location, '', ''),
        200
      );
    };

    laserLoop(name, direction, location, range, sprite) {
      let originalLocation = location;
      let next;
      this.handleUpdateSprite(originalLocation, sprite, '');
      for (let i = 0; i < range; i++) {
        //check if player can be knocked back in this direction
        let canMove = this.attemptMove(direction, originalLocation);
        let last;
        next = this.attemptMove(direction, canMove);
        if (canMove !== originalLocation) {
          //check for effects of landing on new square
          if (this.props.currentLevel[canMove].content[0] == 'enemy') {
            let enemyId = this.props.currentLevel[canMove].content[1];
            this.handleEnemyDamage(name, direction, this.props.currentLevel[canMove].contentId);
          } else {
            //update new square
            this.handleUpdateSprite(canMove, sprite, direction);
            last = originalLocation;
            originalLocation = canMove;
            let afterAfterImageTimer = setTimeout(() =>
              this.handleUpdateSprite(last, '', ''),
              800
            );
          }
        } else {
          this.handleUpdateSprite(originalLocation, '', '');
        }
      }
      let afterAfterImageTimer = setTimeout(() =>
        this.handleUpdateSprite(next, '', ''),
        200
      );
    }

//movement helper functions
  handleUpdatePlayerLocation(originalLocation, newLocation) {
    let previousContentArr =  this.props.currentLevel[originalLocation].content;
    let filteredContentArr = previousContentArr.filter(function(content) {
      return content[0] !== 'player';
    });
    this.props.dispatch(levelModule.updateContent(originalLocation, filteredContentArr));
    let newContentArr = this.props.currentLevel[newLocation].content;
    newContentArr.push(["player"]);
    this.props.dispatch(levelModule.updateContent(newLocation, newContentArr));
    this.props.dispatch(playerModule.updatePlayerLocation(newLocation));
  }

  handleUpdateSprite(location, sprite, direction) {
    this.props.dispatch(levelModule.updateSprite(location, sprite));
    this.props.dispatch(levelModule.updateTransition(location, direction));
  }

  //check if move is possible
  attemptMove(direction, originalLocation) {
    //get difference between two spaces
    let difference = helpers.getDifference(direction);
    //and new square id #
    let newLocation = originalLocation + difference;
    //check for pushable block
    if (this.props.currentLevel[newLocation].content[0] === 'block' && this.props.currentLevel[originalLocation].content[0] === 'player'){
      let blockMove = this.attemptMove(direction, newLocation);
      if (blockMove !== newLocation) {
        this.moveBlock(this.props.currentLevel[newLocation].content[1], direction, newLocation, newLocation + difference);
        return newLocation;
      } else {
        return originalLocation
      }
    //check if move is possible
  } else if (this.props.currentLevel[newLocation].content[0] !== 'block'
    && this.props.currentLevel[newLocation].value !== 'W'
    && this.props.currentLevel[newLocation].value !== 'LD') {
      return newLocation;
    } else {
      return originalLocation;
    }
  }

  //check for effects caused by landing on square
  playerSquareCheck(squareId, direction) {
    let squareToCheck = this.props.currentLevel[squareId];
    if ((squareToCheck.content[0] === 'enemy' && this.props.player.status !== 'dash') || squareToCheck.value == 'L') {
      let knockBackDirection = helpers.reverseDirection(direction);
      this.knockBack(knockBackDirection);
      return 'knockback';
      //switch levels
    } else if (squareToCheck.value == 'EX') {
      this.changeLevel(squareToCheck);
      return 'exit';
      //fall to your doom and respawn
    } else if (squareToCheck.value == 'P'){
      this.fall(squareId, direction);
      return 'fall';
    } else if (squareToCheck.value == 'I' && this.attemptMove(direction, squareId) !== squareId){
      return 'slide';
    } else if (squareToCheck.value == 'S') {
      this.handleSwitch(squareToCheck);
      return 'moved';
    } else if (squareToCheck.value == '$') {
      this.getCoin(squareId);
      return 'moved';
    } else if (squareToCheck.value == 'T'){
      return 'moved';
    } else {
      return 'moved';
    }
  }

  changeLevel(location) {
    let doorArr = location.content.find(function(content) {
      return content[0] == 'exit';
    });
    let newLevel = this.props.doors[doorArr[1]].leadsTo;
    let thisLevel = this.props.game.levelId;
    this.props.dispatch(gameModule.setPreviousLevelId(thisLevel));
    this.props.dispatch(gameModule.setLevelId(newLevel));
    this.generateLevelFromTemplate();
    this.handleChangeGameState("building");
  }

  getCoin(location){
    this.props.dispatch(playerModule.updateScore(this.props.player.score + 1));
    this.props.dispatch(levelModule.updateValue(location, '0', levelConsts.sprites.tile));
  }

  activateTerminal(location){
    let contentArr =  this.props.currentLevel[location].content;
    let terminalArr = contentArr.find(function(content) {
      return content[0] == 'terminal';
    });
    this.triggerDialogue(terminalArr[1])
  }

  triggerDialogue(textContent){
    this.props.dispatch(gameModule.setActiveText(textContent));
    this.props.dispatch(gameModule.changeGameState('dialogue'));
  }

  endDialogue() {
    this.props.dispatch(gameModule.setActiveText([]));
    this.props.dispatch(gameModule.changeGameState('active'));
  }

  handleSwitch(location) {
    this.props.dispatch(levelModule.updateValue(location.squareId, 'S', levelConsts.sprites['switchOn']));
    let switchArr = location.content.find(function(content) {
      return content[0] == 'switch';
    });
    let thisSwitch = this.props.switches[switchArr[1]]
    this.props.dispatch(switchesModule.pushSwitch(thisSwitch, true));
    let effectLocation = this.props.currentLevel[thisSwitch.effectLocation];
    let effectArr = effectLocation.content.find(function(content) {
      return content[0] == 'door';
    });
    if (effectArr == undefined) {
      effectArr = effectLocation.content.find(function(content) {
        return content[0] == 'platform';
      });
    }
    if (effectArr[0] == 'platform'){
      this.props.dispatch(platformsModule.activatePlatform(effectArr[1], true));
      this.platformStart(effectArr[1]);
      let switchTimer = setTimeout(() =>
        {this.props.dispatch(switchesModule.pushSwitch(thisSwitch.switchId, false));
        this.props.dispatch(levelModule.updateValue(location.squareId, 'S', levelConsts.sprites['switchOff']));
        this.props.dispatch(platformsModule.activatePlatform(effectArr[1], false));},
      thisSwitch.timer
      );
    } else if (effectArr[0] == 'door') {
      this.props.dispatch(doorsModule.openDoor(effectArr[1], true));
      let switchTimer = setTimeout(() =>
        {this.props.dispatch(switchesModule.pushSwitch(thisSwitch.switchId, false));
        this.props.dispatch(levelModule.updateValue(location.squareId, 'S', levelConsts.sprites['switchOff']));
        this.props.dispatch(doorsModule.openDoor(effectArr[1], false));},
      thisSwitch.timer
      );
    }
  }

  platformStart(platformId){
    let thisPlatform = this.props.platforms[platformId];
    let platformTimer = setInterval(() =>
      {if (thisPlatform.isActive == true){
        this.platformMove(platformId)
      } else {
        this.platformReturn(platformId)
      }},
      1000
      );
    }

  platformMove(platformId){
    if (this.props.game.gameState == 'active'){
      let platform = this.props.platforms[platformId];
      let originalLocation = platform.location;
      let canMove = this.attemptMove(platform.direction, originalLocation);
      if (canMove == originalLocation || this.props.currentLevel[canMove].value !== "P"){
        let newDirection = helpers.reverseDirection(platform.direction);
        this.props.dispatch(platformsModule.updatePlatformDirection(platform.platformId, newDirection));
      } else {
        this.handleUpdatePlatformLocation(platform.platformId, originalLocation, canMove);
      }
      if (canMove == platform.start){
        let newDirection = helpers.reverseDirection(platform.direction);
        this.props.dispatch(platformsModule.updatePlatformDirection(platform.platformId, newDirection));
      }
    }
  };

  handleUpdatePlatformLocation(platformId, originalLocation, newLocation){
    let platform = this.props.platforms[platformId];
    //set new tile images
    let image;
    if (platform.direction == 'north' || platform.direction == 'south') {
      image = levelConsts.sprites['platformOnNS'];
    } else {
      image = levelConsts.sprites['platformOnEW']
    }
    this.props.dispatch(levelModule.updateValue(originalLocation, 'P', ''));
    this.handleUpdateSprite(originalLocation, '', '');
    this.props.dispatch(levelModule.updateValue(newLocation, 'M', image));
    //remove ALL content from previous content array
    let contentArr = this.props.currentLevel[originalLocation].content;
    this.props.dispatch(levelModule.updateContent(originalLocation, []));
    //move ALL content to new content array
    this.props.dispatch(levelModule.updateContent(newLocation, contentArr));
    this.props.dispatch(platformsModule.updatePlatformLocation(platformId, newLocation));
    if (contentArr.length > 1) {
      this.resolvePlatformContent(newLocation, platform.direction);
    }
  }

  resolvePlatformContent(location, direction) {
    let content = this.props.currentLevel[location].content;
    let contentToUpdate = content.find(function(content){
      return content[0] == 'player';
    });
    if (contentToUpdate == undefined){
      contentToUpdate = content.find(function(content){
        return content[0] == 'block';
      });
    }
    let sprite;
    console.log(contentToUpdate)
    if (contentToUpdate[0] == 'player') {
      this.props.dispatch(playerModule.updatePlayerLocation(location));
      sprite = playerConsts.sprites.stand[this.props.player.direction];
    } else if (contentToUpdate[0] == 'block') {
      this.props.dispatch(blocksModule.updateBlockLocation(contentToUpdate[1], newLocation));
      sprite = levelConsts.sprites.block;
    }
    this.handleUpdateSprite(location, sprite, direction);
  }

//Handle Blocks
  moveBlock(blockId, direction, originalLocation, newLocation) {
    //move animation
    this.props.dispatch(levelModule.updateTransition(originalLocation, direction));
    //check properties of new square
    let blockCheck = this.props.currentLevel[newLocation];
    //if new square is a pit
    if (blockCheck.value == 'P') {
      this.props.dispatch(levelModule.updateContent(originalLocation, []));
      this.handleUpdateSprite(originalLocation, '', '');
      this.blockFall(blockId, newLocation, direction);
    //if new square is lava
  } else if (blockCheck.value == 'L') {
      this.props.dispatch(levelModule.updateContent(originalLocation, []));
      this.handleUpdateSprite(originalLocation, '', '');
      this.blockSink(blockId, newLocation, direction);
    //if new square is an enemy...
  } else if (blockCheck.content === 'enemy') {
        //...and the enemy is able to be pushed back
        if (this.attemptMove(direction, newLocation) !== newLocation) {
          this.enemyKnockBack(this.props.enemies[square.content[1]], direction);
        }
  } else {
      //update location
      this.props.dispatch(levelModule.updateContent(originalLocation, []));
      this.props.dispatch(levelModule.updateContent(newLocation, ['block', blockId]));
      this.props.dispatch(blocksModule.updateBlockLocation(blockId, newLocation));
      let spriteClearTimer = setTimeout(() =>
        {this.handleUpdateSprite(originalLocation, '', '');
        this.props.dispatch(levelModule.updateSprite(newLocation, levelConsts.sprites['block']))},
        120
      );
    }
  };

  blockFall(blockId, pitLocation, direction) {
    this.handleUpdateSprite(pitLocation, levelConsts.sprites['block'], direction);
    let spriteClearTimer = setTimeout(() =>
      {this.handleUpdateSprite(pitLocation, '', '');
      this.props.dispatch(blocksModule.nullBlock(blockId));},
      500
    );
  };

  blockSink(blockId, lavaLocation, direction) {
    this.props.dispatch(levelModule.updateSprite(lavaLocation, levelConsts.sprites['blockSink']));
    let spriteClearTimer = setTimeout(() =>
      {this.props.dispatch(levelModule.updateSprite(lavaLocation, ''));
      this.props.dispatch(blocksModule.nullBlock(blockId));
      this.props.dispatch(levelModule.updateValue(lavaLocation, 'L-sunk', levelConsts.sprites['tile']))},
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

  enemyMove(enemyId) {
    if (this.props.game.gameState === 'active' && this.props.enemies[enemyId].status == 'normal') {
      let enemy = this.props.enemies[enemyId];
      let enemyLocation = this.props.enemies[enemyId].location;
      if (enemy.kind === 'Slime') {
        this.moveRandom(enemyId, enemyLocation);
      } else if (enemy.kind === 'Robot') {
        this.moveVertical(enemyId, enemyLocation);
      } else if (enemy.kind === 'Alien') {
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
    this.props.dispatch(enemiesModule.updateEnemyDirection(enemyId, direction));
    this.props.dispatch(levelModule.updateSprite(currentLocation, this.props.enemies[enemyId].sprites.move[direction]));
    //check if move is legal, if not return original location
    let canMove = this.attemptMove(direction, currentLocation);
    if (canMove !== currentLocation && this.props.currentLevel[canMove].content !== 'enemy'
    && this.props.currentLevel[canMove].value !== 'L'
    && this.props.currentLevel[canMove].value !== 'P'
    && this.props.currentLevel[canMove].value !== 'EX'){
      //hurt player, but don't move if they can't be knocked back to another square
      if (this.props.currentLevel[canMove].content[0] == 'player') {
        this.knockBack(direction);
      } else {
        //update enemy location and new square
        this.handleUpdateEnemyLocation(enemyId, currentLocation, canMove);
        //start walk animation
        this.handleUpdateSprite(currentLocation, this.props.enemies[enemyId].sprites.move[direction], direction + 'Exit');
        let EnemyEnterTimer = setTimeout(() =>
          {this.handleUpdateSprite(currentLocation, '', '');
          this.handleUpdateSprite(canMove, this.props.enemies[enemyId].sprites.move[direction], direction + 'Enter');},
          200
        );
        //after walking animation finishes, remove sprite from previous square & add to new one
        let enemySpriteClearTimer = setTimeout(() =>
          this.handleUpdateSprite(this.props.enemies[enemyId].location, this.props.enemies[enemyId].sprites.move[direction], ''),
          200
        );
      }
    }
  }

  handleUpdateEnemyLocation(enemyId, originalLocation, newLocation) {
    let previousContentArr =  this.props.currentLevel[originalLocation].content;
    let filteredContentArr = previousContentArr.filter(function(content) {
      return content[1] !== enemyId;
    });
    this.props.dispatch(levelModule.updateContent(originalLocation, filteredContentArr));
    let newContentArr = this.props.currentLevel[newLocation].content;
    newContentArr.push(["enemy", enemyId]);
    this.props.dispatch(levelModule.updateContent(newLocation, newContentArr));
    this.props.dispatch(enemiesModule.updateEnemyLocation(enemyId, newLocation));
  }

  handleEnemyDamage(source, knockBackDirection, enemyId) {
    //if attack == dash
    if (source == 'dash') {
      if (this.props.enemies[enemyId].status == 'frozen') {
        this.killEnemy(enemyId);
      } else {
        this.props.dispatch(enemiesModule.updateEnemyHealth(enemyId, this.props.enemies[enemyId].health -= 10));
        this.enemyHealthCheck(enemyId);
        this.enemyKnockBack(knockBackDirection, enemyId);
      }
    //if attack == taser
    } else if (source == 'Taser Gun'){
      this.props.dispatch(enemiesModule.updateEnemyHealth(enemyId, this.props.enemies[enemyId].health -= 10));
      this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'shocked'));
      let statusTimer = setTimeout(() =>
        this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'normal')),
        600
      );
      this.enemyHealthCheck(enemyId);
      this.enemyKnockBack(knockBackDirection, enemyId);
    //if attack == cryostat
    } else if (source == 'Cryostat'){
      this.props.dispatch(enemiesModule.updateEnemyHealth(enemyId, this.props.enemies[enemyId].health -= 10));
      this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'frozen'));
      let statusTimer = setTimeout(() =>
        this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'normal')),
        10000
      );
      this.enemyHealthCheck(enemyId);
      this.enemyKnockBack(knockBackDirection, enemyId);
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
      this.props.dispatch(levelModule.updateContent(location, []));
      this.props.dispatch(enemiesModule.nullEnemy(enemyId));
      this.props.dispatch(levelModule.updateValue(location, '$', levelConsts.sprites['coin']));},
      600
    );
  }

  enemyKnockBack(knockBackDirection, enemyId) {
    let direction = this.props.enemies[enemyId].direction;
    //handle knockback (1-2 spaces)
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
      this.props.dispatch(levelModule.updateSprite(canMove, this.props.enemies[enemyId].sprites.knockback[direction]));
    }
  }

  // enemyFall() {
  //   let newSprite = this.props.enemies[enemyId].sprites.knockback[direction];
  //   dispatch(levelModule.updateSprite(location, newSprite));
  //   dispatch(levelModule.updateSpriteOut(location, this.props.player.direction));
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
      <div>
          <Route exact path='/' render={()=><Title handleStart={() => this.startGame()} menu={this.props.menu}/>}/>
          <Route exact path='/end' render={()=><End />} />
          <Route exact path='/game' render={()=><Game
            handleStart={() => this.startGame()}
            currentLevel={this.props.currentLevel}
            player={this.props.player}
            projectiles={this.props.projectiles}
            game={this.props.game}
            blocks={this.props.blocks}
            doors={this.props.doors}
            menu={this.props.menu}
            map={this.props.map}/>} />
      </div>
    );
  }
}

App.propTypes = {
  currentLevel: PropTypes.object,
  game: PropTypes.object,
  player: PropTypes.object,
  enemies: PropTypes.object,
  blocks: PropTypes.object,
  doors: PropTypes.object,
  menu: PropTypes.object,
  switches: PropTypes.object,
  platforms: PropTypes.object,
  map: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentLevel: state.currentLevel,
    game: state.game,
    player: state.player,
    enemies: state.enemies,
    blocks: state.blocks,
    doors: state.doors,
    menu: state.menu,
    switches: state.switches,
    platforms: state.platforms,
    map: state.map
  }
};

function mapDispatchToProps(dispatch) {
  return {
    blocksModule : bindActionCreators(blocksModule, dispatch),
    doorsModule : bindActionCreators(doorsModule, dispatch),
    enemiesModule : bindActionCreators(enemiesModule, dispatch),
    gameModule : bindActionCreators(gameModule, dispatch),
    levelModule : bindActionCreators(levelModule, dispatch),
    playerModule : bindActionCreators(playerModule, dispatch),
    menuModule : bindActionCreators(menuModule, dispatch),
    platformsModule : bindActionCreators(platformsModule, dispatch),
    switchesModule : bindActionCreators(switchesModule, dispatch),
    mapModule: bindActionCreators(mapModule, dispatch)
  }
};

export default withRouter(connect(mapStateToProps)(App));
