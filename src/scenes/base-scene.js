import Phaser from "phaser";
import { SECENE_NAMES } from "../types";

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.centerScreen = [config.width / 2, config.height / 2];
    this.fontStyle = {
      fontSize: "45px",
      fill: "#000"
    };
    this.lineHeight = 60;
    this.getLocalStorage();
  }

  getLocalStorage() {
    this.localStorage = localStorage.getItem('user-data');
  }

  create() {
    this.bg = this.add.image(0, 0, "bg_menu").setOrigin(0);
    this.bg.setScale(this.config.width / this.bg.width, this.config.height / this.bg.height)
    // this.bg.setDisplaySize(this.config.width, this.config.height);
    // const graphics = this.add.graphics();
    // graphics.fillGradientStyle(0x00008b, 0x00008b, 0x87cefa, 0x87cefa, 1);
    // graphics.fillRect(0, 0, this.config.width, this.config.height);

    this.listenToResize();
    this.createClouds();
  }

  createClouds() {
    this.clouds = this.physics.add.group();
    for (let i = 0; i < 9; i++) {
      const cloud = this.clouds.create(0, 0, "cloud");
      this.placeCloud(cloud);
    }
    this.clouds.setVelocity(-30, 0);
  }

  placeCloud(cloud) {
    const cloundHorizontalDistance =
      this.getRightLastCloud() + Phaser.Math.Between(200, 400);
    const cloundPositionRange = Phaser.Math.Between(20, 200);
    cloud.x = cloundHorizontalDistance;
    cloud.y = cloundPositionRange;
    cloud.setScale(Math.random() * (0.7 - 0.3) + 0.3);
  }

  getRightLastCloud() {
    let rightLastCloud = 0;
    const arrayClouds = this.clouds.getChildren();
    arrayClouds.forEach((cloud) => {
      rightLastCloud = cloud.x > rightLastCloud ? cloud.x : rightLastCloud;
    });
    return rightLastCloud;
  }

  listenToResize() {
    window.addEventListener("resize", () => {
      // TODO: fix it later
      this.config.width = window.innerWidth;
      this.config.height = window.innerHeight;
      window.location.reload();
    });
  }

  createMenus(menu) {
    let lastItmeMenuY = 0;
    menu.forEach((menuItem) => {
      if (menuItem.text === 'back') {
        this.setUpBack(menuItem)
      } else {
        const textPosition = [
          this.centerScreen[0],
          this.centerScreen[1] + lastItmeMenuY,
        ];
        menuItem.textGO = this.add
          .text(...textPosition, menuItem.text, this.fontStyle)
          .setOrigin(0.5, 1);
        lastItmeMenuY += this.lineHeight;
        this.setUpMenuEvent(menuItem);
      }
    });
  }

  setUpMenuEvent(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on('pointerover', () => {
      textGO.setStyle({
        fill: '#ff0'
      })
    })

    textGO.on('pointerout', () => {
      textGO.setStyle({
        fill: this.fontStyle.fill
      })
    })

    textGO.on('pointerup', () => {
      if (menuItem.onclick) {
        menuItem.onclick();
      }
      if (menuItem.text === 'Resume') {
        this.scene.stop()
        this.scene.resume(menuItem.scene)
      } else {
        this.scene.stop(SECENE_NAMES.PLAY_SCENE)
        this.scene.start(menuItem.scene)
      }
    })
  }

  setUpBack(menu) {
    const backMenu = this.add.image(this.config.width - 10, this.config.height - 10, 'back')
      .setOrigin(1)
      .setScale(2)

    backMenu.setInteractive()
    backMenu.on('pointerover', () => {
      backMenu.setScale(2.1)
    })

    backMenu.on('pointerout', () => {
      backMenu.setScale(2)
    })

    backMenu.on('pointerup', () => {
      this.scene.start(menu.scene)
    })
  }

  update() {
    const arrayClouds = this.clouds.getChildren();
    arrayClouds.forEach((cloud) => {
      if (cloud.getBounds().right < 0) {
        this.placeCloud(cloud);
      }
    });
  }
}

export default BaseScene;