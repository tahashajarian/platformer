import Phaser from "phaser";
import { detectDeviceType, getTimeStamp } from "../utils/functions";

class InputsHandler extends Phaser.GameObjects.Container {
  constructor(scene, cursor) {
    super(scene)
    scene.add.existing(this)
    this.setScrollFactor(0);
    this.init();
    this.backgroundColor = 0xff00ff
    this.setDepth(12)
    this.cursor = cursor
  }

  init() {
    this.isMobile = detectDeviceType();
    if (this.isMobile || true) {
      this.arrowsContainer = this.createArrowButtons()
      this.setInterActiveArrowConter()
      // this.actionsButton = this.createActionsButton()
      this.add([this.arrowsContainer])
      this.fixPositon();
    }

  }


  bindEvents({
    down_down,
    down_up,
    oneTap,
    dbTap
  }) {
    this.down_down = down_down
    this.down_up = down_up
    this.oneTap = oneTap
    this.dbTap = dbTap
  }

  createArrowButtons() {
    const { width, height } = this.scene.config
    const arrowsContainer = this.scene.add.text(0, 0, '').setOrigin(0).setSize(width, height);
    arrowsContainer.setAlpha(0.5)
    return arrowsContainer
  }


  setInterActiveArrowConter() {
    this.arrowsContainer.setInteractive().setDepth(15);
    this.arrowsContainer.setScrollFactor(0, 0);
    this.arrowsContainer.on('pointerdown', (e) => {
      this.pointerDown = { x: e.downX, y: e.downY };
      this.isPointerDown = true
    })
    this.arrowsContainer.on('pointermove', (e) => {
      this.pointerMove = { x: e.x, y: e.y };
      if (this.isPointerDown) {
        this.detectMovement(this.pointerDown, this.pointerMove);
      }
    })
    this.currentTap = 0;
    this.arrowsContainer.on('pointerup', (e) => {
      this.isPointerDown = false
      this.previousTap = this.currentTap;
      this.currentTap = getTimeStamp()
      this.pointerUp = { x: e.upX, y: e.upY };
      this.setAllCursorFalse();
      this.checkShoot(this.pointerDown, this.pointerUp);
    })
    this.arrowsContainer.on('pointerout', (e) => {
      this.isPointerDown = false
      this.setAllCursorFalse();
    })
  }


  fixPositon() {
    this.setPosition(0, 0)
    this.width = this.scene.config.width
  }

  checkShoot(start, end) {
    const xDistance = start.x - end.x
    const yDistance = start.y - end.y;
    const xDistanceAbs = Math.abs(xDistance)
    const yDistanceAbs = Math.abs(yDistance)
    this.delayDblClick = 200
    if (xDistanceAbs <= 15 && yDistanceAbs <= 15) {
      if (this.currentTap - this.previousTap > this.delayDblClick) {
        this.timeOutToOnTap = setTimeout(() => {
          this.oneTap();
        }, this.delayDblClick);
      } else {
        clearTimeout(this.timeOutToOnTap)
        this.dbTap();
      }
    }
  }

  detectMovement(start, move) {
    // this.setAllCursorFalse()
    const xDistance = start.x - move.x
    const yDistance = start.y - move.y;
    const xDistanceAbs = Math.abs(xDistance)
    const yDistanceAbs = Math.abs(yDistance)
    if (xDistanceAbs > 50) {
      if (xDistance > 0) {
        this.cursor.left.isDown = true
      } else {
        this.cursor.right.isDown = true
      }
    }
    if (yDistanceAbs > 50) {
      if (yDistance < 0) {
        if (!this.cursor.down.isDown) {
          this.down_down()
        }
        this.cursor.down.isDown = true
      } else {
        if (!this.cursor.up.isDown) {
          this.cursor.up._justDown = true
        }
        this.cursor.up.isDown = true
      }
    }
  }

  setAllCursorFalse() {
    if (this.cursor.down.isDown) {
      this.down_up()
    }
    this.cursor.right.isDown = false
    this.cursor.left.isDown = false
    this.cursor.down.isDown = false
    this.cursor.up.isDown = false
  }

}

export default InputsHandler;