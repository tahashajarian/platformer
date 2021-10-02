import Enemy from './enemy';
import Projectiles from '../attaks/projectiles'
export default class Snakyman extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'snakyman');
    // this.init();
    this.body.setSize(15, 60);
    this.damage = 30
    this.health = 30
    this.projectiles = new Projectiles(this.scene, 'fireball_1');
    this.timeFromLastAttak = 0;
    this.attakDelay = this.getAttakDelay();
    this.facingRight = true;
  }

  getAttakDelay() {
    return Phaser.Math.Between(1000, 4000)
  }

  update(time, delta) {
    super.update(time, delta);
    if (this.body.velocity.x > 0) {
      this.facingRight = true
    } else {
      this.facingRight = false
    }
    if (this.timeFromLastAttak + this.attakDelay <= time) {
      this.projectiles.fireProjectile(this)
      this.timeFromLastAttak = time;
    }
    if (!this.active) return
    if (this.body.velocity.x < 0) {
      this.body.setOffset(-3, 3);
    } else {
      this.body.setOffset(19, 3);
    }
  }

}