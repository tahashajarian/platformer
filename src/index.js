import Phaser from 'phaser';
import PlayScene from './scenes/play';
import PreloadScene from './scenes/preload-scene';

const WIDTH = document.body.offsetWidth;
const HEIGHT = 600;
const MAP_WIDTH = 1600;
const ZOOM = 1;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  zoom: ZOOM,
};

const scenes = [PreloadScene, PlayScene];
const initScenes = () => scenes.map((Scene) => new Scene(SHARED_CONFIG));

const config = {
  type: Phaser.AUTO,
  width: SHARED_CONFIG.width,
  height: SHARED_CONFIG.height,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 400 },
      debug: false,
    },
  },
  scene: initScenes(),
};

// eslint-disable-next-line no-unused-vars
const Game = new Phaser.Game(config);
