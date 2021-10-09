import Phaser from 'phaser';
import { SECENE_NAMES } from '../types';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('level_1', 'assets/level_1.json');
    this.load.tilemapTiledJSON('level_2', 'assets/level_2.json');
    this.load.image('tileset', 'assets/main_lev_build_1.png');
    this.load.image('bg_color_tile', 'assets/bg_color_tile.png');
    this.load.image('bg_spikes', 'assets/bg_spikes.png')
    this.load.image('bg_sky_play', 'assets/bg_sky_play.png')
    this.load.image('heart', 'assets/heart.png');
    this.load.image('arrow', 'assets/arrow.png');
    this.load.spritesheet('door', 'assets/door2.png' , {
      frameWidth: 67, frameHeight: 64, spacing: 1
    });

    this.load.image('diamond', 'assets/collectables/diamond.png')
    this.load.image('diamond_shine_1', 'assets/collectables/diamond_big_01.png')
    this.load.image('diamond_shine_2', 'assets/collectables/diamond_big_02.png')
    this.load.image('diamond_shine_3', 'assets/collectables/diamond_big_03.png')
    this.load.image('diamond_shine_4', 'assets/collectables/diamond_big_04.png')
    this.load.image('diamond_shine_5', 'assets/collectables/diamond_big_05.png')
    this.load.image('diamond_shine_6', 'assets/collectables/diamond_big_06.png')
    this.load.spritesheet('player', 'assets/player/move_sprite_1.png', {
      frameWidth: 32, frameHeight: 38, spacing: 32,
    });
    this.load.spritesheet('birdman', 'assets/enemy/enemy_sheet.png', {
      frameWidth: 32, frameHeight: 64, spacing: 32,
    });
    this.load.spritesheet('snakyman', 'assets/enemy/enemy_sheet_2.png', {
      frameWidth: 32, frameHeight: 64, spacing: 32,
    });
    this.load.image('iceball_1', 'assets/weapons/iceball_001.png');
    this.load.image('iceball_2', 'assets/weapons/iceball_002.png');
    this.load.image('cloud', 'assets/cloud.png');
    this.load.image('back', 'assets/back.png');
    this.load.image('pause', 'assets/pause.png');
    this.load.image('bg_menu', 'assets/bg_menu.png');
    this.load.image('fireball_1', 'assets/weapons/improved_fireball_001.png');
    this.load.image('fireball_2', 'assets/weapons/improved_fireball_002.png');
    this.load.image('fireball_3', 'assets/weapons/improved_fireball_003.png');
    this.load.image('iceball_hit_1', 'assets/weapons/iceball_impact_001.png');
    this.load.image('iceball_hit_2', 'assets/weapons/iceball_impact_002.png');
    this.load.image('iceball_hit_3', 'assets/weapons/iceball_impact_003.png');
    this.load.image('fireball_hit_1', 'assets/weapons/improved_fireball_impact_001.png');
    this.load.image('fireball_hit_2', 'assets/weapons/improved_fireball_impact_002.png');
    this.load.image('fireball_hit_3', 'assets/weapons/improved_fireball_impact_003.png');
    this.load.spritesheet('player-throw', 'assets/player/throw_attack_sheet_1.png', {
      frameWidth: 32, frameHeight: 38, spacing: 32,
    });
    this.load.spritesheet('player-slide', 'assets/player/slide_sheet.png', {
      frameWidth: 32, frameHeight: 38, spacing: 32,
    });
    this.load.image('slide', 'assets/player/slide.png')
    this.load.spritesheet('hit-effect', 'assets/weapons/hit_effect_sheet.png', {
      frameWidth: 32, frameHeight: 32,
    });
    this.load.spritesheet('sword', 'assets/weapons/sword_sheet_1.png', {
      frameWidth: 52, frameHeight: 32, spacing: 16,
    });

    this.load.once('complete', () => {
      this.startGame()
    })
  }

  startGame() {
    this.registry.set('level', 1)
    this.registry.set('unlockeds_levels', 1)
    this.scene.start(SECENE_NAMES.MENU_SCENE);
  }
}

export default PreloadScene;
