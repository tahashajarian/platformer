import Phaser from "phaser";
import initAnimations from "./player-anims";
import addColiders from "../mixins/add-coliders";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    this.cursor = this.scene.input.keyboard.createCursorKeys();
    scene.physics.add.existing(this)
    scene.add.existing(this)
    this.init()
    this.initEvents()
  }

  init() {
    Object.assign(this, addColiders)
    this.gravity = 500
    this.playerSpeed = 150
    this.playerJump = 300
    this.jumpCount = 0
    this.setOrigin(0.5, 1)
    this.body.setGravityY(this.gravity)
    this.setCollideWorldBounds(true)
    initAnimations(this.scene.anims)
    this.setScale(1.1)
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update(time, delta) {
    // console.log(time, delta)
    const { left, right, up, space } = this.cursor;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space)
    const onFloor = this.body.onFloor()
    if (left.isDown) {
      this.setVelocityX(-this.playerSpeed)
      this.setFlipX(true)
    } else if (right.isDown) {
      this.setVelocityX(this.playerSpeed)
      this.setFlipX(false)
    } else {
      this.setVelocityX(0)
    }

    if (isSpaceJustDown && (onFloor || this.jumpCount < 1)) {
      this.setVelocityY(-this.playerJump)
      this.jumpCount++
    }
    if (onFloor) {
      this.body.velocity.x === 0 ? this.play('idle', true) : this.play('run', true)
      this.jumpCount = 0
    } else {
      this.play('jump', true)
    }
  }

}


export default Player