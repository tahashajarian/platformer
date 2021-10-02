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

  anims.create({
    key: 'fireball',
    frames: [
      {key: 'fireball_1'},
      {key: 'fireball_2'},
      {key: 'fireball_3'}
    ],
    frameRate: 5,
    repeat: -1,
  });
  
};
