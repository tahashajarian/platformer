import Phaser from 'phaser';
import {
  SECENE_NAMES
} from '../types';

class PreloadScene extends Phaser.Scene {
  constructor(config) {
    super('PreloadScene');
    this.config = config
  }

  preload() {
    this.load.tilemapTiledJSON('level_1', 'assets/level_1.json');
    this.load.tilemapTiledJSON('level_2', 'assets/level_2.json');
    this.load.tilemapTiledJSON('level_3', 'assets/level_3.json');
    this.load.tilemapTiledJSON('level_4', 'assets/level_4.json');
    this.load.tilemapTiledJSON('level_5', 'assets/level_5.json');
    this.load.tilemapTiledJSON('level_6', 'assets/level_6.json');
    this.load.tilemapTiledJSON('level_7', 'assets/level_7.json');
    this.load.tilemapTiledJSON('level_8', 'assets/level_8.json');
    this.load.tilemapTiledJSON('level_9', 'assets/level_9.json');
    this.load.tilemapTiledJSON('level_10', 'assets/level_10.json');
    this.load.tilemapTiledJSON('level_11', 'assets/level_11.json');
    this.load.image('tileset', 'assets/main_lev_build_1.png');
    this.load.image('bg_color_tile', 'assets/bg_color_tile.png');
    this.load.image('bg_spikes', 'assets/bg_spikes.png')
    this.load.image('bg_sky_play', 'assets/bg_sky_play.png')
    // this.load.image('heart', 'assets/heart.gif');
    this.load.image('arrow', 'assets/arrow.png');
    this.load.image('menu-bg', 'assets/menu-bg.jpg');
    this.load.image('menu-bg-mobile', 'assets/menu-bg-mobile.jpg');
    this.load.spritesheet('door', 'assets/door2.png', {
      frameWidth: 67,
      frameHeight: 64,
      spacing: 1
    });

    this.load.image('diamond', 'assets/collectables/diamond.png')
    this.load.image('diamond_shine_1', 'assets/collectables/diamond_big_01.png')
    this.load.image('diamond_shine_2', 'assets/collectables/diamond_big_02.png')
    this.load.image('diamond_shine_3', 'assets/collectables/diamond_big_03.png')
    this.load.image('diamond_shine_4', 'assets/collectables/diamond_big_04.png')
    this.load.image('diamond_shine_5', 'assets/collectables/diamond_big_05.png')
    this.load.image('diamond_shine_6', 'assets/collectables/diamond_big_06.png')
    this.load.spritesheet('player', 'assets/player/move_sprite_1.png', {
      frameWidth: 32,
      frameHeight: 38,
      spacing: 32,
    });
    this.load.spritesheet('birdman', 'assets/enemy/enemy_sheet.png', {
      frameWidth: 32,
      frameHeight: 64,
      spacing: 32,
    });
    this.load.spritesheet('snakyman', 'assets/enemy/enemy_sheet_2.png', {
      frameWidth: 32,
      frameHeight: 64,
      spacing: 32,
    });
    this.load.image('iceball_1', 'assets/weapons/iceball_001.png');
    this.load.image('iceball_2', 'assets/weapons/iceball_002.png');
    this.load.image('cloud', 'assets/cloud.png');
    this.load.image('back', 'assets/back.png');
    this.load.image('pause', 'assets/pause.png');
    this.load.image('sound', 'assets/sound.png');
    this.load.image('sound-on', 'assets/sound-on.png');
    this.load.image('sound-off', 'assets/sound-off.png');
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
      frameWidth: 32,
      frameHeight: 38,
      spacing: 32,
    });
    this.load.spritesheet('player-slide', 'assets/player/slide_sheet.png', {
      frameWidth: 32,
      frameHeight: 38,
      spacing: 32,
    });
    this.load.image('slide', 'assets/player/slide.png')
    this.load.spritesheet('hit-effect', 'assets/weapons/hit_effect_sheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sword', 'assets/weapons/sword_sheet_1.png', {
      frameWidth: 52,
      frameHeight: 32,
      spacing: 16,
    });

    this.load.spritesheet('heart', 'assets/heart-anim.png', {
      frameWidth: 26,
      frameHeight: 25,
      spacing: 24
    });

    /// load sounds file
    this.load.audio('jump', 'assets/music/jump.wav')
    this.load.audio('coin_pickup', 'assets/music/coin_pickup.wav')
    this.load.audio('menu_music', 'assets/music/menu_music.wav')
    this.load.audio('impact', 'assets/music/impact.wav')
    this.load.audio('projectile_launch', 'assets/music/projectile_launch.wav')
    this.load.audio('step_mud', 'assets/music/step_mud.wav')
    this.load.audio('swipe', 'assets/music/swipe.wav')
    this.load.audio('theme_music', 'assets/music/theme_music.wav')
    this.load.audio('victory1', 'assets/music/victory1.wav')
    this.load.audio('victory2', 'assets/music/victory2.wav')
    this.load.audio('die', 'assets/music/die.wav')
    this.createLoader();
  }

  createLoader() {
    const {
      width,
      height
    } = this.config;
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0x00008b, 0x00008b, 0x87cefa, 0x87cefa, 1);
    graphics.fillRect(0, 0, this.config.width, this.config.height);
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 140, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 130, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.startGame()
    });
  }

  startGame() {
    this.registry.set('level', 1)
    this.registry.set('unlockeds_levels', 1)
    this.scene.start(SECENE_NAMES.MENU_SCENE);
  }
}

export default PreloadScene;