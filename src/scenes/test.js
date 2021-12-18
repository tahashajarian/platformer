import {
  SECENE_NAMES
} from '../types';

class TestScene extends Phaser.Scene {
  constructor(config) {
    super('testScene', config)
  }

  preload() {
    this.load.image('tiles', 'assets/newMapTileset.png');
    this.load.tilemapTiledJSON('map', 'assets/newMap.json');
  }

  create() {
    this.map = this.make.tilemap({
      key: 'map'
    });
    this.tiles = this.map.addTilesetImage('RPGpack_sheet', 'tiles');

    this.backgroundLayer = this.map.createStaticLayer(this.map.layers[0].name, this.tiles, 0, 0).setOrigin(0).setDepth(1);
    this.blockedLayer = this.map.createStaticLayer(this.map.layers[1].name, this.tiles, 0, 0).setOrigin(0).setDepth(1);
    console.log(this.backgroundLayer)
  }
}

export default TestScene;