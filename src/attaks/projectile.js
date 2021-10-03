import Phaser from "phaser";
import hitAnimation from "../animations/hit-animation";
import EffectManager from "../effects/effect-manager";
export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this)
    this.speed = 400;
    this.maxDistance = 600;
    this.traveledDistance = 0;
    this.body.setSize(18, 18)
    hitAnimation(this.scene.anims)
    this.effectManager = new EffectManager(this.scene)
  }
  fire(x, y, facingRight, anim) {
    this.facingRight = facingRight
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

    if (anim) {
      this.play(anim, true)
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.traveledDistance += this.body.deltaAbsX()
    if (this.traveledDistance >= this.maxDistance) {
      this.refactor()
    }
  }

  refactor() {
    setTimeout(() => {
      this.setActive(false);
    }, this.refactorTime);
    this.setVisible(false)
    this.traveledDistance = 0
    this.body.reset(-100, -100)
  }

  hit(anim) {
    this.effectManager.playEffectOn(anim, {x: this.x, y: this.y}, this.facingRight)
    this.refactor();
  }

}


