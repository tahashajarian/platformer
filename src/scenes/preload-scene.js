import Phaser from 'phaser'


class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene')
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/map.json')
    this.load.image('tileset', 'assets/main_lev_build_1.png')
    // this.load.image('player', 'assets/player/movements/idle01.png')
    this.load.spritesheet('player', 'assets/player/move_sprite_1.png', {
      frameWidth: 32, frameHeight: 38, spacing: 32
    })
  }

  create() {
    this.scene.start('PlayScene')
  }

}

export default PreloadScene