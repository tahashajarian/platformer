import SpriteEffect from "./sprite-effect"

export default class EffectManager {
  constructor(scene) {
    this.scene = scene
  }

  playEffectOn(effectName, target, facingRight) {
    const effect = new SpriteEffect(this.scene, 0, 0, effectName, facingRight)
    effect.playOn(target)
  }
}

