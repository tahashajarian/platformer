export default (anims) => {
  anims.create({
    key: 'idle-birdman',
    frames: anims.generateFrameNumbers('birdman', {
      start: 0, end: 12,
    }),
    frameRate: 8,
    repeat: -1,
  });
  anims.create({
    key: 'idle-snakyman',
    frames: anims.generateFrameNumbers('snakyman', {
      start: 0, end: 8,
    }),
    frameRate: 8,
    repeat: -1,
  });
  anims.create({
    key: 'hit-birdman',
    frames: anims.generateFrameNumbers('birdman', {
      start: 24, end: 27,
    }),
    frameRate: 12,
    repeat: 0,
  });
  anims.create({
    key: 'hit-snakyman',
    frames: anims.generateFrameNumbers('snakyman', {
      start: 20, end: 23,
    }),
    frameRate: 12,
    repeat: 0,
  });
};
