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
    this.playerZone = this.getPlayerZone(layers.playerZone)
    this.player = this.createPlayer(this.playerZone.start)
    this.player.addColider(layers.platformColiders)
    this.setupfollowingCameraOn()
    this.createEndLevel(this.playerZone.end)


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
    const playerZone = map.getObjectLayer('player_zone');

    // platformColiders.setCollisionByExclusion(-1, true)
    platformColiders.setCollisionByProperty({ colider: true })

    return { platforms, envoirement, platformColiders, playerZone }
  }

  createPlayer(zone) {
    return new Player(this, zone.x, zone.y)
  }

  setupfollowingCameraOn() {
    const { height, width, mapOffset, zoom } = this.config
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200)
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoom)
    this.cameras.main.startFollow(this.player)
  }

  getPlayerZone(zoneLayer) {
    const playerZone = zoneLayer.objects;
    return {
      start: playerZone.find(zone => zone.name === 'start'),
      end: playerZone.find(zone => zone.name === 'end')
    }
  }

  createEndLevel(end) {
    const endLevel = this.physics.add.sprite(end.x, end.y, 'end')
      .setAlpha(0)
      .setSize(5, 200)
      .setOrigin(0.5, 1)

    const elOverlap = this.physics.add.overlap(this.player, endLevel, () => {
      console.log('player got end level hooooooooo')
      elOverlap.active = false
    })
  }

}

export default PlayScene