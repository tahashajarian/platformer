import Phaser from 'phaser'


class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene')
  }



  create() {
    const map = this.createMap();
    const layers = this.createLayers(map)
  }

  createMap() {
    const map = this.make.tilemap({ key: 'map' })
    map.addTilesetImage('tileset', 'tileset')
    return map;
  }

  createLayers(map) {
    const tileset = map.getTileset('tileset');
    const layer2 = map.createStaticLayer('layer2', tileset)
    const layer1 = map.createStaticLayer('layer1', tileset)
    return { layer1, layer2 }
  }

}

export default PlayScene