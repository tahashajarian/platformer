/* eslint-disable import/prefer-default-export */
import Birdman from '../entities/birdman';
import Snakyman from '../entities/snakyman';

export const ENEMY_TYPES = {
  Birdman,
  Snakyman,
};

export const EVENTS_TYPES = {
  PLAYER_LOOSE: 'PLAYER_LOOSE'
}

export const SECENE_NAMES = {
  PLAY_SCENE: 'PlayScene',
  PRELOAD_SCENE: 'PreloadScene',
  MENU_SCENE: 'MenuScene',
  LEVEL_SCENE: 'LevelScene',
  PAUSE_SCENE: 'PauseScene',
}

export const SOUNDS = {
  jump: 'jump',
  coin_pickup: 'coin_pickup',
  menu_music: 'menu_music',
  impact: 'impact',
  projectile_launch: 'projectile_launch',
  step_mud: 'step_mud',
  swipe: 'swipe',
  theme_music: 'theme_music',
  victory1: 'victory1',
  victory2: 'victory2',
  die: 'die'
}