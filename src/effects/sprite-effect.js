import Phaser from "phaser";

export default class SpriteEffect extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, effectName) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.effectName = effectName;
    this.target = null;
    this.on('animationcomplete', (animation) => {
      if (animation.key === this.effectName) {
        this.destroy();
      }
    }, this)
  }

  placeEffect() {
    if (!this.target || !this.body) return
    this.body.reset(this.target.x, this.target.y)
  }

  playOn(target) {
    this.target = target
    this.play(this.effectName, true)
    this.placeEffect();
  }
}