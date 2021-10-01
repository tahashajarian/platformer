export default (anims) => {
  anims.create({
    key: 'hit-effect-anim',
    frames: anims.generateFrameNumbers('hit-effect', {
      start: 0, end: 4,
    }),
    frameRate: 16,
    repeat: 0,
  });
  anims.create({
    key: 'sword-swing',
    frames: anims.generateFrameNumbers('sword', {
      start: 0, end: 2,
    }),
    frameRate: 16,
    repeat: 0,
  });
};
