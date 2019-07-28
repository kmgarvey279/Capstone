import React from "react";
import Title from "./Title";
import End from "./End";
import Game from "./Game";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
// import * as types from './../constants/ActionTypes';
// import * as actions from './../actions';

import * as blocksModule from './../redux/modules/blocks';
import * as doorsModule from './../redux/modules/doors';
import * as enemiesModule from './../redux/modules/enemies';
import * as gameModule from './../redux/modules/game';
import * as levelModule from './../redux/modules/level';
import * as playerModule from './../redux/modules/player';
import * as projectilesModule from './../redux/modules/projectiles';

import lava from '../assets/images/lava.gif';
import stairs from '../assets/images/stairs.png';
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
    if(event.keyCode === 38 && this.props.game.coolDown === false && this.props.game.gameState === 'active'){
      const { dispatch } = this.props;
      dispatch(gameModule.toggleCoolDown(true));
      this.move("north")
      let moveTimer = setTimeout(() =>
        dispatch(gameModule.toggleCoolDown(false)),
        150
      );
    //move down
  } else if(event.keyCode === 40 && this.props.game.coolDown === false && this.props.game.gameState === 'active'){
      const { dispatch } = this.props;
      dispatch(gameModule.toggleCoolDown(true));
      this.move("south")
      let moveTimer = setTimeout(() =>
        dispatch(gameModule.toggleCoolDown(false)),
        150
      );
    //move right
  } else if (event.keyCode === 39 && this.props.game.coolDown === false && this.props.game.gameState === 'active'){
      const { dispatch } = this.props;
      dispatch(gameModule.toggleCoolDown(true));
      this.move("east")
      let moveTimer = setTimeout(() =>
        dispatch(gameModule.toggleCoolDown(false)),
        150
      );
    //move left
  } else if (event.keyCode === 37 && this.props.game.coolDown === false && this.props.game.gameState === 'active'){
      const { dispatch } = this.props;
      dispatch(gameModule.toggleCoolDown(true));
      this.move("west")
      let moveTimer = setTimeout(() =>
        dispatch(gameModule.toggleCoolDown(false)),
        150
      );
    //attack!
    } else if (event.keyCode === 32) {
      const { dispatch } = this.props;
      if(this.props.game.gameState == 'title') {
        this.startGame();
        this.props.history.push("/game");
      } else if (this.props.game.gameState == 'active' && this.props.game.coolDown === false) {
        this.attack();
        dispatch(gameModule.toggleCoolDown(true));
        let shotTimer = setTimeout(() =>
          dispatch(gameModule.toggleCoolDown(false)),
          150
        );
      }
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
    const { dispatch } = this.props;
    dispatch(gameModule.changeGameState(newGameState));
  }

//Create Levels
  generateLevelFromTemplate(){
    const { dispatch } = this.props;
    dispatch(levelModule.nullLevel());
    let levelTemplate = this.props.game.levelById[this.props.game.levelId];
    for(let i = 0; i < levelTemplate.length; i++){
      this.handleAddingSquareToLevel(i+1, levelTemplate[i]);
    }
  }

  handleAddingSquareToLevel(thisSquareId, squareValue) {
    const { dispatch } = this.props;
    let squareImage;
    let content;
    let contentId;
    let sprite;
    let transition = '';
    //Set tile image
    if (squareValue == 'F') {
      squareImage = <img id="tile" src={stairs} weight="50" height="50" />;
    } else if (squareValue == 'L') {
      squareImage = <img id="tile" src={lava} weight="50" height="50" />;
    } else if (squareValue == 'P') {
      squareImage = '';
    } else if (squareValue == 'W') {
      if (thisSquareId == 1) {
        squareImage = <img id="tile" src={wallCorner1} weight="50" height="50" />;
      } else if (thisSquareId === 12) {
        squareImage = <img id="tile" src={wallCorner3} weight="50" height="50" />;
      } else if (thisSquareId === 133) {
        squareImage = <img id="tile" src={wallCorner2} weight="50" height="50" />;
      } else if (thisSquareId === 144) {
        squareImage = <img id="tile" src={wallCorner4} weight="50" height="50" />;
      } else if (thisSquareId %12 === 0) {
        squareImage = <img id="tile" src={wallBottom} weight="50" height="50" />;
      } else if (thisSquareId < 12) {
        squareImage = <img id="tile" src={wallLeft} weight="50" height="50" />;
      } else if (thisSquareId >= 131) {
        squareImage = <img id="tile" src={wallRight} weight="50" height="50" />;
      } else if ((thisSquareId - 1) %12 === 0) {
        squareImage = <img id="tile" src={wallTop} weight="50" height="50" />;
      } else {
        squareImage = <img id="tile" src={wall} weight="50" height="50" />;
      }
    } else {
      squareImage = <img id="tile" src={tile} weight="50" height="50" />;
    }
    if (squareValue == 'S') {
      dispatch(gameModule.setRespawnPoint(thisSquareId));
      sprite = this.props.player.sprites.stand[this.props.player.direction];
      content = 'player';
      contentId = '';
      dispatch(playerModule.updatePlayerLocation(thisSquareId));
    }
    if (parseInt(squareValue) > 0) {
      let newEnemyId = this.handleCreateNewEnemy(thisSquareId, parseInt(squareValue));
      sprite = this.props.enemies[newEnemyId].sprites.move['south'];
      content =  'enemy';
      contentId = newEnemyId;
    }
    if (squareValue == 'B') {
      sprite = this.props.game.miscSprites['block'];
      content = 'block';
      contentId = v4();
      dispatch(blocksModule.createBlock(contentId));
    }
    dispatch(levelModule.addSquare(thisSquareId, squareValue, content, contentId, squareImage, sprite, transition));
  }

//Handle Movement
  move(direction){
    let originalLocation = this.props.player.location;
    const { dispatch } = this.props;
    //direction always updates
    dispatch(playerModule.updatePlayerDirection(direction));
    dispatch(levelModule.updateSprite(originalLocation, this.props.player.sprites.stand[direction]));
    //check if move is legal, if not return original location
    let canMove = this.attemptMove(direction, originalLocation);
    //if move is legal and didn't cause any secondary effects...
    if (canMove !== originalLocation) {
      //check for effects of landing on new square
      let squareCheck = this.playerSquareCheck(canMove, direction);
      if (squareCheck === 'moved'){
        //square content !== player
        dispatch(levelModule.updateContent(originalLocation, 'empty', ''));
        //start walk animation
        dispatch(levelModule.updateSprite(originalLocation, this.props.player.sprites.walk[direction]));
        dispatch(levelModule.updateTransition(originalLocation, direction));
        //update player location and new square
        dispatch(levelModule.updateContent(canMove, 'player', ''))
        dispatch(playerModule.updatePlayerLocation(canMove));
        //after walking animation finishes, remove sprite from previous square & add to new one
        let spriteClearTimer = setTimeout(() =>
          {dispatch(levelModule.updateSprite(originalLocation, ''));
          dispatch(levelModule.updateTransition(originalLocation, ''));
          dispatch(levelModule.updateSprite(canMove, this.props.player.sprites.stand[direction]))},
          120
        );
      }
    }
  }

  //check if move is possible
  attemptMove(direction, originalLocation) {
    let newLocation;
    if(direction == "north") {
      newLocation = originalLocation - 1;
      //check if there is a movable block
      if (this.props.currentLevel[newLocation].content === 'block'
      && this.props.currentLevel[newLocation - 1].value !== 'W'
      && this.props.currentLevel[newLocation - 1].content !== 'block'
      && this.props.currentLevel[originalLocation].content === 'player') {
        this.moveBlock(this.props.currentLevel[newLocation].contentId, direction, newLocation, newLocation - 1);
        return newLocation;
      } else if (this.props.currentLevel[newLocation].content !== 'block' && this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    } else if (direction == "east") {
      newLocation = originalLocation + 12;
      //check if there is a movable block
      if (this.props.currentLevel[newLocation].content === 'block'
      && this.props.currentLevel[newLocation + 12].value !== 'W'
      && this.props.currentLevel[newLocation + 12].content !== 'block'
      && this.props.currentLevel[originalLocation].content === 'player') {
        this.moveBlock(this.props.currentLevel[newLocation].contentId, direction, newLocation, newLocation + 12);
        return newLocation;
      } else if (this.props.currentLevel[newLocation].content !== 'block' && this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    } else if (direction == "south") {
      newLocation = originalLocation + 1;
      //check if there is a movable block
      if (this.props.currentLevel[newLocation].content === 'block'
            && this.props.currentLevel[newLocation + 1].content !== 'block'
      && this.props.currentLevel[newLocation + 1].value !== 'W'
      && this.props.currentLevel[originalLocation].content === 'player') {
        this.moveBlock(this.props.currentLevel[newLocation].contentId, direction, newLocation, newLocation + 1);
        return newLocation;
      } else if(this.props.currentLevel[newLocation].content !== 'block' && this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    } else if (direction == "west") {
      newLocation = originalLocation - 12;
      //check if there is a movable block
      if (this.props.currentLevel[newLocation].content === 'block'
      && this.props.currentLevel[newLocation - 12].content !== 'block'
      && this.props.currentLevel[newLocation - 12].value !== 'W'
      && this.props.currentLevel[originalLocation].content === 'player') {
        this.moveBlock(this.props.currentLevel[newLocation].contentId, direction, newLocation, newLocation - 12);
        return newLocation;
      } else if(this.props.currentLevel[newLocation].content !== 'block' && this.props.currentLevel[newLocation].value !== 'W') {
        return newLocation;
      } else {
        return originalLocation;
      }
    }
  }
  //check for effects caused by landing on square
  playerSquareCheck(squareId, direction) {
    let squareToCheck = this.props.currentLevel[squareId];
    const { dispatch } = this.props;
    //take damage + knockback if not invincible
    if (this.props.player.invincibility === false && (squareToCheck.content === 'enemy' || squareToCheck.content === 'projectile' || squareToCheck.value == 'L')) {
      let knockBackDirection = this.reverseDirection(direction);
      this.knockBack(knockBackDirection);
      alert("knockback")
      //just stop if currently invincible
    } else if (squareToCheck.content === 'enemy' || squareToCheck.content === 'projectile' || squareToCheck.value == 'L') {
      return 'stopped';
      //switch levels
    } else if (squareToCheck.value == 'F') {
      let newLevel = this.props.game.levelId++
      dispatch(gameModule.levelIdUp(newLevel));
      this.generateLevelFromTemplate();
      //fall to your doom and respawn
    } else if (squareToCheck.value == 'P'){
      this.fall(squareId, direction);
    } else {
      //move to square as normal
      return 'moved';
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

  knockBack(knockBackDirection) {
    const { dispatch } = this.props;
    let originalLocation = this.props.player.location;
    let direction = this.props.player.direction;
    //take damage
    if (this.props.player.invincibility == false) {
      //start invincibility timer during which they player can't be hit
      dispatch(playerModule.toggleInvincibility(true));
      let invincibilityTimer = setTimeout(() =>
        dispatch(playerModule.toggleInvincibility(false)),
        300
      );
      //damage + knockback animation
      dispatch(levelModule.updateSprite(originalLocation, this.props.player.sprites.knockback[direction]));
      let newHealth = this.props.player.health -= 10;
      dispatch(playerModule.updatePlayerHealth(newHealth));
      //handle knockback (1-2 spaces)
      for (let i = 0; i < 2; i++) {
        //check if player can be knocked back in this direction
        let canMove = this.attemptMove(knockBackDirection, originalLocation)
        if (canMove !== location) {
          //check for effects of landing on new square
          let squareCheck = this.playerSquareCheck(canMove, direction);
          if (squareCheck === 'moved'){
            //square content !== player
            dispatch(levelModule.updateContent(originalLocation, 'empty', ''))
            //start knockback animation
            dispatch(levelModule.updateTransition(originalLocation, direction));
            //update player and new square
            dispatch(levelModule.updateContent(canMove, 'player', ''))
            dispatch(playerModule.updatePlayerLocation(canMove));
            //after knockback animation finishes, remove sprite from previous square & add to new one
            let spriteClearTimer = setTimeout(() =>
              {dispatch(levelModule.updateSprite(originalLocation, ''));
              dispatch(levelModule.updateTransition(originalLocation, ''));
              dispatch(levelModule.updateSprite(canMove, this.props.player.sprites.knockback[direction]))},
              120
            );
          }
        }
      }
      let spriteClearTimer = setTimeout(() =>
        dispatch(levelModule.updateSprite(this.props.player.location, this.props.player.sprites.stand[direction])),
        120
      );
    }
  }

  fall(pitLocation, direction) {
    const { dispatch } = this.props;
    this.handleChangeGameState("cutscene");
    let playerLocation = this.props.player.location;
    //take damage
    let newHealth = this.props.player.health -= 10;
    dispatch(playerModule.updatePlayerHealth(newHealth));
    //clear player from previous square
    dispatch(levelModule.updateContent(playerLocation, 'empty', ''))
    dispatch(levelModule.updateSprite(playerLocation, ''));
    dispatch(levelModule.updateTransition(playerLocation, ''));
    //fall animation
    dispatch(levelModule.updateSprite(pitLocation, this.props.player.sprites.fall));
    dispatch(levelModule.updateTransition(pitLocation, this.props.player.direction));
    //clear pit and restart player on respawn point
    let spriteClearTimer = setTimeout(() =>
      {dispatch(levelModule.updateSprite(pitLocation, ''));
      dispatch(levelModule.updateTransition(pitLocation, ''));
      dispatch(levelModule.updateSprite(this.props.game.respawnPoint, this.props.player.sprites.stand[direction]));
      dispatch(playerModule.updatePlayerLocation(this.props.game.respawnPoint));
      dispatch(levelModule.updateContent(this.props.game.respawnPoint, 'player', ''));
      this.handleChangeGameState("active");},
      600
    );
  }

//Handle Blocks
  moveBlock(blockId, direction, originalLocation, newLocation) {
    const { dispatch } = this.props;
    //move animation
    dispatch(levelModule.updateTransition(originalLocation, direction));
    //check properties of new square
    let blockCheck = this.props.currentLevel[newLocation];
    //if new square is a pit
    if (blockCheck.value == 'P') {
      dispatch(levelModule.updateContent(originalLocation, 'empty', ''))
      dispatch(levelModule.updateSprite(originalLocation, ''));
      dispatch(levelModule.updateTransition(originalLocation, ''));
      this.blockFall(blockId, newLocation, direction);
    //if new square is lava
  } else if (blockCheck.value == 'L') {
      dispatch(levelModule.updateContent(originalLocation, 'empty', ''))
      dispatch(levelModule.updateSprite(originalLocation, ''));
      dispatch(levelModule.updateTransition(originalLocation, ''));
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
      dispatch(levelModule.updateContent(originalLocation, 'empty', ''));
      dispatch(levelModule.updateContent(newLocation, 'block', blockId));
      dispatch(blocksModule.updateBlockLocation(blockId, newLocation));
      let spriteClearTimer = setTimeout(() =>
        {dispatch(levelModule.updateSprite(originalLocation, ''));
        dispatch(levelModule.updateTransition(originalLocation, ''));
        dispatch(levelModule.updateSprite(newLocation, this.props.game.miscSprites['block']))},
        120
      );
    }
  };

  blockFall(blockId, pitLocation, direction) {
    dispatch(levelModule.updateSprite(pitLocation, this.props.game.miscSprites['block']));
    dispatch(levelModule.updateTransition(pitLocation, direction));
    let spriteClearTimer = setTimeout(() =>
      {dispatch(levelModule.updateSprite(pitLocation, ''));
      dispatch(levelModule.updateTransition(pitlLocation, ''));
      dispatch(blocksModule.nullBlock(blockId));},
      500
    );
  };

  blockSink(blockId, lavaLocation, direction) {
    const { dispatch } = this.props;
    dispatch(levelModule.updateSprite(lavaLocation, this.props.game.miscSprites['blockSink']));
    dispatch(levelModule.updateTransition(lavaLocation, direction));
    let spriteClearTimer = setTimeout(() =>
      {dispatch(levelModule.updateSprite(lavaLocation, ''));
      dispatch(levelModule.updateTransition(lavaLocation, ''));
      dispatch(blocksModule.nullBlock(blockId));
      dispatch(levelModule.updateValue(lavaLocation, 'L-sunk', <img id="tile" src={tile} weight="50" height="50" />))},
      300
    );
  };

//Handle Enemies
  handleCreateNewEnemy(locationId, enemyListId) {
    let thisEnemy = this.props.game.enemyById[enemyListId];
    let enemyId = v4();
    const { dispatch } = this.props;
    dispatch(enemiesModule.createEnemy(enemyId, thisEnemy.kind, thisEnemy.sprites, thisEnemy.health, 'normal', locationId, 'south'));
    //stagger enemy movement
    let rng = Math.floor(Math.random() * 5) + 1 * 2000;
    let enemyTimer = setInterval(() =>
      this.enemyMove(enemyId),
      rng
    );
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
    const { dispatch} = this.props;
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
    dispatch(enemiesModule.updateEnemyDirection(enemyId, direction));
    dispatch(levelModule.updateSprite(currentLocation, this.props.enemies[enemyId].sprites.move[direction]));
    let canMove = this.attemptMove(direction, currentLocation);
    if (canMove !== currentLocation && this.props.currentLevel[canMove].content !== 'enemy'
    && this.props.currentLevel[canMove].value !== 'L'
    && this.props.currentLevel[canMove].value !== 'P'){
      //damage player if not invincible
      if (this.props.currentLevel[canMove].content == 'player' && this.props.player.invincibility == false) {
        this.knockBack(direction);
      }
      //square content !== enemy
      dispatch(levelModule.updateContent(currentLocation, 'empty', ''));
      //start walk animation
      dispatch(levelModule.updateTransition(currentLocation, direction));
      //update enemy location and new square
      dispatch(levelModule.updateContent(canMove, 'enemy', ''))
      dispatch(enemiesModule.updateEnemyLocation(enemyId, canMove));
      //after walking animation finishes, remove sprite from previous square & add to new one
      let spriteClearTimer = setTimeout(() =>
        {dispatch(levelModule.updateSprite(currentLocation, ''));
        dispatch(levelModule.updateTransition(currentLocation, ''));
        dispatch(levelModule.updateSprite(canMove, this.props.enemies[enemyId].sprites.move[direction]))},
        120
      );
    }
  }

  enemyKnockBack(knockBackDirection, enemyId) {
    const { dispatch } = this.props;
    let originalLocation = this.props.enemies[enemyId].location;
    let direction = this.props.enemies[enemyId].direction;
    //take damage + dizzy effect
    let newHealth = this.props.enemies[enemyId].health -= 10;
    dispatch(enemiesModule.updateEnemyHealth(enemyId, newHealth));
    dispatch(enemiesModule.updateEnemyStatus(enemyId, 'dizzy'));
    let statusTimer = setTimeout(() =>
      dispatch(enemyModule.updateEnemyStatus(enemyId, 'normal')),
      300
    );
    dispatch(levelModule.updateSprite(this.props.enemies[enemyId].sprites.knockback[direction]));
    //handle knockback (1-2 spaces)
    for (let i = 0; i < 2; i++) {
      let canMove = this.attemptMove(knockBackDirection, originalLocation);
      if (canMove !== location) {
        //square content !== enemy
        dispatch(levelModule.updateContent(originalLocation, 'empty', ''))
        //start knockback animation
        dispatch(levelModule.updateTransition(originalLocation, direction));
        //update player and new square
        dispatch(levelModule.updateContent(canMove, 'enemy', enemyId))
        dispatch(playerModule.updateEnemyLocation(canMove));
        //after knockback animation finishes, remove sprite from previous square & add to new one
        let spriteClearTimer = setTimeout(() =>
          {dispatch(levelModule.updateSprite(originalLocation, ''));
          dispatch(levelModule.updateTransition(originalLocation, ''));
          dispatch(levelModule.updateSprite(canMove, this.props.enemies[enemyId].sprites.knockback[direction]));},
          120
        );
      }
    }
    let spriteClearTimer = setTimeout(() =>
      dispatch(levelModule.updateSprite(this.props.enemies[enemyId].location, this.props.enemies[enemyId].sprites.move[direction])),
      120
    );
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
    if (this.props.game.gameState === 'active') {
      const { dispatch } = this.props;
      let newSprite = this.props.player.sprites.attack[this.props.player.direction];
      dispatch(levelModule.updateSprite(this.props.player.location, newSprite));
      let projectileId = v4();
      this.handleCreateProjectile(projectileId);
    }
  }

  handleCreateProjectile(projectileId) {
    let direction = this.props.player.direction;
    let location = this.props.player.location;
    let next;
    let range = this.props.player.weapons[this.props.player.currentWeapon].range;
    if (direction == 'north') {
      location -= 1;
      next = location - 1;
      target = location - (1 * range);
    } else if (direction == 'east') {
      location += 12;
      next = location + 12;
      target = location + (12 * range);
    } else if (direction == 'south') {
      location += 1;
      next = location + 1;
      target = location + (1 * range);
    } else if (direction == 'west') {
      location -= 12;
      next = location -12;
      target = location - (12 * range);
    }
    let target;
    const { dispatch } = this.props;
    //If start location == enemy, and there is nowhere for it to move, skip creating projectile and just do animation + damage
    if (this.props.currentLevel[location].content === 'enemy' && (this.props.currentLevel[next].value === 'W' || this.props.currentLevel[next].content !== 'empty')) {
      let enemyId = this.props.currentLevel[location].contentId;
      this.enemyKnockBack(direction, enemyId);
      let newSprite = this.props.player.weapons[this.props.player.currentWeapon].sprites[direction];
      dispatch(levelModule.updateSprite(location, newSprite));
      newSprite = this.props.enemies[enemyId].sprites.move[this.props.enemies[enemyId].direction];
      //restore enemy sprite once projectile vanishes
      let spriteAddTimer = setTimeout(() =>
        dispatch(levelModule.updateSprite(location, newSprite)),
        100
      );
    //If player immediatly hits a wall, trigger animation, but skip creating projectile
    } else if (this.props.currentLevel[location].value === 'W' || this.props.currentLevel[location].content === 'block') {
      let newSprite = this.props.player.weapons[this.props.player.currentWeapon].sprites[direction];
      dispatch(levelModule.updateSprite(location, newSprite));
      let spriteAddTimer = setTimeout(() =>
        dispatch(levelModule.updateSprite(location, newSprite)),
        100
      );
    } else {
      //create projectile, start timer to move it
      dispatch(projectilesModule.createProjectile(projectileId, direction, location, target));
      let newSprite = this.props.player.weapons[this.props.player.currentWeapon].sprites[direction];
      dispatch(levelModule.updateSprite(location, newSprite));
      this.projectileTimer = setInterval(() =>
        this.handleProjectile(projectileId),
        200
      );
      dispatch(levelModule.updateContent(location, 'projectile', projectileId));
    }
  };

  handleProjectile(projectileId) {
    if (this.props.game.gameState === 'active') {
      const { dispatch } = this.props;
      let location = this.props.projectiles[projectileId].location;
      let direction = this.props.projectiles[projectileId].direction;
      //void projectile if @ max range
      if (location === this.props.projectiles[projectileId].target) {
        this.destroyProjectile(projectileId);
      } else {
        let newLocation = this.attemptMove(direction, location);
        //void projectile if it cannot continue
        if (location === newLocation) {
          this.destroyProjectile(projectileId);
        //damage enemy and void projectile if it hits
      } else if (this.props.currentLevel[newLocation].content === 'enemy') {
          this.enemyKnockBack(direction, this.props.currentLevel[newLocation].contentId);
          this.destroyProjectile(projectileId);
        //otherwise move the projectile
        } else {
          dispatch(levelModule.updateTransition(location, direction));
          let spriteClearTimer = setTimeout(() =>
            this.clearSprite(location),
            120
          );
          let spriteAddTimer = setTimeout(() =>
            this.handleUpdateProjectileLocation(projectileId, newLocation, direction),
            120
          );
        }
      }
    }
  };

  handleUpdateProjectileLocation(projectileId, newLocation, direction) {
    const { dispatch } = this.props;
    dispatch(levelModule.updateContent(newLocation, 'projectile', projectileId));
    let newSprite = this.props.player.weapons[this.props.player.currentWeapon].sprites[direction];
    dispatch(levelModule.updateSprite(newLocation, newSprite));
    dispatch(projectilesModule.updateProjectileLocation(projectileId, newLocation));
  };

  destroyProjectile(projectileId) {
    const { dispatch } = this.props;
    let location = this.props.projectiles[projectileId].location;
    let newSprite = this.props.player.weapons[this.props.player.currentWeapon].sprites['burst'];
    dispatch(levelModule.updateSprite(location, newSprite));
    let spriteClearTimer = setTimeout(() =>
      this.clearSprite(location),
      100
    );
    dispatch(projectilesModule.nullProjectile(projectileId));
    clearInterval(this.projectileTimer);
  }

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
            blocks={this.props.blocks} />} />
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

export default withRouter(connect(mapStateToProps)(App));
