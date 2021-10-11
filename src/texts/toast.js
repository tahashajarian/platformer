import Phaser from "phaser";

class Toast extends Phaser.GameObjects.Text {
  constructor(scene, text) {
    super(scene, 0, 0, text, {
      fontSize: 45
    })
    scene.add.existing(this)
    this.setOrigin(0.5, 1)
    this.setScrollFactor(0)
    const { width, height } = scene.config
    this.x = width / 2;
    this.y = height / 2
    this.scene.time.addEvent({
      delay: 3000,
      callback: () => this.destroy()
    })
  }
}

export default Toast;