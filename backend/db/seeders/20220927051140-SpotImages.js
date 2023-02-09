'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}
options.tableName = 'SpotImages'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://i.imgur.com/uzNJXom.jpg',//url from imgur
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/ogodRiT.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.imgur.com/LQbwHxE.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.imgur.com/lvTlgIT.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://i.imgur.com/OrZWwBG.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://i.imgur.com/pSjM433.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://i.imgur.com/mZKvmiu.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://i.imgur.com/7cLUKMA.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://i.imgur.com/TCEnY0u.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://i.imgur.com/lh1bDAa.jpg',
        preview: true
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete(options);
  }
};
