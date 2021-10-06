import Phaser from "phaser";
import { detectDeviceType } from "../utils/functions";

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
    if (this.isMobile) {
      this.arrowsContainer = this.createArrowButtons()
      this.actionsButton = this.createActionsButton()
      this.add([this.arrowsContainer, this.actionsButton])
      this.fixPositon();
    }

  }


  bindEvents(actions) {

    const buttons = [
      { button: this.arrowDown, function_down: () => actions.down_down(), function_up: () => actions.down_up() },
      { button: this.aButtonText, function_down: () => { actions.a(); console.log('a clicked') } },
      { button: this.bButtonText, function_down: () => actions.b() },
    ]
    this.setUpBindEvents(buttons)
  }

  setUpBindEvents(buttons) {
    buttons.forEach(button => {
      button.button.setScrollFactor(0)
      button.button.on('pointerdown', () => {
        button.button.setTint(0xF79E00);
        button.function_down()
      })
      if (button.function_up)

        button.button.on('pointerup', () => {
          button.button.clearTint()
          if (button.function_up)
            button.function_up()
        })
      button.button.on('pointerout', () => {
        button.button.clearTint()
        if (button.function_up)
          button.function_up()
      })

    })
  }


  createArrowButtons() {
    const arrowRight = this.scene.add.image(70, 0, 'arrow').setName('right')
    const arrowLeft = this.scene.add.image(0, 0, 'arrow').setRotation(Math.PI).setName('left')
    const arrowTop = this.scene.add.image(35, -35, 'arrow').setRotation(Math.PI / 2 + Math.PI).setName('up')
    const arrowDown = this.scene.add.image(35, 35, 'arrow').setRotation(Math.PI / 2).setName('down')
    this.arrowDown = arrowDown;
    const arrowArray = [arrowRight, arrowLeft, arrowTop, arrowDown]
    this.setUpTouchEvent(arrowArray)
    const arrowsContainer = this.scene.add.container(0, 0, arrowArray)
    return arrowsContainer
  }


  createActionsButton() {
    const { width, height } = this.scene.config
    const aButtonBg = this.scene.add.graphics();
    aButtonBg.fillStyle(0x000000).setAlpha(0.6)
    aButtonBg.fillCircle(width - 130, 30, 20);
    this.aButtonText = this.scene.add.text(width - 138, 16, 'A', { fontSize: `25px`, fill: 'silver' }).setInteractive();
    this.aButton = this.scene.add.container(0, 0, [aButtonBg, this.aButtonText])

    const bButtonBg = this.scene.add.graphics();
    bButtonBg.fillStyle(0x000000).setAlpha(0.6)
    bButtonBg.fillCircle(width - 70, 30, 20);
    this.bButtonText = this.scene.add.text(width - 78, 16, 'B', { fontSize: `25px`, fill: 'silver' }).setInteractive()
    this.bButton = this.scene.add.container(0, 0, [bButtonBg, this.bButtonText])

    const actionsButton = this.scene.add.container(0, 0, [this.aButton, this.bButton])
    return actionsButton;
  }

  setUpTouchEvent(arrowArray) {
    arrowArray.forEach(arrow => {
      arrow.setInteractive();
      arrow.setScrollFactor(0)
      arrow.setAlpha(0.6)
      arrow.on('pointerdown', () => {
        arrow.setTint(0xF79E00);
        this.cursor[arrow.name].isDown = true
        this.cursor[arrow.name]._justDown = true
      })
      arrow.on('pointerup', () => {
        this.cursor[arrow.name].isDown = false
        this.cursor[arrow.name]._justDown = false
        arrow.clearTint();

      })
      arrow.on('pointerout', () => {
        this.cursor[arrow.name].isDown = false
        this.cursor[arrow.name]._justDown = false
        arrow.clearTint();
      })
    })
  }


  fixPositon() {
    this.setPosition(35, this.scene.config.height - 70)
    this.width = this.scene.config.width
  }

}

export default InputsHandler;