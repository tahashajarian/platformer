import BaseScene from './base-scene';
import {
  SECENE_NAMES
} from '../types';

import { AlignGrid } from '../utils/alignGrid'

class LevelScene extends BaseScene {
  constructor(config) {
    super(SECENE_NAMES.LEVEL_SCENE, config)
    this.config = config
  }

  create() {
    super.create()
    // this.scene.start('PlayScene')
    this.fontStyle = {
      fontSize: "28px",
      fontWeight: 'bold'
    };
    // this.unlockeds_levels = this.registry.get('unlockeds_levels')
    this.unlockeds_levels = this.registry.get('unlockeds_levels')
    this.unlockeds_levels = localStorage.getItem('unlockeds_levels') || 1;
    const { width, height } = this.config;
    const relSizeWidth = width / height
    const relSizeHeight = height / width
    const allCells = 8;
    const rows = Math.round(allCells * relSizeHeight)
    const cols = Math.round(allCells * relSizeWidth)
    this.gridConfig = { scene: this, rows, cols };
    this.grid = new AlignGrid(this.gridConfig);
    // this.grid.showNumbers();
    this.createUnlockedMenu(this.unlockeds_levels)
    this.input.setDefaultCursor('pointer');
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

  createMenus() {
    let level = 0;
    const iStart = this.gridConfig.rows < 5 ? 0 : 1;
    const iEnd = this.gridConfig.rows < 5 ? this.gridConfig.rows : this.gridConfig.rows - 1;
    const jStart = this.gridConfig.cols < 5 ? 0 : 1;
    const jEnd = this.gridConfig.cols < 5 ? this.gridConfig.cols : this.gridConfig.cols - 1;
    for (let i = iStart; i < iEnd; i++) {
      for (let j = jStart; j < jEnd; j++) {
        let levelnumber = level
        if (level < 30) {
          const fill = level < this.unlockeds_levels ? '#00ff00' : '#ff0000'
          const levelText = this.add.text(0, 0, `${level + 1}`, { ...this.fontStyle, fill })
            .setOrigin(0.5)
            .setInteractive()
            .setScrollFactor(0).on('pointerup', () => this.down(levelnumber + 1))
          levelText.setStroke('#00f', 16);
          levelText.setShadow(2, 2, "#333333", 2, true, true);
          levelText.setStroke('#fff', 16);
          levelText.setShadow(2, 2, "#333333", 2, true, true);

          this.grid.placeAt(j, i, levelText)
          level += 1
        }
      }
    }
    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];

    // }
  }

  down(level) {
    if (level <= this.unlockeds_levels) {
      this.registry.set('level', level)
      this.scene.start(SECENE_NAMES.PLAY_SCENE)
    }
  }

  update() {
    super.update();
  }
}

export default LevelScene;