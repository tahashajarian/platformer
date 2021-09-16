export default {
  addColider(gameObject, callback) {
    this.scene.physics.add.collider(this, gameObject, callback, null, this);
  },
  bodyPositionDifferenceX: 0,
  firstRun: true,
  raycast(body, pixleToCheckTileHit, angel) {
    if (this.hasHit === false) this.hasHit = true;
    const {
      x, y, width, halfHeight,
    } = body;
    this.bodyPositionDifferenceX += body.x - body.prev.x;
    if ((Math.abs(this.bodyPositionDifferenceX) >= pixleToCheckTileHit) || this.firstRun) {
      // eslint-disable-next-line no-undef
      this.ray = new Phaser.Geom.Line();
      if (body.velocity.x > 0) {
        this.ray.x1 = x + width;
        this.ray.y1 = y + halfHeight;
        this.ray.x2 = this.ray.x1 + this.rayLength * angel;
        this.ray.y2 = this.ray.y1 + this.rayLength;
      } else {
        this.ray.x1 = x;
        this.ray.y1 = y + halfHeight;
        this.ray.x2 = this.ray.x1 - this.rayLength * angel;
        this.ray.y2 = this.ray.y1 + this.rayLength;
      }
      this.hasHit = false;
      const tileHits = this.scene.layers.platforms.getTilesWithinShape(this.ray);
      if (tileHits.length) {
        this.hasHit = tileHits.some((hit) => hit.index > -1);
      }
      this.bodyPositionDifferenceX = 0;
      this.firstRun = false;
    }
  },
};
