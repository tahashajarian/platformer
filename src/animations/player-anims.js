export default (anims) => {
  anims.create({
    key: 'run',
    frames: anims.generateFrameNumbers('player', {
      start: 11, end: 16,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: 'idle',
    frames: anims.generateFrameNumbers('player', {
      start: 0, end: 8,
    }),
    frameRate: 8,
    repeat: -1,
  });

  anims.create({
    key: 'jump',
    frames: anims.generateFrameNumbers('player', {
      start: 17, end: 23,
    }),
    frameRate: 2,
    repeat: 1,
  });
  
  anims.create({
    key: 'player-throw',
    frames: anims.generateFrameNumbers('player-throw', {
      start: 0, end: 7,
    }),
    frameRate: 28,
    repeat: 0,
  });
  
  anims.create({
    key: 'player-slide',
    frames: anims.generateFrameNumbers('player-slide', {
      start: 0, end: 2,
    }),
    frameRate: 18,
    repeat: 0,
  });
  anims.create({
    key: 'player-slide-reverse',
    frames: anims.generateFrameNumbers('player-slide', {
      start: 2, end: 0,
    }),
    frameRate: 18,
    repeat: 0,
  });
};
