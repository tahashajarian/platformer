import Phaser, { Data } from "phaser";
import addColiders from "../mixins/add-coliders";
import { getTimeStamp } from "../utils/functions";
import Projectile from "./projectile";

export default class Projectiles extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key: 'iceball',
      classType: Projectile,
    })
    this.coolDown = 3000;
    this.isHot = false;
    Object.assign(this, addColiders);
  }

  fireProjectile(initiator) {
    const projectile = this.getFirstDead(false);
    const centerPlayerBody = initiator.getCenter();
    if (!projectile) {
      this.lastFiredAll = getTimeStamp();
      initiator.setTint(0xF79E00);
      this.isHot = true
      this.scene.time.addEvent({
        delay: this.coolDown,
        loop: false,
        callback: () => {
          this.isHot = false;
          initiator.clearTint();
        }
      })
      return;
    };
    projectile.fire(centerPlayerBody.x, centerPlayerBody.y, initiator.facingRight);
  }

}