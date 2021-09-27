import Phaser from "phaser";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this)
    this.speed = 300;
    this.maxDistance = 600;
    this.traveledDistance = 0;
  }
  fire(x, y, facingRight) {
    this.setActive(true)
    this.setVisible(true)
    if (facingRight) {
      this.body.reset(x + 10, y + 5);
      this.setVelocityX(this.speed)
      this.setFlipX(false)
    } else {
      this.body.reset(x - 10, y + 5);
      this.setVelocityX(this.speed * -1)
      this.setFlipX(true)
    }
    this.refactorTime = 1000;
    this.damage = 10;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.traveledDistance += this.body.deltaAbsX()
    this.alpha = Math.abs(this.traveledDistance / this.maxDistance - 1) + 0.5;
    if (this.traveledDistance >= this.maxDistance) {
      setTimeout(() => {
        this.setActive(false);
        this.setVisible(false)
      }, this.refactorTime);
      this.traveledDistance = 0
      this.body.reset(-100, -100)
    }
  }

  refactor() {
    this.setActive(false);
    this.setVisible(false);
    this.traveledDistance = 0
    this.body.reset(-100, -100)
  }

}


