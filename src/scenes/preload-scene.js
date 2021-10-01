import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.image('tileset', 'assets/main_lev_build_1.png');
    this.load.image('heart', 'assets/heart.png');
    this.load.spritesheet('player', 'assets/player/move_sprite_1.png', {
      frameWidth: 32, frameHeight: 38, spacing: 32,
    });
    this.load.spritesheet('birdman', 'assets/enemy/enemy_sheet.png', {
      frameWidth: 32, frameHeight: 64, spacing: 32,
    });
    this.load.spritesheet('snakyman', 'assets/enemy/enemy_sheet_2.png', {
      frameWidth: 32, frameHeight: 64, spacing: 32,
    });
    this.load.image('iceball', 'assets/weapons/iceball_002.png');
    this.load.spritesheet('player-throw', 'assets/player/throw_attack_sheet_1.png', {
      frameWidth: 32, frameHeight: 38, spacing: 32,
    });
    this.load.spritesheet('hit-effect', 'assets/weapons/hit_effect_sheet.png', {
      frameWidth: 32, frameHeight: 32,
    });
    this.load.spritesheet('sword', 'assets/weapons/sword_sheet_1.png', {
      frameWidth: 52, frameHeight: 32, spacing: 16,
    });
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default PreloadScene;
