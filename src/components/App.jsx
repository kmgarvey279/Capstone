import React from "react";
import Title from "./Title";
import End from "./End";
import Game from "./Game";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import {bindActionCreators} from 'redux';
// import * as types from './../constants/ActionTypes';
// import * as actions from './../actions';

import * as blocksModule from './../redux/modules/blocks';
import * as doorsModule from './../redux/modules/doors';
import * as enemiesModule from './../redux/modules/enemies';
import * as gameModule from './../redux/modules/game';
import * as levelModule from './../redux/modules/level';
import * as playerModule from './../redux/modules/player';
import * as projectilesModule from './../redux/modules/projectiles';

import ice from '../assets/images/spacetest.gif';
import lava from '../assets/images/lava.gif';
import coin from '../assets/images/coin.png';
import wall from '../assets/images/wall.jpeg';
import tile from '../assets/images/tile.png';
import wallCorner1 from '../assets/images/level/wall-corner1.png';
import wallCorner2 from '../assets/images/level/wall-corner2.png';
import wallCorner3 from '../assets/images/level/wall-corner3.png';
import wallCorner4 from '../assets/images/level/wall-corner4.png';
import wallTop from '../assets/images/level/wall-top.png';
import wallBottom from '../assets/images/level/wall-bottom.png';
import wallLeft from '../assets/images/level/wall-left.png';
import wallRight from '../assets/images/level/wall-right.png';

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
    let cooldownTimer = setTimeout(() =>
      this.props.dispatch(playerModule.updatePlayerStatus('normal')),
      200
    );
    this.move("north")
    //move down
  } else if(event.keyCode === 40 && this.props.player.status =='normal' && this.props.game.gameState === 'active'){
    this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
    let cooldownTimer = setTimeout(() =>
      this.props.dispatch(playerModule.updatePlayerStatus('normal')),
      200
    );
    this.move("south")
    //move right
  } else if (event.keyCode === 39 && this.props.player.status =='normal' && this.props.game.gameState === 'active'){
    this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
    let cooldownTimer = setTimeout(() =>
      this.props.dispatch(playerModule.updatePlayerStatus('normal')),
      200
    );
    this.move("east")
    //move left
  } else if (event.keyCode === 37 && this.props.player.status =='normal' && this.props.game.gameState === 'active'){
    this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
    let cooldownTimer = setTimeout(() =>
      this.props.dispatch(playerModule.updatePlayerStatus('normal')),
      200
    );
    this.move("west")
    //attack!
  } else if (event.keyCode === 32) {
    if(this.props.game.gameState == 'title') {
      this.startGame();
      this.props.history.push("/game");
    } else if (this.props.game.gameState == 'active' && this.props.player.status =='normal'){
      this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
      let cooldownTimer = setTimeout(() =>
        this.props.dispatch(playerModule.updatePlayerStatus('normal')),
        200
      );
      let newSprite = this.props.player.sprites.attack[this.props.player.direction];
      this.props.dispatch(levelModule.updateSprite(this.props.player.location, newSprite));
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
      this.props.dispatch(playerModule.updatePlayerStatus('dash'));
      this.dash();
    //pause/unpause
  } else if (event.keyCode === 13) {
      if(this.props.game.gameState == 'title') {
        this.startGame();
      } else if (this.props.game.gameState == 'active' || this.props.game.gameState == 'paused') {
        this.pauseGame();
      }
    }
  }

//Change Level State
  startGame(){
    this.handleChangeGameState('active')
    this.generateLevelFromTemplate();
    this.props.history.push("/game");
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

//Create Levels
  generateLevelFromTemplate(){
    this.nullAll()
    let levelTransitionTimer = setTimeout(() =>
    {let levelTemplate = this.props.game.levelById[this.props.game.levelId];
    for(let i = 0; i < levelTemplate.length; i++){
      this.handleAddingSquareToLevel(i+1, levelTemplate[i]);
    }},
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
    this.props.dispatch(projectilesModule.nullAllProjectiles());
  }

  getTileDirection(thisSquareId) {
    if (thisSquareId == 1) {
      return 'northWest';
    } else if (thisSquareId === 133) {
      return 'southWest';
    } else if (thisSquareId === 12) {
      return 'northEast';
    } else if (thisSquareId === 144) {
      return 'southEast';
    } else if (thisSquareId %12 === 0) {
      return 'south';
    } else if (thisSquareId < 12) {
      return 'west';
    } else if (thisSquareId >= 131) {
      return 'east';
    } else if ((thisSquareId - 1) %12 === 0) {
      return 'north';
    } else {
      return 'other';
    }
  }

  handleAddingSquareToLevel(thisSquareId, squareArr) {
    let squareValue = squareArr[0];
    let squareImage;
    let content = 'empty';
    let contentId = '';
    let sprite = '';
    let transition = '';
    //create door
    if (squareValue == 'D') {
      content = 'door';
      contentId = squareArr[1];
      let doorDirection = this.getTileDirection(thisSquareId);
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
      this.props.dispatch(levelModule.addSquare(exit, 'EX', 'exit', squareArr[1], '', '', ''));
      //check if it's the door the player entered from, if so add player and set respawn point
      if (squareArr[2] == this.props.game.previousLevelId) {
        this.props.dispatch(gameModule.setRespawnPoint(thisSquareId));
        sprite = this.props.player.sprites.stand[this.reverseDirection(doorDirection)];
        content = 'player';
        this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
      }
      if (squareArr[3] == 'locked') {
        squareValue == 'LD'
        if (doorDirection == 'north') {
          squareImage = <img id="tile" src={tile} weight="50" height="50" />;
        } else if (doorDirection == 'west') {
          squareImage = <img id="tile" src={tile} weight="50" height="50" />;
        } else if (doorDirection == 'east') {
          squareImage = <img id="tile" src={tile} weight="50" height="50" />;
        } else if (doorDirection == 'south') {
          squareImage = <img id="tile" src={tile} weight="50" height="50" />;
        }
      } else {
        squareImage = <img id="tile" src={tile} weight="50" height="50" />;
      }
    //create lava
    } else if (squareValue == 'L') {
      squareImage = <img id="tile" src={lava} weight="50" height="50" />;
    //create pit
    } else if (squareValue == 'P') {
      squareImage = '';
    //create wall
    } else if (squareValue == 'W') {
      let wallType = this.getTileDirection(thisSquareId);
      if (wallType == 'northWest') {
        squareImage = <img id="tile" src={wallCorner1} weight="50" height="50" />
      } else if (wallType == 'northEast') {
        squareImage = <img id="tile" src={wallCorner3} weight="50" height="50" />;
      } else if (wallType == 'southWest') {
        squareImage = <img id="tile" src={wallCorner2} weight="50" height="50" />;
      } else if (wallType == 'southEast') {
        squareImage = <img id="tile" src={wallCorner4} weight="50" height="50" />;
      } else if (wallType == 'south') {
        squareImage = <img id="tile" src={wallBottom} weight="50" height="50" />;
      } else if (wallType == 'west') {
        squareImage = <img id="tile" src={wallLeft} weight="50" height="50" />;
      } else if (wallType == 'east') {
        squareImage = <img id="tile" src={wallRight} weight="50" height="50" />;
      } else if (wallType == 'north') {
        squareImage = <img id="tile" src={wallTop} weight="50" height="50" />;
      } else {
        squareImage = <img id="tile" src={wall} weight="50" height="50" />;
      }
    //create empty tile
    } else if (squareValue == '$') {
      squareImage = <img id="tile" src={coin} weight="50" height="50" />;
    } else if (squareValue == 'I') {
      squareImage = <img id="tile" src={ice} weight="50" height="50" />;
    } else {
      squareImage = <img id="tile" src={tile} weight="50" height="50" />;
    }
    //spawn enemy
    if (squareValue == 'E') {
      let newEnemyId = this.handleCreateNewEnemy(thisSquareId, squareArr[1]);
      sprite = this.props.enemies[newEnemyId].sprites.move['south'];
      content =  'enemy';
      contentId = newEnemyId;
    }
    //spawn block
    if (squareValue == 'B') {
      sprite = this.props.game.miscSprites['block'];
      content = 'block';
      contentId = v4();
      this.props.dispatch(blocksModule.createBlock(contentId));
    }
    this.props.dispatch(levelModule.addSquare(thisSquareId, squareValue, content, contentId, squareImage, sprite, transition));
  }


//Handle Movement
  move(direction){
    let originalLocation = this.props.player.location;
    //direction always updates
    this.props.dispatch(playerModule.updatePlayerDirection(direction));
    this.props.dispatch(levelModule.updateSprite(originalLocation, this.props.player.sprites.stand[direction]));
    //check if move is legal, if not return original location
    let canMove = this.attemptMove(direction, originalLocation);
    //if move is legal and didn't cause any secondary effects...
    if (canMove !== originalLocation) {
      //check for effects of landing on new square
      let squareCheck = this.playerSquareCheck(canMove, direction);
      if (squareCheck == 'moved' || squareCheck == 'slide'){
        //update player location and new square
        this.handleUpdatePlayerLocation(originalLocation, canMove);
        if (direction == 'south' || direction == 'east'){
          //square content !== player
          this.handleUpdateSprite(originalLocation, '', '');
          //start walk animation
          this.handleUpdateSprite(canMove, this.props.player.sprites.walk[direction], direction);
          //after walking animation finishes, remove sprite from previous square & add to new one
          let spriteClearTimer = setTimeout(() =>
            {this.props.dispatch(levelModule.updateSprite(this.props.player.location, this.props.player.sprites.stand[direction]))
            if(squareCheck == 'slide') {
              this.move(direction);
            } else {
              this.props.dispatch(playerModule.updatePlayerStatus('normal'));
            }},
            200
          );
        } else if (direction == 'north' || direction == 'west') {
          //start walk animation
          this.handleUpdateSprite(originalLocation, this.props.player.sprites.walk[direction], direction);
          //after walking animation finishes, remove sprite from previous square & add to new one
          let spriteClearTimer = setTimeout(() =>
            {this.handleUpdateSprite(originalLocation, '', '');
            this.props.dispatch(levelModule.updateSprite(this.props.player.location, this.props.player.sprites.stand[direction]))
            if(squareCheck == 'slide') {
              this.move(direction);
            } else {
              this.props.dispatch(playerModule.updatePlayerStatus('normal'));
            }},
            200
          );
        }
      }
    }
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));
  }

  dash() {
    let direction = this.props.player.direction;
    for (let i = 0; i < 3; i++) {
      //check if player can be knocked back in this direction
      let originalLocation = this.props.player.location;
      let canMove = this.attemptMove(direction, originalLocation);
      let next = this.attemptMove(direction, canMove);
      if (canMove !== location) {
        //check for effects of landing on new square
        let squareCheck = this.playerSquareCheck(canMove, direction);
        if (this.props.currentLevel[canMove].content == 'enemy') {
          let enemyId = this.props.currentLevel[canMove].contentId;
          this.enemyKnockBack(direction, enemyId);
        } else if (squareCheck = 'moved' || squareCheck == 'slide'){
          //update player and new square
          this.handleUpdatePlayerLocation(originalLocation, canMove);
          this.handleUpdateSprite(canMove, this.props.player.sprites.walk[direction], direction);
          let afterImageTimer = setTimeout(() =>
            this.handleUpdateSprite(originalLocation, '', ''),
            300
          );
          if(squareCheck == 'slide') {
            this.move(direction)
          }
        } else {
          //if player can't move, just trigger animation in current square
          this.props.dispatch(levelModule.updateSprite(this.props.player.location, this.props.player.sprites.walk[direction]));
        }
      }
    }
    let spriteClearTimer = setTimeout(() =>
      {this.props.dispatch(levelModule.updateSprite(this.props.player.location, this.props.player.sprites.stand[direction]))
      this.props.dispatch(playerModule.updatePlayerStatus('normal'))},
      600
    );
  }

  knockBack(knockBackDirection) {
    let direction = this.props.player.direction;
    let newHealth = this.props.player.health -= 10;
    this.props.dispatch(playerModule.updatePlayerHealth(newHealth));
    //handle knockback (1-2 spaces)
    for (let i = 0; i < 1; i++) {
      let originalLocation = this.props.player.location;
      //check if player can be knocked back in this direction
      let canMove = this.attemptMove(knockBackDirection, originalLocation)
      if (canMove !== location) {
        //check for effects of landing on new square
        let squareCheck = this.playerSquareCheck(canMove, direction);
        if (squareCheck === 'moved'){
          //clear previous square
          this.handleUpdatePlayerLocation(originalLocation, canMove)
          this.handleUpdateSprite(originalLocation, '', '');
          //update player and new square
          this.handleUpdateSprite(canMove, this.props.player.sprites.knockback[direction], knockBackDirection);
        } else {
          //if player can't move back, just trigger animation in current square
          this.props.dispatch(levelModule.updateSprite(canMove, this.props.player.sprites.knockback[direction]));
        }
      }
      let spriteClearTimer = setTimeout(() =>
        this.props.dispatch(levelModule.updateSprite(this.props.player.location, this.props.player.sprites.stand[direction])),
        400
      );
    }
  }

  fall(pitLocation, direction) {
    this.handleChangeGameState("cutscene");
    let playerLocation = this.props.player.location;
    //take damage
    let newHealth = this.props.player.health -= 10;
    this.props.dispatch(playerModule.updatePlayerHealth(newHealth));
    //clear player from previous square
    this.props.dispatch(levelModule.updateContent(playerLocation, 'empty', ''))
    this.handleUpdateSprite(playerLocation, '', '');
    //fall animation
    this.handleUpdateSprite(pitLocation, this.props.player.sprites.fall, direction);
    //clear pit and restart player on respawn point
    let spriteClearTimer = setTimeout(() =>
      {this.handleUpdateSprite(pitLocation, '', '');
      this.props.dispatch(levelModule.updateSprite(this.props.game.respawnPoint, this.props.player.sprites.stand[direction]));
      this.props.dispatch(playerModule.updatePlayerLocation(this.props.game.respawnPoint));
      this.props.dispatch(levelModule.updateContent(this.props.game.respawnPoint, 'player', ''));
      this.handleChangeGameState("active");},
      600
    );
  }

//movement helper functions

  handleUpdatePlayerLocation(originalLocation, newLocation) {
    this.props.dispatch(levelModule.updateContent(originalLocation, 'empty', ''));
    this.props.dispatch(levelModule.updateContent(newLocation, 'player', ''));
    this.props.dispatch(playerModule.updatePlayerLocation(newLocation));
  }

  handleUpdateSprite(location, sprite, direction) {
    this.props.dispatch(levelModule.updateSprite(location, sprite));
    this.props.dispatch(levelModule.updateTransition(location, location));
  }

  //check if move is possible
  attemptMove(direction, originalLocation) {
    //get difference between two spaces
    let difference = this.getDifference(direction);
    //and new square id #
    let newLocation = originalLocation + difference;
    //check for pushable block
    if (this.props.currentLevel[newLocation].content === 'block' && this.props.currentLevel[originalLocation].content === 'player'){
      let blockMove = this.attemptMove(direction, newLocation + difference);
      if (blockMove !== newLocation) {
        this.moveBlock(this.props.currentLevel[newLocation].contentId, direction, newLocation, newLocation + difference);
        return newLocation;
      } else {
        return originalLocation
      }
    //check if move is possible
    } else if (this.props.currentLevel[newLocation].content !== 'block'
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
    //take damage + knockback if not invincible
    if ((squareToCheck.content === 'enemy' && this.props.player.status !== 'dash') || squareToCheck.content === 'projectile' || squareToCheck.value == 'L') {
      let knockBackDirection = this.reverseDirection(direction);
      this.knockBack(knockBackDirection);
      //switch levels
    } else if (squareToCheck.value == 'EX') {
      let newLevel = this.props.doors[squareToCheck.contentId].leadsTo;
      let thisLevel = this.props.game.levelId;
      this.props.dispatch(gameModule.setPreviousLevelId(thisLevel));
      this.props.dispatch(gameModule.setLevelId(newLevel));
      this.generateLevelFromTemplate();
      //fall to your doom and respawn
    } else if (squareToCheck.value == 'P' && this.props.player.status !== 'dash'){
      this.fall(squareId, direction);
    } else if (squareToCheck.value == 'I' && this.attemptMove(direction, squareId) !== squareId){
      return 'slide';
    } else if (squareToCheck.value == '$') {
      this.props.dispatch(playerModule.updateScore(this.props.player.score + 1));
      return 'moved';
    } else {
      //move to square as normal
      return 'moved';
    }
  }

  getDifference(direction) {
    if(direction == 'north') {
      return -1;
    } else if (direction == 'east') {
      return  12;
    } else if (direction == 'south') {
      return  1;
    } else {
      return  -12
    }
  }

  reverseDirection(direction) {
    if (direction == 'north') {
      return 'south';
    } else if (direction == 'south') {
      return 'north';
    } else if (direction == 'east') {
      return 'west';
    } else {
      return 'east';
    }
  }

//Handle Blocks
  moveBlock(blockId, direction, originalLocation, newLocation) {
    //move animation
    this.props.dispatch(levelModule.updateTransition(originalLocation, direction));
    //check properties of new square
    let blockCheck = this.props.currentLevel[newLocation];
    //if new square is a pit
    if (blockCheck.value == 'P') {
      this.props.dispatch(levelModule.updateContent(originalLocation, 'empty', ''));
      this.handleUpdateSprite(originalLocation, '', '');
      this.blockFall(blockId, newLocation, direction);
    //if new square is lava
  } else if (blockCheck.value == 'L') {
      this.props.dispatch(levelModule.updateContent(originalLocation, 'empty', ''));
      this.handleUpdateSprite(originalLocation, '', '');
      this.blockSink(blockId, newLocation, direction);
    //if new square is an enemy...
  } else if (blockCheck.content === 'enemy') {
        //...and the enemy is able to be pushed back
        if (this.attemptMove(direction, newLocation) !== newLocation) {
          this.enemyKnockBack(this.props.enemies[square.contentId], direction);
        //...if it can't be pushed back
        } else {
          alert("stuck");
        }
  } else {
      //update location
      this.props.dispatch(levelModule.updateContent(originalLocation, 'empty', ''));
      this.props.dispatch(levelModule.updateContent(newLocation, 'block', blockId));
      this.props.dispatch(blocksModule.updateBlockLocation(blockId, newLocation));
      let spriteClearTimer = setTimeout(() =>
        {this.handleUpdateSprite(originalLocation, '', '');
        this.props.dispatch(levelModule.updateSprite(newLocation, this.props.game.miscSprites['block']))},
        120
      );
    }
  };

  blockFall(blockId, pitLocation, direction) {
    this.handleUpdateSprite(pitLocation, this.props.game.miscSprites['block'], direction);
    let spriteClearTimer = setTimeout(() =>
      {this.handleUpdateSprite(pitLocation, '', '');
      this.props.dispatch(blocksModule.nullBlock(blockId));},
      500
    );
  };

  blockSink(blockId, lavaLocation, direction) {
    this.props.dispatch(levelModule.updateSprite(lavaLocation, this.props.game.miscSprites['blockSink']));
    let spriteClearTimer = setTimeout(() =>
      {this.props.dispatch(levelModule.updateSprite(lavaLocation, ''));
      this.props.dispatch(blocksModule.nullBlock(blockId));
      this.props.dispatch(levelModule.updateValue(lavaLocation, 'L-sunk', <img id="tile" src={tile} weight="50" height="50" />))},
      800
    );
  };

//Handle Enemies
  handleCreateNewEnemy(locationId, enemyListId) {
    let thisEnemy = this.props.game.enemyById[enemyListId];
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
    let playerNear = this.checkForPlayer(currentLocation);
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
    this.props.dispatch(enemiesModule.updateEnemyDirection(enemyId, direction));
    this.props.dispatch(levelModule.updateSprite(currentLocation, this.props.enemies[enemyId].sprites.move[direction]));
    //check if move is legal, if not return original location
    let canMove = this.attemptMove(direction, currentLocation);
    if (canMove !== currentLocation && this.props.currentLevel[canMove].content !== 'enemy'
    && this.props.currentLevel[canMove].value !== 'L'
    && this.props.currentLevel[canMove].value !== 'P'){
      //hurt player, but don't move if they can't be knocked back to another square
      if (this.props.currentLevel[canMove].content == 'player' && this.attemptMove(direction, canMove) == canMove) {
        this.knockBack(direction);
      } else {
        if (this.props.currentLevel[canMove].content == 'player') {
          this.knockBack(direction);
        }
        //update enemy location and new square
        this.handleUpdateEnemyLocation(enemyId, currentLocation, canMove);
        if (direction == 'south' || direction =='east') {
          //clear original location sprite
          this.handleUpdateSprite(currentLocation, '', '');
          //start walk animation
          this.handleUpdateSprite(canMove, this.props.enemies[enemyId].sprites.move[direction], direction);
        //after walking animation finishes, remove sprite from previous square & add to new one
          let enemySpriteClearTimer = setTimeout(() =>
            this.props.dispatch(levelModule.updateSprite(this.props.enemies[enemyId].location, this.props.enemies[enemyId].sprites.move[direction])),
            200
          );
        } else if (direction == 'north' || direction == 'west') {
          //start walk animation
          this.handleUpdateSprite(currentLocation, this.props.enemies[enemyId].sprites.move[direction], direction);
          //after walking animation finishes, remove sprite from previous square & add to new one
          let spriteClearTimer = setTimeout(() =>
            {this.handleUpdateSprite(currentLocation, '', '');
            this.props.dispatch(levelModule.updateSprite(this.props.enemies[enemyId].location, this.props.enemies[enemyId].sprites.move[direction]));},
            200
          );
        }
      }
    }
  }

  handleUpdateEnemyLocation(enemyId, originalLocation, newLocation) {
    this.props.dispatch(levelModule.updateContent(originalLocation, 'empty', ''));
    this.props.dispatch(levelModule.updateContent(newLocation, 'enemy', enemyId));
    this.props.dispatch(enemiesModule.updateEnemyLocation(enemyId, newLocation));
  }

  enemyKnockBack(knockBackDirection, enemyId) {
    let direction = this.props.enemies[enemyId].direction;
    //take damage + dizzy effect
    let newHealth = this.props.enemies[enemyId].health -= 10;
    this.props.dispatch(enemiesModule.updateEnemyHealth(enemyId, newHealth));
    if (this.props.player.weapons[this.props.player.currentWeapon].name == 'Taser Gun'){
      this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'shocked'));
      let statusTimer = setTimeout(() =>
        this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'normal')),
        600
      );
    } else if (this.props.player.weapons[this.props.player.currentWeapon].name == 'Cryostat'){
      this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'frozen'));
      let statusTimer = setTimeout(() =>
        this.props.dispatch(enemiesModule.updateEnemyStatus(enemyId, 'normal')),
        10000
      );
    }
    //handle knockback (1-2 spaces)
    for (let i = 0; i < 2; i++) {
      let originalLocation = this.props.enemies[enemyId].location;
      let canMove = this.attemptMove(knockBackDirection, originalLocation);
      if (canMove !== location) {
        //update enemy and new square
        this.handleUpdateEnemyLocation(enemyId, originalLocation, canMove);
        this.handleUpdateSprite(originalLocation, '', '');
        this.handleUpdateSprite(canMove, this.props.enemies[enemyId].sprites.knockback[direction], knockBackDirection);
      } else {
        //if enemy can't move back, just trigger animation in current square
        this.props.dispatch(levelModule.updateSprite(canMove, this.props.enemies[enemyId].sprites.knockback[direction]));
      }
      let enemySpriteClearTimer = setTimeout(() =>
        this.props.dispatch(levelModule.updateSprite(this.props.enemies[enemyId].location, this.props.enemies[enemyId].sprites.move[direction])),
        600
      );
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

  checkForPlayer(location) {
    //check if player is on neighboring square
    let playerLocation = this.props.player.location
    if (location - 1 === playerLocation) {
      return 'north'
    } else if (location + 12 == playerLocation) {
      return 'east';
    } else if (location + 1 == playerLocation) {
      return 'south';
    } else if (location -12 == playerLocation) {
      return 'west';
    } else {
      return false;
    }
  }

//Handle Projectiles

  attack() {
    let direction = this.props.player.direction;
    let playerLocation = this.props.player.location;
    let range = this.props.player.weapons[this.props.player.currentWeapon].range;
    let startPoint = this.attemptMove(direction, playerLocation);
    if (startPoint !== playerLocation) {
      if (this.props.currentLevel[startPoint].content == 'enemy') {
        this.enemyKnockBack(direction, this.props.currentLevel[startPoint].contentId);
      } else {
        let newSprite = this.props.player.weapons[this.props.player.currentWeapon].sprites[direction];
        this.props.dispatch(levelModule.updateSprite(startPoint, newSprite));
        let projectileTimer = setTimeout(() =>
          this.handleProjectile(direction, startPoint, range, newSprite),
          100
        );
      }
    } else {
      alert('fizzz...')
    }
  };

  handleProjectile(direction, location, range, sprite) {
    if (this.props.game.gameState === 'active') {
      this.projectileLoop(0, direction, location, range, sprite);
    }
  };

  projectileLoop(i, direction, location, range, sprite) {
      let that = this;
      let canMove = this.attemptMove(direction, location);
      //void projectile if it can't progress
      if (location === canMove) {
        this.handleUpdateSprite(location, '', '');
        alert("fizzzz");
        //damage enemy and void projectile if it hits
      } else if (this.props.currentLevel[canMove].content === 'enemy') {
        this.enemyKnockBack(direction, this.props.currentLevel[canMove].contentId);
        this.handleUpdateSprite(location, '', '');
        alert("hit!");
        //otherwise move the projectile
      } else {
        //update sprites
        this.handleUpdateSprite(location, '', '');
        this.handleUpdateSprite(canMove, sprite, direction);
        location = canMove;
        setTimeout(function() {
          i++;
          if (i < range) {
            that.projectileLoop(i, direction, location, range, sprite);
          }
        }, 100);
      }
      let projectileTimer = setTimeout(() =>
        this.handleUpdateSprite(location, '', ''),
        100
      );
    };

  render(){
    return (
      <div>
          <Route exact path='/' render={()=><Title onStartClick={() => this.handleStartButtonClick()}/>} />
          <Route exact path='/end' render={()=><End />} />
          <Route exact path='/game' render={()=><Game
            currentLevel={this.props.currentLevel}
            player={this.props.player}
            projectiles={this.props.projectiles}
            game={this.props.game}
            blocks={this.props.blocks}
            doors={this.props.doors} />} />
      </div>
    );
  }
}

App.propTypes = {
  currentLevel: PropTypes.object,
  game: PropTypes.object,
  player: PropTypes.object,
  projectiles: PropTypes.object,
  enemies: PropTypes.object,
  blocks: PropTypes.object,
  doors: PropTypes.object
};

const mapStateToProps = state => {
  return {
    currentLevel: state.currentLevel,
    game: state.game,
    player: state.player,
    projectiles: state.projectiles,
    enemies: state.enemies,
    blocks: state.blocks,
    doors: state.doors
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
    projectilesModule : bindActionCreators(projectileModule, dispatch)
  }
};


export default withRouter(connect(mapStateToProps)(App));
