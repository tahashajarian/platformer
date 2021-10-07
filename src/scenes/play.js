import Phaser from 'phaser';
import Player from '../entities/player';
import Enemies from '../groups/enemies';
import Collectables from '../groups/collectables';
import Scorebar from '../hud/scorebar';
import {
  EVENTS_TYPES,
  SECENE_NAMES
} from '../types';
import EventEmitter from '../events/emitter'

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');
    this.config = config;
  }

  create({
    gameStatus
  }) {
    this.score = 0
    this.createMap();
    if (gameStatus !== EVENTS_TYPES.PLAYER_LOOSE) this.createEventHandler()
    this.createLayers(this.map);
    this.getPlayerZone(this.layers.playerZone);
    this.createPlayer(this.playerZone.start);
    this.createEnemies(this.layers.enemiesZone);
    this.createBG();
    this.createCollectables(this.layers.collectables);
    this.createAllCoillisions()
    this.setupfollowingCameraOn();
    this.createEndLevel(this.playerZone.end);
    this.createScoreBar()
    this.createBackButton();
    this.listenToEvents()
  }

  createAllCoillisions() {
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
    },]);
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
  }


  listenToEvents() {
    if (!this.eventListener) {
      this.eventListener = this.events.on("resume", () => {
        this.physics.resume();
      });
    }
    this.escPressListener = this.input.keyboard.on('keydown-ESC', () => {
      this.pauseGame();
    })
  }

  createBackButton() {
    const pauseButton = this.add
      .image(15, 15, "pause").setDepth(16)
      .setInteractive()
      .setOrigin(0)
      .setScale(3);
    pauseButton.setScrollFactor(0)

    pauseButton.on("pointerdown", () => {
      this.pauseGame();
    });
  }

  pauseGame() {
    this.isPaused = true;
    this.physics.pause();
    this.scene.pause();
    this.scene.launch(SECENE_NAMES.PAUSE_SCENE);
  }


  createEventHandler() {
    EventEmitter.on(EVENTS_TYPES.PLAYER_LOOSE, () => {
      this.scene.restart({
        gameStatus: EVENTS_TYPES.PLAYER_LOOSE
      })
    })
  }

  createScoreBar() {
    this.scoreBar = new Scorebar(this)
  }

  createBG() {
    const bgObject = this.map.getObjectLayer('bg_spikes').objects[0]
    this.BgSpikes = this.add.tileSprite(bgObject.x, bgObject.y, this.config.width, bgObject.height, 'bg_spikes')
      .setOrigin(0, 1)
      .setDepth(-10)
      .setScrollFactor(0, 1)

    this.BGSkyPlay = this.add.tileSprite(0, 0, this.config.width, 180, 'bg_sky_play')
      .setOrigin(0, 0)
      .setDepth(-11)
      .setScrollFactor(0, 1)
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
    this.map = this.make.tilemap({
      key: `level_${this.getCurrentLevel()}`,
    });
    this.map.addTilesetImage('tileset', 'tileset');
    this.map.addTilesetImage('bg_color_tile', 'bg_color_tile');
  }

  createLayers(map) {
    const tileset = map.getTileset('tileset');
    const bg_color_tile = map.getTileset('bg_color_tile')
    const platformColiders = map.createStaticLayer(
      'platform_coliders',
      tileset,
    ).setAlpha(0);
    const envoirement = map.createStaticLayer('envoirement', tileset).setDepth(-3);
    const platforms = map.createStaticLayer('platforms', tileset);
    map.createStaticLayer('bg_color_tile', bg_color_tile).setDepth(-12);
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
      mapOffsetHeight,
      zoom,
    } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height + mapOffsetHeight + 100);
    this.cameras.main.setBounds(0, 0, width + mapOffset, height + mapOffsetHeight).setZoom(zoom);
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
      this.registry.inc('level');
      const unlockeds_levels = this.registry.get('unlockeds_levels');
      if (this.getCurrentLevel() + 1 >= unlockeds_levels) {
        this.registry.inc('unlockeds_levels')
      }
      this.scene.restart({
        gameStatus: "LEVEL_COMPELETED"
      })

    });
  }

  getCurrentLevel() {
    return this.registry.get('level') || 1
  }

  update() {
    this.BgSpikes.tilePositionX = this.cameras.main.scrollX * 0.3
    this.BGSkyPlay.tilePositionX = this.cameras.main.scrollX * 0.1
  }

}

export default PlayScene;