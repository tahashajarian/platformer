import Enemy from './enemy';

export default class Snakyman extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'snakyman');
    // this.init();
    this.body.setSize(20, 60);
    this.body.setOffset(6, 3);
    this.damage = 30
    this.health = 30
  }

  update(time, delta) {
    super.update(time, delta);
  }
  
}
