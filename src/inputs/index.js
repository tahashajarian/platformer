import {
  detectDeviceType,
  getTimeStamp
} from "../utils/functions";

class InputsHandler {
  constructor(scene, cursor) {
    this.cursor = cursor;
    this.scene = scene;
    this.init();
  }

  init() {
    this.isMobile = detectDeviceType();
    if (this.isMobile) {
      this.handlePointers()
    }
    this.pointers = {
      1: {},
      2: {}
    }
    this.scene.input.addPointer(2)
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

  handlePointers() {

    this.scene.input.on('pointerdown', (e) => {
      this.pointers[e.id].pointerDown = {
        x: e.downX,
        y: e.downY
      };
      this.pointers[e.id].isDown = true;
    })
    this.scene.input.on('pointermove', (e) => {
      this.pointers[e.id].move = {
        x: e.x,
        y: e.y,
      };
      if (this.pointers[e.id].isDown) {
        this.detectMovement(this.pointers[e.id], e.id);
      }
    })
    this.scene.input.on('pointerup', (e) => {
      this.pointers[e.id].isDown = false;
      this.pointers[e.id].previousTap = this.pointers[e.id].currentTap;
      this.pointers[e.id].currentTap = getTimeStamp()
      this.pointers[e.id].pointerUp = {
        x: e.upX,
        y: e.upY,
      };
      this.checkShoot(this.pointers[e.id]);
      this.setAllCursorFalse(e.id);
    })
    this.scene.input.on('pointerout', (e) => {
      this.pointers[e.id].isDown = false;
      this.setAllCursorFalse(e.id);
    })
  }


  checkShoot({
    pointerDown: start,
    pointerUp: end,
    previousTap,
    currentTap
  }) {

    const xDistance = start.x - end.x
    const yDistance = start.y - end.y;
    const xDistanceAbs = Math.abs(xDistance)
    const yDistanceAbs = Math.abs(yDistance)
    this.delayDblClick = 200
    if (xDistanceAbs <= 15 && yDistanceAbs <= 15) {
      if (currentTap - previousTap > this.delayDblClick) {
        this.timeOutToOnTap = setTimeout(() => {
          this.oneTap();
        }, this.delayDblClick);
      } else {
        clearTimeout(this.timeOutToOnTap)
        this.dbTap();
      }
    }
  }

  detectMovement({
    pointerDown: start,
    move
  }, id) {
    const xDistance = start.x - move.x
    const yDistance = start.y - move.y;
    const xDistanceAbs = Math.abs(xDistance)
    const yDistanceAbs = Math.abs(yDistance)
    if ((this.cursor.right.isDown && this.cursor.left.isDown) || (this.cursor.up.isDown && this.cursor.down.isDown)) {
      this.setAllCursorFalse();
    }
    if (xDistanceAbs > 50) {
      if (xDistance > 0) {
        this.cursor.left.isDown = true
      } else {
        this.cursor.right.isDown = true
      }
    }
    if (yDistanceAbs > 80) {
      if (yDistance < 0) {
        if (!this.cursor.down.isDown) {
          this.down_down()
        }
        this.cursor.down.isDown = true
        this.causeDown = id

      } else {
        if (!this.cursor.up.isDown) {
          this.cursor.up._justDown = true
        }
        this.cursor.up.isDown = true
        this.causeUp = id
      }
    }
  }

  setAllCursorFalse(cause) {
    if (this.causeUp === cause) {
      this.cursor.up.isDown = false
    }
    if (this.causeDown === cause) {
      if (this.cursor.down.isDown) {
        this.down_up()
      }
      this.cursor.down.isDown = false
    }
    this.cursor.right.isDown = false
    this.cursor.left.isDown = false
  }

}

export default InputsHandler;