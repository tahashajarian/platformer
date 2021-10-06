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