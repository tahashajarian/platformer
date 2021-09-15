import Phaser from 'phaser';
import Player from '../entities/player';
import Enemies from '../groups/enemies';

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create() {
    const map = this.createMap();
    this.createLayers(map);
    this.getPlayerZone(this.layers.playerZone);
    this.createPlayer(this.playerZone.start);
    this.createEnemies(this.layers.enemiesZone);
    this.createColiders(this.player, [this.layers.platformColiders, this.enemies]);
    this.createColiders(this.enemies, [this.layers.platformColiders]);
    this.setupfollowingCameraOn();
    this.createEndLevel(this.playerZone.end);
  }

  createMap() {
    const map = this.make.tilemap({
      key: 'map',
    });
    map.addTilesetImage('tileset', 'tileset');
    return map;
  }

  createLayers(map) {
    const tileset = map.getTileset('tileset');
    const platformColiders = map.createStaticLayer(
      'platform_coliders',
      tileset,
    );
    const envoirement = map.createStaticLayer('envoirement', tileset);
    const platforms = map.createStaticLayer('platforms', tileset);
    const playerZone = map.getObjectLayer('player_zone');
    const enemiesZone = map.getObjectLayer('enemies_zone');
    // platformColiders.setCollisionByExclusion(-1, true)
    platformColiders.setCollisionByProperty({
      colider: true,
    });

    this.layers = {
      platforms,
      envoirement,
      platformColiders,
      playerZone,
      enemiesZone,
    };
  }

  createPlayer(zone) {
    this.player = new Player(this, zone.x, zone.y);
  }

  createEnemies(enemiesZone) {
    this.enemies = new Enemies(this);
    const zones = enemiesZone.objects;
    const types = this.enemies.getTypes();

    zones.forEach((zone) => {
      const enemy = new types[zone.type](this, zone.x, zone.y);
      this.enemies.add(enemy);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createColiders(item, coliders) {
    coliders.forEach((colid) => {
      item.addColider(colid);
    });
  }

  setupfollowingCameraOn() {
    const {
      height,
      width,
      mapOffset,
      zoom,
    } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(zoom);
    this.cameras.main.startFollow(this.player);
  }

  getPlayerZone(zoneLayer) {
    const playerZone = zoneLayer.objects;
    this.playerZone = {
      start: playerZone.find((zone) => zone.name === 'start'),
      end: playerZone.find((zone) => zone.name === 'end'),
    };
  }

  createEndLevel(end) {
    const endLevel = this.physics.add
      .sprite(end.x, end.y, 'end')
      .setAlpha(0)
      .setSize(5, 200)
      .setOrigin(0.5, 1);

    const elOverlap = this.physics.add.overlap(this.player, endLevel, () => {
      // eslint-disable-next-line no-console
      console.log('player got end level hooooooooo');
      elOverlap.active = false;
    });
  }
}

export default PlayScene;
