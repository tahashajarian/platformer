import BaseScene from './base-scene';
import {
  SECENE_NAMES
} from '../types';

class LevelScene extends BaseScene {
  constructor(config) {
    super(SECENE_NAMES.LEVEL_SCENE, config)
  }

  create() {
    super.create()
    // this.scene.start('PlayScene')
    this.createUnlockedMenu(this.registry.get('unlockeds_levels'))
  }

  createUnlockedMenu(unlockeds_levels) {
    const menus = []
    for (let i = 1; i <= unlockeds_levels; i++) {
      const menu = {
        text: `Level ${i}`,
        scene: SECENE_NAMES.PLAY_SCENE,
        onclick: () => this.registry.set('level', i)
      }
      menus.push(menu)
      menus.push({
        text: 'back', 
        scene: SECENE_NAMES.MENU_SCENE
      })
    }
    this.createMenus(menus)
  }


  update() {
    super.update();
  }
}

export default LevelScene;