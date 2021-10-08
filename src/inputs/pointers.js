
export default class HandlePointers {
  constructor(scene) {
    this.scene = scene;
    this.init();
    console.log('i am callded')
  }

  init() {
    this.handleInput(this.scene.input.pointer1, 1)
    this.handleInput(this.scene.input.pointer2, 2)
  }

  handleInput(pointer, index) {
    if (pointer) {
      console.log('pointer down', index)
    }
  }
}

