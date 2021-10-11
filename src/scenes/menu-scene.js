import BaseScene from './base-scene';
import {
  SECENE_NAMES, SOUNDS
} from '../types';
import AudioManager from '../audio/audio-manager';

class MenuScene extends BaseScene {
  constructor(config) {
    super(SECENE_NAMES.MENU_SCENE, config)
    this.menus = [{
        text: 'Play',
        scene: SECENE_NAMES.PLAY_SCENE
      },
      {
        text: 'Levels',
        scene: SECENE_NAMES.LEVEL_SCENE
      },
      {
        text: 'Exit',
        scene: ''
      },
    ]
  }

  create() {
    super.create()
    // this.scene.start('PlayScene')
    this.createMenus(this.menus)
    this.soundManager = new AudioManager(this);
    this.soundManager.playSound(SOUNDS.menu_music, 0.05, true)

  }


  update() {
    super.update();
  }
}

export default MenuScene;