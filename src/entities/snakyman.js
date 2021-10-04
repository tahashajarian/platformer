import Enemy from './enemy';
import Projectiles from '../attaks/projectiles';
import isAnimPlaying from '../mixins/anims';


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
    Object.assign(this, isAnimPlaying);
  }

  getAttakDelay() {
    return Phaser.Math.Between(3000, 5000)
  }

  update(time, delta) {
    super.update(time, delta);
    if (this.body && this.body.velocity.x > 0) {
      this.facingRight = true
    } else {
      this.facingRight = false
    }
    if (this.timeFromLastAttak + this.attakDelay <= time) {
      this.play('fire-snakyman', false);
      setTimeout(() => {
        this.projectiles.fireProjectile(this, 'fireball')
      }, 200);
      this.timeFromLastAttak = time;
    }
    if (!this.active) return
    if (this.body.velocity.x < 0) {
      this.body.setOffset(-3, 3);
    } else {
      this.body.setOffset(19, 3);
    }
    if (this.isAnimPlaying('fire-snakyman') || this.isAnimPlaying('hit-snakyman')) {
      return
    }
    this.play(`idle-snakyman`, true);
  }

}