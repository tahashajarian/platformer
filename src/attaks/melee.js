import Phaser from "phaser";
import EffectManager from "../effects/effect-manager";
import addColiders from "../mixins/add-coliders";

export default class Melee extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, weaponsName) {
    super(scene, x, y, weaponsName);
    scene.add.existing(this)
    scene.physics.add.existing(this);

    this.damage = 15;
    this.attakSpeed = 500;
    this.weaponName = weaponsName;
    this.activateWeapon(false)
    this.wielder = null
    this.setOrigin(0, 1)
    this.animName = this.weaponName + '-swing';
    Object.assign(this, addColiders)
    this.effectManager = new EffectManager(this.scene)
    this.on('animationcomplete', animation => {
      if (animation.key === this.animName) {
        this.activateWeapon(false)
        this.body.checkCollision.none = false
        this.body.reset(-100, -100)
      }
    })
  }

  swing(wielder) {
    this.wielder = wielder;
    this.activateWeapon(true)
    this.body.reset(wielder.x, wielder.y);
    this.anims.play(this.animName, true)
  }

  activateWeapon(active) {
    this.setActive(active)
    this.setVisible(active)
  }

  hit(enemy) {
    this.body.checkCollision.none = true
    // this.effectManager.playEffectOn('hit-effect-anim', { x: enemy.x, y: enemy.y })

  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (!this.active) return
    if (this.wielder.facingRight) {
      this.setFlipX(false)
      this.body.reset(this.wielder.x, this.wielder.y)
    } else {
      this.setFlipX(true)
      this.body.reset(this.wielder.x - this.width, this.wielder.y)
    }
  }


}