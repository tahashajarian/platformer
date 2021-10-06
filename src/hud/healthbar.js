import Phaser from "phaser";

export default class HealthBar {
	constructor(scene, x, y, health) {
		this.bar = new Phaser.GameObjects.Graphics(scene);
		this.x = x;
		this.y = y;
		this.health = health;
		this.scene = scene;
		this.size = {
			width: 250,
			height: 4,
		};
		scene.add.existing(this.bar);
		this.draw(this.health);
		this.bar.setScrollFactor(0, 0)
		this.bar.setDepth(10)
	}

	draw(health) {
		if (health < 0) health = 0
		this.bar.clear();
		this.bar.fillStyle(0x777777);
		this.bar.fillRect(this.x, this.y, this.size.width, this.size.height)
		let color;
		const value = health / this.health
		if (value > 0.5) {
			color = 0x009e06
		} else if (value >= 0.3) {
			color = 0xb9bd07;
		} else {
			color = 0xec0b0b;
		}
		this.bar.fillStyle(color);
		this.bar.fillRect(this.x, this.y, this.size.width * value, this.size.height)
	}
}