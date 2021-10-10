export default (anims) => {
  anims.create({
    key: 'diamond_shining',
    frames: [{
        key: 'diamond_shine_1'
      },
      {
        key: 'diamond_shine_2'
      },
      {
        key: 'diamond_shine_3'
      },
      {
        key: 'diamond_shine_4'
      },
      {
        key: 'diamond_shine_5'
      },
      {
        key: 'diamond_shine_6'
      },
    ],
    frameRate: 4,
    repeat: -1,
  });
  anims.create({
    key: 'heart_shining',
    frames: anims.generateFrameNumbers('heart', {
      start: 0,
      end: 28,
    }),
    frameRate: 6,
    repeat: -1,
  });
};