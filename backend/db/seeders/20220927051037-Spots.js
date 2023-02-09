'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}
options.tableName = 'Spots'

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert(options, [
      {
        ownerId:'1',
        address:'1 state st',
        city:'Ocean City',
        state:'Maryland',
        country: 'USA',
        lat: 12.34,
        lng: 43.76,
        name: '',
        description: "Welcome to our 'Edgewater Escape.' These buildings were built in the 1960's and literally hang entirely over the bay in downtown in Ocean City. Sit on the bay front porch or hang out inside and watch boats, dolphin, birds, and sometimes even seals swim by within feet of the porch.",
        price: 499
      },
      {
        ownerId:'2',
        address:'2nd mansion st',
        city:'Bolseno',
        state:'Viterbo',
        country: 'Italy',
        lat: 76.23,
        lng: 65.24,
        name: 'Vineyard',
        description: 'Mansion on a lake on a vineyard',
        price: 799
      },
      {
        ownerId:'3',
        address:'1 Castle rt',
        city:'El Pilar',
        state:'Madrid',
        country: 'Spain',
        lat: 40.47,
        lng: -3.70,
        name: 'Castele',
        description: 'Castle with spacious rooms',
        price: 1299
      },
      {
        ownerId:'4',
        address:'34122',
        city:'Fatih',
        state:'Istanbul',
        country: 'Turkey',
        lat: 41.01,
        lng: 28.98,
        name: 'Topkapi Palace',
        description: 'Palace from Ottoman Empire',
        price: 999
      },
      {
        ownerId:'5',
        address:'2 River st',
        city:'Boondocks',
        state:'Jungle',
        country: 'Sherkhans Kingdom',
        lat: 76.21,
        lng: 21.98,
        name: 'Hut',
        description: 'Modern hut for glamping.',
        price: 399
      },
      {
        ownerId:'1',
        address:'12 downing st',
        city:'london',
        state:'Westershire',
        country: '',
        lat: 76.21,
        lng: 21.98,
        name: 'Princes Estate',
        description: 'A princely vacation rental',
        price: 799
      },
      {
        ownerId:'2',
        address:'2 Range grove',
        city:'Books',
        state:'Library',
        country: 'Winston',
        lat: 76.21,
        lng: 21.98,
        name: 'ChurchHill Palace',
        description: 'Churchills childhood home.',
        price: 999
      },
      {
        ownerId:'3',
        address:'mangrove circle',
        city:'Bradford',
        state:'Md',
        country: 'Italy',
        lat: 76.21,
        lng: 21.98,
        name: 'Peace Hill',
        description: 'Peaceful vacation home to unwind',
        price: 899
      },
      {
        ownerId:'4',
        address:'1 Mango ave',
        city:'Brooklyn',
        state:'California',
        country: 'Russia',
        lat: 76.21,
        lng: 21.98,
        name: 'Homestead',
        description: 'A home away from home.',
        price: 250
      },
      {
        ownerId:'5',
        address:'2 Winters lane',
        city:'Edmond',
        state:'Texas',
        country: 'Virginia',
        lat: 76.21,
        lng: 21.98,
        name: 'Mangrove Mansion',
        description: 'Mansion with a history.',
        price: 1299
      },


     ]);
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete(options);
  }
};
