import Phaser from 'phaser';
import PlayScene from './scenes/play';
import PreloadScene from './scenes/preload-scene';
import MenuScene from './scenes/menu-scene'
import LevelScene from './scenes/level-scene';
import PauseScene from './scenes/pause-scene';

const WIDTH = innerWidth
const HEIGHT = innerHeight;
const MAP_WIDTH = 1920;
const MAP_HEIGHT = 1280;
const ZOOM = 1;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  mapOffsetHeight: MAP_HEIGHT > HEIGHT ? MAP_HEIGHT - HEIGHT : 0,
  zoom: ZOOM,
};

const scenes = [PreloadScene, MenuScene, LevelScene, PlayScene, PauseScene];
const initScenes = () => scenes.map((Scene) => new Scene(SHARED_CONFIG));

const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.RESIZE,
  width: SHARED_CONFIG.width,
  height: SHARED_CONFIG.height,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 400 },
      // debug: true,
    },
  },
  scene: initScenes(),
  isMute: false,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);

window.addEventListener("resize", () => {
  game.scale.resize(window.innerWidth / ZOOM, window.innerHeight / ZOOM);
}, false);