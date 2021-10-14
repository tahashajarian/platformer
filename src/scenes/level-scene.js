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
    // this.unlockeds_levels = this.registry.get('unlockeds_levels')
    this.unlockeds_levels = this.registry.get('unlockeds_levels')
    this.unlockeds_levels = localStorage.getItem('unlockeds_levels') || 1;
    const { width, height } = this.config;
    const relSizeWidth = width / height
    const relSizeHeight = height / width
    this.fontStyle = {
      fontSize: width > 500 ? '42px' : '28px',
      fontWeight: '900',
      fontStroke: width > 500 ? 35 : 20,
      fontSizeTitle: width > 500 ? '52px' : '32px',
    };
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
    this.setUpBack()
  }

  createMenus() {
    const title = this.add.text(0, 0, ` Levels `, { fontSize: this.fontStyle.fontSizeTitle, fill: '#fff' }).setOrigin(0.5, 0);
    const midleOfRow = (this.gridConfig.cols - 1) / 2
    title.setStroke('#00f', this.fontStyle.fontStroke);
    title.setShadow(2, 2, "#333333", 2, true, true)
    console.log(midleOfRow)
    this.grid.placeAtIndex(midleOfRow, title)
    let level = 0;
    let iStart = this.gridConfig.rows <= 3 ? 0 : 1;
    const iEnd = this.gridConfig.rows < 5 ? this.gridConfig.rows : this.gridConfig.rows - 1;
    const jStart = this.gridConfig.cols < 5 ? 0 : 1;
    const jEnd = this.gridConfig.cols < 5 ? this.gridConfig.cols : this.gridConfig.cols - 1;
    if (this.gridConfig.rows > 10) iStart++

    for (let i = iStart; i < iEnd; i++) {
      for (let j = jStart; j < jEnd; j++) {
        let levelnumber = level
        if (level < 30) {
          const fill = level < this.unlockeds_levels ? '#00ff00' : '#ff0000'
          const levelText = this.add.text(0, 0, ` ${level + 1} `, { ...this.fontStyle, fill })
            .setOrigin(0.5)
            .setInteractive()
            .setScrollFactor(0).on('pointerup', () => this.down(levelnumber + 1))
          levelText.setStroke('#fff', this.fontStyle.fontStroke);
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

  setUpBack(menu) {
    const backMenu = this.add.image(this.config.width - 10, this.config.height - 10, 'back')
      .setOrigin(1)
      .setScale(2)

    backMenu.setInteractive()
    backMenu.on('pointerover', () => {
      backMenu.setScale(2.1)
    })

    backMenu.on('pointerout', () => {
      backMenu.setScale(2)
    })

    backMenu.on('pointerup', () => {
      this.scene.start(SECENE_NAMES.MENU_SCENE)
    })
  }
}

export default LevelScene;