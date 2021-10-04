import Phaser from 'phaser';
import initAnimations from '../animations/player-anims';
import addColiders from '../mixins/add-coliders';
import isAnimPlaying from '../mixins/anims';
import HealthBar from '../hud/healthbar';
import Projectiles from '../attaks/projectiles';
import Melee from '../attaks/melee';
import {
  getTimeStamp
} from '../utils/functions';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.cursor = this.scene.input.keyboard.createCursorKeys();
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.init();
    this.initEvents();
  }

  init() {
    Object.assign(this, addColiders);
    Object.assign(this, isAnimPlaying);
    this.gravity = 500;
    this.playerSpeed = 150;
    this.playerJump = 300;
    this.jumpCount = 0;
    this.setOrigin(0.5, 1);
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    initAnimations(this.scene.anims);
    this.setScale(1.1);
    this.setDefalutSize()
    this.hasBeenHited = false;
    this.bounceVelocity = 250;
    this.health = 100;
    this.totalHealth = 100;
    this.hb = new HealthBar(this.scene, 20, 15, this.health)
    this.projectiles = new Projectiles(this.scene, 'iceball')
    this.melee = new Melee(this.scene, 0, 0, 'sword')
    this.lastMeleeTime = getTimeStamp();
    this.facingRight = true;
    this.handleAttacks();
    this.handleMovments();
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  setDefalutSize() {
    this.body.setSize(20, 35);
    this.body.setOffset(7, 3);
    this.width = 20
    this.height = 35
  }

  update() {
    if (this.hasBeenHited || this.sliding) return;
    const {
      left,
      right,
      down,
      space
    } = this.cursor;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const onFloor = this.body.onFloor();


    if (left.isDown) {
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
      this.facingRight = false;
    } else if (right.isDown) {
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
      this.facingRight = true;
    } else {
      this.setVelocityX(0);
    }

    if (isSpaceJustDown && (onFloor || this.jumpCount < 1)) {
      this.setVelocityY(-this.playerJump);
      this.jumpCount += 1;
    }


    if (this.isAnimPlaying('player-throw') || this.isAnimPlaying('player-slide')) {
      return
    }


    if (onFloor) {
      if (this.body.velocity.x === 0) {
        this.play('idle', true);
      } else {
        this.play('run', true);
      }
      this.jumpCount = 0;
    } else {
      this.play('jump', true);
    }
  }

  handleAttacks() {
    this.scene.input.keyboard.on('keydown-F', () => {
      if (!this.projectiles.isHot) {
        this.play('player-throw', false);
        this.projectiles.fireProjectile(this, 'iceball');
        this.setDefalutSize()
        this.sliding = false
      }
    })
    this.scene.input.keyboard.on('keydown-E', () => {
      if (this.lastMeleeTime + this.melee.attakSpeed < getTimeStamp()) {
        this.play('player-throw', false)
        this.melee.swing(this);
        this.lastMeleeTime = getTimeStamp();
        this.setDefalutSize()
        this.sliding = false
      }
    })
  }

  handleMovments() {
    this.scene.input.keyboard.on('keydown-DOWN', () => {
      if (!this.body.onFloor()) return

      this.play('player-slide', true)
      this.body.setSize(20, this.height / 3)
      this.setOffset(7, this.height - (this.height / 3))
      this.setVelocityX(0)
      this.sliding = true
    })
    this.scene.input.keyboard.on('keyup-DOWN', () => {
      this.setDefalutSize()
      this.sliding = false
    })
  }

  bounceOff() {
    if (this.body.touching.right) {
      this.setVelocity(-this.bounceVelocity, -this.bounceVelocity);
    } else {
      this.setVelocity(this.bounceVelocity, -this.bounceVelocity);
    }
  }

  hited(player, enemy) {
    if (this.hasBeenHited) return;
    this.hasBeenHited = true;
    this.bounceOff();
    this.tween()
    this.scene.time.delayedCall(1000, () => {
      this.hasBeenHited = false;
      this.twining.stop();
      this.clearTint();
    })
    this.health -= enemy.damage
    // this.health -= (this.totalHealth/10)
    this.hb.draw(this.health)
    // debugger
  }

  tween() {
    this.twining = this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: -1,
      tint: 0xffffff
    })
  }

  touchedFloor() {
    // this.hasBeenHited = false;
  }
}

export default Player;