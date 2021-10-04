import Phaser from 'phaser';
import Player from '../entities/player';
import Enemies from '../groups/enemies';
import Collectables from '../groups/collectables';
import Scorebar from '../hud/scorebar';
import { EVENTS_TYPES } from '../types';
import EventEmitter from '../events/emitter'

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create({gameStatus}) {
    const map = this.createMap();
    this.score = 0
    if (gameStatus !== EVENTS_TYPES.PLAYER_LOOSE) this.createEventHandler()
    this.createLayers(map);
    this.getPlayerZone(this.layers.playerZone);
    this.createPlayer(this.playerZone.start);
    this.createEnemies(this.layers.enemiesZone);
    this.createCollectables(this.layers.collectables);
    this.createColiders(this.player, [{
      object: this.layers.platformColiders,
      callback: this.player.touchedFloor,
    }, {
      object: this.enemies,
      callback: this.player.hited,
    }, {
      object: this.enemies.getProjectiles(),
      callback: this.hitedByProjectile,
    }, {
      object: this.layers.traps,
      callback: this.hitedByTraps,
    },
    ]);
    this.createColiders(this.enemies, [{
      object: this.player.projectiles,
      callback: this.onFiredEnemy,
    }]);
    this.createColiders(this.enemies, [{
      object: this.layers.platformColiders,
      callback: null,
    }]);

    this.createColiders(this.player.projectiles, [{
      object: this.layers.platformColiders,
      callback: this.onHitPlaftormByProjectile
    }]);

    this.player.melee.addOverlap(this.enemies, this.onSwordEnemy)
    this.player.addOverlap(this.collectables, this.onCollectCollectables, this)
    this.setupfollowingCameraOn();
    this.createEndLevel(this.playerZone.end);
    this.createScoreBar()
  }

  createEventHandler() {
    EventEmitter.on(EVENTS_TYPES.PLAYER_LOOSE, () => {
      this.scene.restart({ gameStatus: EVENTS_TYPES.PLAYER_LOOSE })
    })
  }
  
  createScoreBar() {
    this.scoreBar = new Scorebar(this)
  }

  hitedByTraps(player, trap) {
    trap.damage = trap.properties.damage
    player.hited(player, trap)
  }

  onFiredEnemy(enemy, projectile) {
    enemy.takeHit(projectile)
    projectile.hit('hit-effect-anim')
  }

  hitedByProjectile(player, projectile) {
    player.hited(player, projectile);
    projectile.hit('fireball_hit')
  }

  onSwordEnemy(melee, enemy) {
    enemy.takeHit(melee)
    melee.hit(enemy);
  }


  onHitPlaftormByProjectile(projectile) {
    projectile.hit('iceball_hit')
  }

  onCollectCollectables(player, collected) {
    this.score += collected.score;
    collected.disableBody(true, true)
    this.scoreBar.updateScore(this.score)
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
    const envoirement = map.createStaticLayer('envoirement', tileset).setDepth(-3);
    const platforms = map.createStaticLayer('platforms', tileset);
    const traps = map.createStaticLayer('traps', tileset).setDepth(-2);
    const playerZone = map.getObjectLayer('player_zone');
    const enemiesZone = map.getObjectLayer('enemies_zone');
    const collectables = map.getObjectLayer('collectables');
    traps.setCollisionByExclusion(-1, true)
    platformColiders.setCollisionByProperty({
      colider: true,
    });

    this.layers = {
      platforms,
      envoirement,
      platformColiders,
      playerZone,
      enemiesZone,
      collectables,
      traps
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

  createCollectables(collectablesLayer) {
    this.collectables = new Collectables(this)
    this.collectables.addCollectableFromLayer(collectablesLayer)
  }

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