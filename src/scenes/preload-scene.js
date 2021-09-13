import Phaser from 'phaser'


class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/map.json')
    this.load.image('tileset', 'assets/main_lev_build_1.png')
  }

  create() {
    this.scene.start('PlayScene')
  }

}

export default PreloadScene