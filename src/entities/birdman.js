import Enemy from './enemy';

export default class Birdman extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'birdman');
    this.body.setSize(20, 40);
    this.body.setOffset(8, 22);
  }

  update(time, delta) {
    super.update(time, delta);
  }
}
