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
  
  anims.create({
    key: 'iceball',
    frames: [
      {key: 'iceball_1'},
      {key: 'iceball_2'},
    ],
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: 'iceball_hit',
    frames: [
      {key: 'iceball_hit_1'},
      {key: 'iceball_hit_2'},
      {key: 'iceball_hit_3'}
    ],
    frameRate: 18,
    repeat: 0,
  });
  
  anims.create({
    key: 'fireball_hit',
    frames: [
      {key: 'fireball_hit_1'},
      {key: 'fireball_hit_2'},
      {key: 'fireball_hit_3'}
    ],
    frameRate: 18,
    repeat: 0,
  });
  
};
