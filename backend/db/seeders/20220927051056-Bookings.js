"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
options.tableName = "Bookings";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date("01/01/2022"),
        endDate: new Date("01/31/2022"),
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date("02/01/2022"),
        endDate: new Date("02/28/2022"),
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date("03/01/2022"),
        endDate: new Date("03/21/2022"),
      },
      {
        spotId: 4,
        userId: 5,
        startDate: new Date("05/01/2022"),
        endDate: new Date("05/31/2022"),
      },
      {
        spotId: 5,
        userId: 4,
        startDate: new Date("04/01/2022"),
        endDate: new Date("04/30/2022"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(options);
  },
};
