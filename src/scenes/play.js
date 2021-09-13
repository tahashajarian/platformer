import Phaser from 'phaser'
import Player from '../entities/player';

class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene')
  }



  create() {
    const map = this.createMap();
    const layers = this.createLayers(map)
    this.player = this.createPlayer()
    this.player.addColider(layers.platformColiders)
  }

  createMap() {
    const map = this.make.tilemap({ key: 'map' })
    map.addTilesetImage('tileset', 'tileset')
    return map;
  }

  createLayers(map) {
    const tileset = map.getTileset('tileset');
    const platformColiders = map.createStaticLayer('platform_coliders', tileset)
    const envoirement = map.createStaticLayer('envoirement', tileset)
    const platforms = map.createStaticLayer('platforms', tileset)

    // platformColiders.setCollisionByExclusion(-1, true)
    platformColiders.setCollisionByProperty({ colider: true })

    return { platforms, envoirement, platformColiders }
  }

  createPlayer() {
    return new Player(this, 200, 100)
  }


}

export default PlayScene