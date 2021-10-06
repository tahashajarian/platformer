import Phaser from "phaser";

export default class Scorebar extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, scene.config.width - 50, 5)

    scene.add.existing(this)
    this.setScrollFactor(0);
    this.fontSize = 20
    this.fontColor = '#fff'
    this.margin = 5
    this.setup()
    this.setDepth(10)
  }

  setup() {
    this.createScoreBoard()
    this.add([this.scoreBoard])
    this.fixPostion()
  }

  createScoreBoard(score) {
    const scoreText = this.scene.add.text(0, 0, '0', { fontSize: `${this.fontSize}px`, fill: this.fontColor })
    const scoreImage = this.scene.add.image(scoreText.width + this.margin, this.margin, 'diamond').setOrigin(0)
    this.scoreBoard = this.scene.add.container(0, 0, [scoreText, scoreImage])
    this.scoreBoard.setName('scoreBoard')
  }

  fixPostion() {
    const items = this.getByName('scoreBoard').list;
    const offset = items.reduce((all, item) => all += item.width, 0)
    this.setPosition(this.scene.config.width - (offset + this.margin * 3), this.margin);
  }

  updateScore(score) {
    const [scoreText, scoreImage] = this.getByName('scoreBoard').list;
    scoreText.setText(score)
    scoreImage.setX(scoreText.width + this.margin)
    this.fixPostion()
  }
}