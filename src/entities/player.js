import Phaser from 'phaser';
import initAnimations from './animations/player-anims';
import addColiders from '../mixins/add-coliders';
import HealthBar from '../hud/healthbar';

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
    this.gravity = 500;
    this.playerSpeed = 150;
    this.playerJump = 300;
    this.jumpCount = 0;
    this.setOrigin(0.5, 1);
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    initAnimations(this.scene.anims);
    this.setScale(1.1);
    this.body.setSize(20, 35);
    this.body.setOffset(7, 3);
    this.hasBeenHited = false;
    this.bounceVelocity = 250;
    this.health = 100;
    this.totalHealth = 100;
    this.hb = new HealthBar(this.scene, 20, 15, this.health)
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    if (this.hasBeenHited) return;
    const {
      left,
      right,
      space,
    } = this.cursor;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const onFloor = this.body.onFloor();
    if (left.isDown) {
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if (isSpaceJustDown && (onFloor || this.jumpCount < 1)) {
      this.setVelocityY(-this.playerJump);
      this.jumpCount += 1;
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