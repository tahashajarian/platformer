import Phaser from "phaser";
import initAnimations from '../animations/diamond-anim'

export default class Diamond extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this)
    this.score = 1;
    this.setOrigin(0, 1)
    initAnimations(this.scene.anims);
    this.play(`${key}_shining`, true)


    this.scene.tweens.add({
      targets: this,
      y: this.y + 4,
      duration: Phaser.Math.Between(400, 600),
      repeat: -1,
      ease: 'linear',
      yoyo: true,
    })
  }
}