export default (anims) => {
  anims.create({
    key: 'open-door',
    frames: anims.generateFrameNumbers('door', {
      start: 0,
      end: 3,
    }),
    frameRate: 8,
    repeat: 0,
  }),
  anims.create({
    key: 'close-door',
    frames: anims.generateFrameNumbers('door', {
      start: 3,
      end: 0,
    }),
    frameRate: 8,
    repeat: 0,
  });
};