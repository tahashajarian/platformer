
import Phaser from "phaser";
import PlayScene from "./scenes/play";
import PreloadScene from "./scenes/preload-scene";


const WIDTH = 1280;
const HEIGHT = 600;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
}

const scenes = [PreloadScene, PlayScene]
const initScenes = () => scenes.map((Scene) => new Scene(SHARED_CONFIG))

const config = {
  type: Phaser.AUTO,
  width: SHARED_CONFIG.width,
  height: SHARED_CONFIG.height,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 400 },
      debug: false
    }
  },
  scene: initScenes()
};


const Game = new Phaser.Game(config);