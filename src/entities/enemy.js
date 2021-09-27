import Phaser from 'phaser';
import addColiders from '../mixins/add-coliders';
import isAnimPlaying from '../mixins/anims';
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
    Object.assign(this, isAnimPlaying)
    this.gravity = 500;
    this.speed = 50;
    this.setOrigin(0.5, 1);
    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setVelocityX(this.speed);
    initAnimations(this.scene.anims);
    this.rayLength = 30;
    this.rayGraphic = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xff0000 } });
    this.damage = 10;
    this.hited = false;
  }

  update() {
    this.patrol();
    if (this.isAnimPlaying(`hit-${this.key}`)) {
      return
    }
    this.play(`idle-${this.key}`, true);
  }

  patrol() {
    if (this.body) {
      this.raycast(this.body, 10, 0.5);
      if (!this.hasHit) {
        this.setFlipX(!this.flipX);
        this.setVelocityX(this.body.velocity.x * -1);
      }
      if (this.scene.config.debug) {
        this.rayGraphic.clear();
        this.rayGraphic.strokeLineShape(this.ray);
      }
    }
  }

  takeHit(source) {
    this.hited = true;
    console.log('enemy => source => ', source, this.health)
    this.health -= source.damage;
    source.refactor();
    this.play(`hit-${this.key}`, false);
  }
}
