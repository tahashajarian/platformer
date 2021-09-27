export default (anims) => {
  anims.create({
    key: 'hit-effect-anim',
    frames: anims.generateFrameNumbers('hit-effect', {
      start: 0, end: 4,
    }),
    frameRate: 16,
    repeat: 0,
  });
};
