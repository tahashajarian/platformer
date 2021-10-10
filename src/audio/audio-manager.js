import { SOUNDS } from "../types";

export default class AudioManager {
	constructor(scene) {
		this.scene = scene;
		this.jump = this.scene.sound.add(SOUNDS.jump, {
			volume: 0.1
		})
		this.coin_pickup = this.scene.sound.add(SOUNDS.coin_pickup, {
			volume: 0.5
		})
		this.menu_music = this.scene.sound.add(SOUNDS.menu_music, {
			volume: 0.5
		})
		this.impact = this.scene.sound.add(SOUNDS.impact, {
			volume: 0.1
		})
		this.projectile_launch = this.scene.sound.add(SOUNDS.projectile_launch, {
			volume: 0.5
		})
		this.step_mud = this.scene.sound.add(SOUNDS.step_mud, {
			volume: 0.5
		})
		this.swipe = this.scene.sound.add(SOUNDS.swipe, {
			volume: 0.5
		})
		this.theme_music = this.scene.sound.add(SOUNDS.theme_music, {
			volume: 0.5,
			loop: true
		})
	}

	playSound(sound) {
		this[sound].play();
	}

	stopSound(sound) {
		this.scene.sound.get(sound).stop();
	}
}