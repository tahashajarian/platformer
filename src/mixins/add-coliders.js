export default {
  addColider(gameObject, callback) {
    this.scene.physics.add.collider(this, gameObject, callback, null, this)
  }
}