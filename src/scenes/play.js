import Phaser from 'phaser'
import Player from '../entities/player';

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene')
    this.config = config
  }

  create() {
    const map = this.createMap();
    const layers = this.createLayers(map)
    this.player = this.createPlayer()
    this.player.addColider(layers.platformColiders)
    this.setupfollowingCameraOn(this.player)
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

  setupfollowingCameraOn(player) {
    const { height, width, mapOffset, zoom } = this.config
    console.log(this.config)
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200)
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoom)
    this.cameras.main.startFollow(player)
  }


}

export default PlayScene