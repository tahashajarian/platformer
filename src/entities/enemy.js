import Phaser from 'phaser';
import addColiders from '../mixins/add-coliders';
import initAnimations from './animations/enemy-anims';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.key = key;
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.init();
    this.initEvents();
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  init() {
    Object.assign(this, addColiders);
    this.gravity = 500;
    this.speed = 150;
    this.setOrigin(0.5, 1);
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setVelocityX(30);
    initAnimations(this.scene.anims);
  }

  update() {
    this.play(`idle-${this.key}`, true);
  }
}
