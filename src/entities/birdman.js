import HealthBar from '../hud/healthbar';
import Enemy from './enemy';

export default class Birdman extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'birdman');
    this.body.setSize(18, 40);
    this.damage = 10;
    this.health = 20;
    this.hb = new HealthBar(scene, x, y, this.health)
  }

  update(time, delta) {
    super.update(time, delta);
    this.hb.draw(this)
    if (!this.body) return;
    if (this.body && this.body.velocity.x < 0) {
      this.body.setOffset(6, 22);
    } else {
      this.body.setOffset(8, 22);
    }
    if (this.isAnimPlaying('hit-birdman')) {
      return
    }
    this.play(`idle-birdman`, true);
  }

}