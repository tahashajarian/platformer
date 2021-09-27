import Enemy from './enemy';

export default class Snakyman extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'snakyman');
    // this.init();
    this.body.setSize(15, 60);
    this.damage = 30
    this.health = 30
  }

  update(time, delta) {
    super.update(time, delta);
    if (!this.active) return
    if (this.body.velocity.x < 0) {
      this.body.setOffset(-3, 3);
    } else {
      this.body.setOffset(19, 3);
    }
  }

}
