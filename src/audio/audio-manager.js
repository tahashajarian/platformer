
export default class AudioManager {
	constructor(scene) {
		this.scene = scene;
		const allSound = this.scene.sound.getAll();
		if (allSound) {
			allSound.forEach(sound => {
				sound.stop();
			})
		}
		this.createSoundControlButton();
	}

	playSound(sound, volume, loop) {
		if (this.scene.config.isMute) return
		const getSound = this.scene.sound.get(sound)
		if (getSound) {
			getSound.play();
			if (volume !== undefined) {
				getSound.setVolume(volume);
			}
			if (loop !== undefined) {
				getSound.setLoop(loop)
			}
		} else {
			this.scene.sound.add(sound, { volume, loop }).play();
		}
	}

	stopSound(sound) {
		this.scene.sound.get(sound).stop();
	}

	toggleSound() {
		this.scene.config.isMute = !this.scene.config.isMute;
		console.log('togle')
		const allMusic = this.scene.sound.getAll();
		allMusic.forEach(music => {
			music.setMute(this.scene.config.isMute);
		})
		this.setPositionSpeaker()
	}

	createSoundControlButton() {
		if (this.soundControlButton) return
		this.soundBase = this.scene.add
			.image(80, 20, "sound").setDepth(100)
			.setInteractive()
			.setOrigin(0)
			.setScale(0.3)
			.setScrollFactor(0)
		this.soundOn = this.scene.add
			.image(105, 20, "sound-on").setDepth(100)
			.setOrigin(0)
			.setScrollFactor(0)

		this.setPositionSpeaker();

		this.soundControlButton = this.scene.add.container(0, 0, [this.soundBase, this.soundOn])
			.setScrollFactor(0)
			.setDepth(100)
			.setAlpha(0.6)

		this.soundBase.on("pointerdown", () => {
			this.toggleSound();
		});
	}

	setPositionSpeaker() {
		if (this.scene.config.isMute) {
			this.soundOn.setTexture('sound-off').setScale(0.25).
				setPosition(98, 22)
		} else {
			this.soundOn.setTexture('sound-on').setScale(0.4)
				.setPosition(98, 17)
		}	}
}