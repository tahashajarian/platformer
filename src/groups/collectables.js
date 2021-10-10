import Phaser from "phaser";
import Diamond from "../collectables/diamond";

export default class Collectables extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.createFromConfig({
      classType: Diamond,
    })
  }

  mapProperties(properties) {
    if (!properties || properties.length === 0) return {};
    const combinedProperties = {};
    properties.forEach(propertie => {
      combinedProperties[propertie.name] = propertie.value
    })
    return combinedProperties
  }

  addCollectableFromLayer(layer) {
    const { score: defalutScore, type: defaultType } = this.mapProperties(layer.properties)
    layer.objects.forEach(collect => {
      const { score, type } = this.mapProperties(collect.properties);
      const collectable = this.get(collect.x, collect.y, type || defaultType).setDepth(-1);
      collectable.score = score || defalutScore
      collectable.typeCollect = type 
    })
  }
}