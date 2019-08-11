import React from "react";
import Title from "../Title/Title";
import End from "../End/End";
import Game from "../Game/Game";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import {bindActionCreators} from 'redux';

import * as blocksModule from '../../redux/modules/blocks';
import * as doorsModule from '../../redux/modules/doors';
import * as enemiesModule from '../../redux/modules/enemies/enemies';
import * as gameModule from '../../redux/modules/game';
import * as roomModule from '../../redux/modules/rooms/room';
import * as playerModule from '../../redux/modules/player/player';
import * as switchesModule from '../../redux/modules/switches';
import * as platformsModule from '../../redux/modules/platforms';
import * as mapsModule from '../../redux/modules/map';

import logs from '../../text/logs.jsx';
import examine from '../../text/examine.jsx';

import * as playerConsts from '../../redux/modules/player/playerConstants';
import * as enemyConsts from '../../redux/modules/enemies/enemyConstants';
import * as roomConsts from '../../redux/modules/rooms/roomConstants';
import * as helpers from './helperFunctions';

class App extends React.Component {

  constructor(props) {
    super(props);
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
    }
  }

  onKeyDown(event){
    //move up
    if(event.keyCode === 38 && this.props.player.status =='normal' && this.props.game.gameState === 'active'){
      this.props.dispatch(gameModule.toggleNorth(true));
      //move down
    } else if(event.keyCode === 40 && this.props.player.status =='normal' && this.props.game.gameState === 'active'){
      this.props.dispatch(gameModule.toggleSouth(true));
      //move right
    } else if (event.keyCode === 39 && this.props.player.status =='normal' && this.props.game.gameState === 'active'){
      this.props.dispatch(gameModule.toggleEast(true));
      //move left
    } else if (event.keyCode === 37  && this.props.player.status =='normal' && this.props.game.gameState === 'active'){
      this.props.dispatch(gameModule.toggleWest(true));
      //attack!
    } else if (event.keyCode === 32 && this.props.game.gameState == 'active' && this.props.player.status =='normal') {
      let contentArr =  this.props.currentRoom[this.props.player.location].content;
      let interactArr = contentArr.find(function(content) {
        return content[0] == 'interact';
      });
      if (interactArr !== undefined) {
        this.triggerDialogue(interactArr);
      } else if (this.props.game.bulletCount < 4) {
        this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
        this.attack();
      }
      //change selected weapon
    } else if (event.keyCode === 16 && this.props.game.gameState == 'active') {
        let newWeaponId;
        if (this.props.player.currentWeapon < this.props.player.weapons.length) {
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
    } else if (event.keyCode === 90 && this.props.player.status =='normal' && this.props.game.gameState === 'active'){
      this.props.dispatch(playerModule.updatePlayerStatus('cooldown'));
      this.punch();
    }
  }

  onKeyUp(event){
    if (event.keyCode == 37) {
      this.props.dispatch(gameModule.toggleWest(false));
    }
    if (event.keyCode == 39) {
      this.props.dispatch(gameModule.toggleEast(false));
    }
    if (event.keyCode == 38) {
      this.props.dispatch(gameModule.toggleNorth(false));
    }
    if (event.keyCode == 40) {
      this.props.dispatch(gameModule.toggleSouth(false));
    }
  }

//Change Room State
  startGame(){
    this.handleChangeGameState('active')
    this.generateMapFromTemplate();
    this.generateRoomFromTemplate();
    let gameLoopInterval = setInterval(() =>
      this.gameLoop(),
    150
    );
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
    let mapsTemplate = roomConsts.maps[1];
    for(let i = 0; i < mapsTemplate.length; i++){
      this.props.dispatch(mapsModule.addMapSquare(i, mapsTemplate[i]));
    }
  }

//Create Rooms
  generateRoomFromTemplate(){
    this.nullAll();
    let roomTemplate = roomConsts.rooms[this.props.game.roomId];
    for(let i = 0; i < roomTemplate.length; i++){
      this.handleAddingSquareToRoom(i+1, roomTemplate[i]);
    }
    this.setAlerts();
    let roomTransitionTimer = setTimeout(() =>
    {this.handleChangeGameState("active");
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));},
      600
    );
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
      this.props.dispatch(roomModule.updateContent(square.squareId + 1, [text]));
      this.props.dispatch(roomModule.toggleAlert(square.squareId + 1, true));
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
        let contentArr = this.props.currentRoom[square.squareId - 12].content;
        contentArr.push(['doorTrigger', door.doorId]);
        this.props.dispatch(roomModule.updateContent(square.squareId - 12, contentArr));
      } else if (door.direction == 'south') {
        let contentArr = this.props.currentRoom[square.squareId - 1].content;
        contentArr.push(['doorTrigger', door.doorId]);
        this.props.dispatch(roomModule.updateContent(square.squareId - 1, contentArr));
      } else if (door.direction == 'west') {
        let contentArr = this.props.currentRoom[square.squareId + 12].content;
        contentArr.push(['doorTrigger', door.doorId]);
        this.props.dispatch(roomModule.updateContent(square.squareId + 12, contentArr));
      }
    });
  }


  nullAll() {
    this.props.dispatch(roomModule.nullRoom());
    for(let i = 0; i < this.props.game.enemyTimers.length; i++) {
      clearInterval(this.props.game.enemyTimers[i]);
    }
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
    //create door
    if (this.props.game.previousRoomId == null && squareValue == '1') {
      this.props.dispatch(gameModule.setRespawnPoint(thisSquareId));
      sprite = playerConsts.sprites.stand['south'];
      content.push(['player']);
      this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
      squareImage = roomConsts.sprites['tile'];
    } else if (squareValue == 'D') {
      content.push(['door', squareArr[1]]);
      //check if door exists in state, if not, create it
      if (!this.props.doors.hasOwnProperty(squareArr[1])) {
        //id, location, leadsTo, locked/open, direction
        this.props.dispatch(doorsModule.createDoor(squareArr[1], thisSquareId, squareArr[2], 'closed', squareArr[3], squareArr[4]));
      }
      //check if it's the door the player entered from, if so add player and set respawn point
      if (squareArr[2] == this.props.game.previousRoomId) {
        this.props.dispatch(gameModule.setRespawnPoint(thisSquareId));
        sprite = playerConsts.sprites.stand[helpers.reverseDirection(doorDirection)];
        content.push(['player']);
        this.props.dispatch(playerModule.updatePlayerLocation(thisSquareId));
      }
      squareImage = roomConsts.sprites['tile'];
    //create lava
    } else if (squareValue == 'L') {
      squareImage = roomConsts.sprites['lava'];
    //create pit
    } else if (squareValue == 'P') {
      squareImage = '';
    //create wall
    } else if (squareValue == 'W') {
      let wallType = squareArr[1];
      if (wallType == 'northWest') {
        squareImage = roomConsts.sprites['wallCorner1'];
      } else if (wallType == 'southWest') {
        squareImage = roomConsts.sprites['wallCorner3'];
      } else if (wallType == 'northEast') {
        squareImage = roomConsts.sprites['wallCorner2'];
      } else if (wallType == 'southEast') {
        squareImage = roomConsts.sprites['wallCorner4'];
      } else if (wallType == 'south') {
        squareImage = roomConsts.sprites['wallBottom'];
      } else if (wallType == 'west') {
        squareImage = roomConsts.sprites['wallLeft'];
      } else if (wallType == 'east') {
        squareImage = roomConsts.sprites['wallRight'];
      } else if (wallType == 'north') {
        squareImage = roomConsts.sprites['wallTop'];
      } else {
        squareImage = roomConsts.sprites['wall'];
      }
    //create coin tile
    } else if (squareValue == '$') {
      squareImage = roomConsts.sprites['coin'];
    //create ice tile
    } else if (squareValue == 'I') {
      squareImage = roomConsts.sprites['ice'];
    //create moving tile
  } else if (squareValue == 'M') {
      let contentId = v4();
      content.push(['platform', contentId]);
      let direction = squareArr[1];
      if (direction == 'north' || direction == 'south'){
        squareImage = squareImage = roomConsts.sprites['platformOffNS'];
      } else {
        squareImage = roomConsts.sprites['platformOffEW'];
      }
      this.props.dispatch(platformsModule.createPlatform(contentId, thisSquareId, thisSquareId, direction, false));
    //spawn switch
    } else if (squareValue == 'S') {
      squareImage = roomConsts.sprites['switchOff'];
      let contentId = v4();
      content.push(['switch', contentId]);
      this.props.dispatch(switchesModule.createSwitch(contentId, thisSquareId, false, squareArr[1], squareArr[2]));
    } else if (squareValue == 'T'){
      let type = squareArr[1];
      if (type == 'terminal') {
        squareImage = roomConsts.sprites[type];
        content.push(['interact', logs[squareArr[2]]]);
      } else {
        squareImage = roomConsts.sprites['tile'];
        sprite = roomConsts.sprites[type];
        content.push(['interact', examine[type]]);
      }
    } else {
      squareImage = roomConsts.sprites['tile'];
    }
    //spawn enemy
    if (squareValue == 'E') {
      let newEnemyId = this.handleCreateNewEnemy(thisSquareId, squareArr[1]);
      sprite = this.props.enemies[newEnemyId].sprites.move['south'];
      content.push(['enemy', newEnemyId]);
    }
    //spawn block
    if (squareValue == 'B') {
      sprite = roomConsts.sprites['block'];
      let contentId = v4();
      content.push(['block', contentId]);
      this.props.dispatch(blocksModule.createBlock(contentId, thisSquareId));
    }
    this.props.dispatch(roomModule.addSquare(thisSquareId, squareValue, content, squareImage, sprite, transition, alert));
  }

//Handle Movement
  move(direction, originalLocation){
    if (this.doorCheck(direction, originalLocation) !== 'exit') {
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
        this.handleUpdateSprite(originalLocation, playerConsts.sprites.walk[direction], direction + "Exit");
          this.handleUpdatePlayerLocation(originalLocation, canMove);
          this.handleUpdateSprite(originalLocation, '', '');
          if (squareCheck == 'moved'){
            this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.walk[direction + '2'], direction + "Enter");
          } else {
            this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand[direction], direction + "Enter");
          }
          let spriteExitTimer = setTimeout(() =>
            {this.handleUpdateSprite(this.props.player.location, playerConsts.sprites.stand[direction], '');
            if(squareCheck == 'slide') {
              this.move(direction, this.props.player.location);
              this.props.dispatch(playerModule.updatePlayerStatus('sliding'));
            } else {
              this.props.dispatch(playerModule.updatePlayerStatus('normal'));
            }},
            150
          );
        }
      } else {
        this.props.dispatch(playerModule.updatePlayerStatus('normal'));
      }
    }
  }

  doorCheck(direction, location){
    if (this.props.currentRoom[location].value == 'D'){
      let content = this.props.currentRoom[location].content.find(function(content) {
        return content[0] == 'door';
      });
      let door = this.props.doors[content[1]];
      if (direction == door.direction) {
        this.changeRoom(door);
        return 'exit';
      }
    }
  };

  dash() {
    this.props.dispatch(playerModule.updatePlayerStatus('dash'));
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

  punch(){
    let location = this.props.player.location;
    let direction = this.props.player.direction;
    this.handleUpdateSprite(location, playerConsts.sprites.punch[direction], '');
    let startPoint = this.attemptMove(direction, location);
    if (startPoint !== location) {
      let punchTimer = setTimeout(() =>
        this.handleUpdateSprite(startPoint, playerConsts.sprites.punchImpact, ''),
        300
      );
      let hasEnemy = this.props.currentRoom[startPoint].content.find(function(content) {
        return content[0] == 'enemy';
      });
      if (hasEnemy !== undefined) {
        this.handleEnemyDamage('punch', direction, hasEnemy[1]);
      };
      let afterImageTimer = setTimeout(() =>
        {this.handleUpdateSprite(location, playerConsts.sprites.stand[direction], '');
        this.handleUpdateSprite(startPoint, playerConsts.sprites.particle[direction], '');
        this.props.dispatch(playerModule.updatePlayerStatus('normal'));},
        600
      );
      let afterAfterImageTimer = setTimeout(() =>
        this.handleUpdateSprite(startPoint, '', ''),
        800
      );
    } else {
      let afterImageTimer = setTimeout(() =>
        {this.handleUpdateSprite(location, playerConsts.sprites.stand[direction], '');
        this.props.dispatch(playerModule.updatePlayerStatus('normal'));},
        600
      );
    }
  }

  attack() {
    let newSprite = playerConsts.sprites.attack[this.props.player.direction];
    this.props.dispatch(roomModule.updateSprite(this.props.player.location, newSprite));
    let direction = this.props.player.direction;
    let playerLocation = this.props.player.location;
    let name = playerConsts.weapons[this.props.player.currentWeapon].name;
    let range = playerConsts.weapons[this.props.player.currentWeapon].range;
    let startPoint = this.attemptMove(direction, playerLocation);
    let hasEnemy = this.props.currentRoom[startPoint].content.find(function(content) {
      return content[0] == 'enemy';
    });
    if (startPoint !== playerLocation) {
      if (hasEnemy !== undefined) {
        this.handleEnemyDamage(name, direction, hasEnemy[1]);
      } else {
        this.props.dispatch(gameModule.updateBulletCount(this.props.game.bulletCount + 1));
        let newSprite = playerConsts.weapons[this.props.player.currentWeapon].sprites[direction];
        this.props.dispatch(roomModule.updateSprite(startPoint, newSprite));
        let projectileTimer = setTimeout(() =>
          this.handleProjectile(name, direction, startPoint, range, newSprite),
          100
        );
      }
    }
    this.props.dispatch(playerModule.updatePlayerStatus('normal'));
  };

  knockBack(knockBackDirection) {
    this.props.dispatch(playerModule.updatePlayerStatus('knockback'));
    let direction = this.props.player.direction;
    let newHealth = this.props.player.health -= 10;
    this.props.dispatch(playerModule.updatePlayerHealth(newHealth));
    this.playerHealthCheck();
    if (this.props.player.health > 0) {
      let originalLocation = this.props.player.location;
      //check if player can be knocked back in this direction
      let canMove = this.attemptMove(knockBackDirection, originalLocation);
      if (canMove !== originalLocation){
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
          }
        } else if (squareCheck !== 'fall') {
          //if player can't move back, just trigger animation in current square
          this.props.dispatch(roomModule.updateSprite(this.props.player.location, playerConsts.sprites.knockback[direction]));
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
      this.props.dispatch(roomModule.updateContent(playerLocation, []));
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
    this.props.dispatch(roomModule.updateSprite(this.props.game.respawnPoint, playerConsts.sprites.stand['south']));
    this.props.dispatch(playerModule.updatePlayerLocation(this.props.game.respawnPoint));
    this.props.dispatch(roomModule.updateContent(this.props.game.respawnPoint, ['player']));
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
      let enemyId;
      this.props.currentRoom[canMove].content.forEach(function(content) {
        if (content.includes('enemy')){
          enemyId = content[1];
        }
      });
      //void projectile if it can't progress
      if (location === canMove) {
        this.handleUpdateSprite(location, '', '');
        this.props.dispatch(gameModule.updateBulletCount(this.props.game.bulletCount - 1));
        //damage enemy and void projectile if it hits
      } else if (enemyId !== undefined) {
        this.handleEnemyDamage(name, direction, enemyId);
        this.handleUpdateSprite(location, '', '');
        this.props.dispatch(gameModule.updateBulletCount(this.props.game.bulletCount - 1));
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
          } else {
            that.props.dispatch(gameModule.updateBulletCount(that.props.game.bulletCount - 1));
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
          }
        } else {
          this.handleUpdateSprite(originalLocation, '', '');
          this.props.dispatch(gameModule.updateBulletCount(0));
        }
      }
      this.props.dispatch(gameModule.updateBulletCount(this.props.game.bulletCount - 1));
      let afterAfterImageTimer = setTimeout(() =>
        this.handleUpdateSprite(originalLocation, '', ''),
        200
      );
    }

//movement helper functions
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
      this.closeDoor(trigger[1]);
    }

  }

  handleUpdateSprite(location, sprite, direction) {
    this.props.dispatch(roomModule.updateSprite(location, sprite));
    this.props.dispatch(roomModule.updateTransition(location, direction));
  }

  //check if move is possible
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
    if (hasBlock !== undefined && originalLocation === this.props.player.location){
      let blockMove = this.attemptMove(direction, newLocation);
      if (blockMove !== newLocation) {
        this.moveBlock(hasBlock[1], direction, newLocation, newLocation + difference);
        return newLocation;
      } else {
        return originalLocation
      }
    //check if move is possible
  } else if (hasBlock == undefined
    && this.props.currentRoom[newLocation].value !== 'W'
    && this.props.currentRoom[newLocation].value !== 'T'
    && this.props.currentRoom[newLocation].value !== 'LD') {
      return newLocation;
    } else {
      return originalLocation;
    }
  }

  //check for effects caused by landing on square
  playerSquareCheck(squareId, direction) {
    let currentLocation = this.props.currentRoom[this.props.player.location];
    let squareToCheck = this.props.currentRoom[squareId];
    let hasEnemy = squareToCheck.content.find(function(content) {
      return content[0] == 'enemy';
    });
    let hasDoorTrigger = squareToCheck.content.find(function(content) {
      return content[0] == 'doorTrigger';
    });
    if ((hasEnemy !== undefined && this.props.player.status !== 'dash') || squareToCheck.value == 'L') {
      let knockBackDirection = helpers.reverseDirection(direction);
      this.knockBack(knockBackDirection);
      return 'knockback';
      //fall to your doom and respawn
    } else if (hasDoorTrigger !== undefined) {
      this.attemptOpen(hasDoorTrigger[1]);
      return 'moved';
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
    } else {
      return 'moved';
    }
  }

  attemptOpen(doorId) {
    let door = this.props.doors[doorId];
    if (door.isLocked == true) {
      alert("locked")
    } else if (door.status !== 'open') {
      this.props.dispatch(doorsModule.updateDoorStatus(doorId, 'opening'));
      let doorTimer = setTimeout(() =>
        this.props.dispatch(doorsModule.updateDoorStatus(doorId, 'open')),
        600
      );
    }
  }

  closeDoor(doorId){
    this.props.dispatch(doorsModule.updateDoorStatus(doorId, 'closing'));
    let doorTimer = setTimeout(() =>
      this.props.dispatch(doorsModule.updateDoorStatus(doorId, 'closed')),
      600
    );
  }

  changeRoom(door) {
    let newRoom = door.leadsTo;
    let thisRoom = this.props.game.roomId;
    this.props.dispatch(gameModule.setPreviousRoomId(thisRoom));
    let mapArr = Object.values(this.props.maps);
    let mapsRoom = mapArr.find(function(room) {
      return room.roomId == thisRoom;
    });
    this.props.dispatch(mapsModule.changeVisited(mapsRoom.mapsId));
    this.props.dispatch(gameModule.setRoomId(newRoom));
    this.generateRoomFromTemplate();
    this.handleChangeGameState("building");
  }

  getCoin(location){
    this.props.dispatch(playerModule.updateScore(this.props.player.score + 1));
    this.props.dispatch(roomModule.updateValue(location, '0', roomConsts.sprites.tile));
  }

  triggerDialogue(interactArr){
    this.props.dispatch(gameModule.setActiveText(interactArr[1]));
    this.props.dispatch(gameModule.changeGameState('dialogue'));
  }

  endDialogue() {
    this.props.dispatch(gameModule.setActiveText([]));
    this.props.dispatch(gameModule.changeGameState('active'));
  }

  handleSwitch(location) {
    let switchArr = location.content.find(function(content) {
      return content[0] == 'switch';
    });
    let thisSwitch = this.props.switches[switchArr[1]];
    if (thisSwitch.isPushed === false) {
      this.props.dispatch(roomModule.updateValue(location.squareId, 'S', roomConsts.sprites['switchOn']));
      this.props.dispatch(switchesModule.pushSwitch(thisSwitch.switchId, true));
      let effectLocation = this.props.currentRoom[thisSwitch.effectLocation];
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
          this.props.dispatch(roomModule.updateValue(location.squareId, 'S', roomConsts.sprites['switchOff']));
          this.props.dispatch(platformsModule.activatePlatform(effectArr[1], false));},
        thisSwitch.timer
        );
      } else if (effectArr[0] == 'door') {
        this.props.dispatch(doorsModule.openDoor(effectArr[1], true));
        let switchTimer = setTimeout(() =>
          {this.props.dispatch(switchesModule.pushSwitch(thisSwitch.switchId, false));
          this.props.dispatch(roomModule.updateValue(location.squareId, 'S', roomConsts.sprites['switchOff']));
          this.props.dispatch(doorsModule.openDoor(effectArr[1], false));},
        thisSwitch.timer
        );
      }
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
      if (canMove == originalLocation || this.props.currentRoom[canMove].value !== "P"){
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
      image = roomConsts.sprites['platformOnNS'];
    } else {
      image = roomConsts.sprites['platformOnEW']
    }
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
    }
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
    }
    let sprite;
    if (contentToUpdate[0] == 'player') {
      this.props.dispatch(playerModule.updatePlayerLocation(location));
      sprite = playerConsts.sprites.stand[this.props.player.direction];
    } else if (contentToUpdate[0] == 'block') {
      this.props.dispatch(blocksModule.updateBlockLocation(contentToUpdate[1], newLocation));
      sprite = roomConsts.sprites.block;
    }
    this.handleUpdateSprite(location, sprite, direction+"Enter");
  }

//Handle Blocks
  moveBlock(blockId, direction, originalLocation, newLocation) {
    //move animation
    this.props.dispatch(roomModule.updateTransition(originalLocation, direction));
    //check properties of new square
    let blockCheck = this.props.currentRoom[newLocation];
    let hasEnemy = blockCheck.content.find(function(content) {
      return content[0] == 'enemy';
    });
    //if new square is a pit
    if (blockCheck.value == 'P') {
      let previousContentArr =  this.props.currentRoom[originalLocation].content;
      let filteredContentArr = previousContentArr.filter(function(content) {
        return content[0] !== 'block';
      });
      this.props.dispatch(roomModule.updateContent(originalLocation, filteredContentArr));
      this.handleUpdateSprite(originalLocation, '', '');
      this.blockFall(blockId, newLocation, direction);
    //if new square is lava
  } else if (blockCheck.value == 'L') {
      let previousContentArr =  this.props.currentRoom[originalLocation].content;
      let filteredContentArr = previousContentArr.filter(function(content) {
        return content[0] !== 'block';
      });
      this.props.dispatch(roomModule.updateContent(originalLocation, filteredContentArr));
      this.handleUpdateSprite(originalLocation, '', '');
      this.blockSink(blockId, newLocation, direction);
    //if new square is an enemy...
  } else if (hasEnemy !== undefined) {
        //...and the enemy is able to be pushed back
        if (this.attemptMove(direction, newLocation) !== newLocation) {
          this.enemyKnockBack(direction, this.props.enemies[hasEnemy[1]]);
        }
  } else {
      //update location
      let previousContentArr =  this.props.currentRoom[originalLocation].content;
      let filteredContentArr = previousContentArr.filter(function(content) {
        return content[0] !== 'block';
      });
      this.props.dispatch(roomModule.updateContent(originalLocation, filteredContentArr));
      let newContentArr = this.props.currentRoom[newLocation].content;
      newContentArr.push(["block", blockId]);
      this.props.dispatch(roomModule.updateContent(newLocation, newContentArr));
      this.props.dispatch(blocksModule.updateBlockLocation(blockId, newLocation));
      this.handleUpdateSprite(originalLocation, '', '');
      this.props.dispatch(roomModule.updateSprite(newLocation, roomConsts.sprites['block']));
      let nextLocation = this.attemptMove(direction, newLocation);
      if (this.props.currentRoom[newLocation].value == "I" && nextLocation !== newLocation) {
        let blockMoveTimer = setTimeout(() =>
          this.moveBlock(blockId, direction, newLocation, nextLocation),
          100
        );
      }
    }
  };

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
      this.props.dispatch(roomModule.updateValue(lavaLocation, 'L-sunk', roomConsts.sprites['tile']))},
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
    if (canMove !== currentLocation
    && hasEnemy == undefined
    && this.props.currentRoom[canMove].value !== 'M'
    && this.props.currentRoom[canMove].value !== 'L'
    && this.props.currentRoom[canMove].value !== 'P'){
      //hurt player, but don't move if they can't be knocked back to another square
      if (hasPlayer !== undefined) {
        this.knockBack(direction);
      } else {
        //update enemy location and new square
        this.handleUpdateEnemyLocation(enemyId, currentLocation, canMove);
        //start walk animation

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
      this.props.dispatch(enemiesModule.nullEnemy(enemyId));
      this.props.dispatch(roomModule.updateValue(location, '$', roomConsts.sprites['coin']));},
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
      <div>
          <Route exact path='/' render={()=><Title handleStart={() => this.startGame()} menu={this.props.menu}/>}/>
          <Route exact path='/end' render={()=><End />} />
          <Route exact path='/game' render={()=><Game
            handleStart={() => this.startGame()}
            currentRoom={this.props.currentRoom}
            player={this.props.player}
            projectiles={this.props.projectiles}
            game={this.props.game}
            blocks={this.props.blocks}
            doors={this.props.doors}
            menu={this.props.menu}
            maps={this.props.maps}/>} />
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
  maps: PropTypes.object
};

const mapStateToProps = state => {
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
    maps: state.maps
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
    mapsModule: bindActionCreators(mapsModule, dispatch)
  }
};

export default withRouter(connect(mapStateToProps)(App));
