import { SECENE_NAMES } from '../types';
import BaseScene from './base-scene';

class PauseScene extends BaseScene {
  constructor(config) {
    super(SECENE_NAMES.PAUSE_SCENE, config)
    this.menus = [
      { text: 'Resume', scene: SECENE_NAMES.PLAY_SCENE },
      { text: 'Exit', scene: SECENE_NAMES.MENU_SCENE },
    ]
  }

  create() {
    super.create()
    this.createMenus(this.menus)
  }

}

export default PauseScene;