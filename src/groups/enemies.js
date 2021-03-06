/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import addColiders from '../mixins/add-coliders';
import {
  ENEMY_TYPES
} from '../types';

export default class Enemies extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);
    Object.assign(this, addColiders);
  }

  getProjectiles() {
    const projectiles = new Phaser.GameObjects.Group()
    const allChild = this.getChildren();
    allChild.forEach(enemy => {
      if (enemy.projectiles) {
        projectiles.addMultiple(enemy.projectiles.getChildren())
      }
    })
    return projectiles;
  }

  getTypes() {
    return ENEMY_TYPES;
  }
}