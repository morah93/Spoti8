'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}
options.tableName = 'ReviewImages'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'imgrev1.com'
      },
      {
        reviewId: 2,
        url: 'imgrev2.com'
      },
      {
        reviewId: 3,
        url: 'imgrev3.com'
      },
      {
        reviewId: 4,
        url: 'imgrev4.com'
      },
      {
        reviewId: 5,
        url: 'imgrev5.com'
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(options);
  }
};
