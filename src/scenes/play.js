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
    this.createColiders(this.player, [{
      object: this.layers.platformColiders,
      callback: this.player.touchedFloor,
    }, {
      object: this.enemies,
      callback: this.player.hited,
    }]);
    this.createColiders(this.enemies, [{
      object: this.player.projectiles,
      callback: this.onFiredEnemy,
    }]);
    this.createColiders(this.enemies, [{
      object: this.layers.platformColiders,
      callback: null,
    }]);
    this.setupfollowingCameraOn();
    this.createEndLevel(this.playerZone.end);
    // add graphic
    this.graphic = this.add.graphics();
    this.line = new Phaser.Geom.Line();
    this.graphic.lineStyle(1, 0x00ff00);

    this.input.on('pointerdown', this.startDrawing, this);
    this.input.on('pointerup', this.endDrawing, this);
    this.isDrawing = false;
  }

  startDrawing(pointer) {
    this.line.x1 = pointer.worldX;
    this.line.y1 = pointer.worldY;
    this.isDrawing = true;
    (this.tileHits || []).forEach((tile) => {
      if (tile.index > -1) {
        tile.setCollision(false);
      }
    });
  }

  onFiredEnemy(enemy, source) {
    enemy.takeHit(source)
  }

  endDrawing() {
    this.tileHits = this.layers.platforms.getTilesWithinShape(this.line);
    this.tileHits.forEach((tile) => {
      if (tile.index > -1) {
        tile.setCollision(true);
      }
    });
    this.isDrawing = false;
    this.drawDebug();
  }

  drawDebug() {
    this.layers.platforms.renderDebug(this.graphic, {
      tileColor: null,
    });
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
      item.addColider(colid.object, colid.callback);
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

  update() {
    if (this.isDrawing) {
      const pointer = this.input.activePointer;
      this.line.x2 = pointer.worldX;
      this.line.y2 = pointer.worldY;
      this.graphic.clear();
      this.graphic.strokeLineShape(this.line);
    }
  }
}

export default PlayScene;