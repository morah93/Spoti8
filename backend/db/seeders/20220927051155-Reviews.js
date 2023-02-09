'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}
options.tableName = 'Reviews'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(options, [
      {
      spotId: 1,
      userId: 5,
      review: 'This home is amazing. We felt that we were immersed in nature, both inside and outside. Our experience was one-of-a-kind. We hope to be back again to experience this extraordinary home.',
      stars: 5
      },
      {
      spotId: 1,
      userId: 4,
      review: 'The Step is AMAZING- we had the perfect city getaway here. The house is adorable and the surrounding area is such a fun space. Cannot recommend enough!',
      stars: 5
      },
      {
      spotId: 2,
      userId: 3,
      review: 'What an amazing summer week we had at this perfect location. Short walk to beach (or drive if you prefer). Amazing location!',
      stars: 5
      },
      {
      spotId: 2,
      userId: 1,
      review: 'I absolutely loved the house. Hosts were super nice and responsive. The house was even bigger than it looked on the pictures.',
      stars: 5
      },
      {
      spotId: 3,
      userId: 4,
      review: 'The house was great, location perfect and the host is an authentic 5 star super host!! Will definitively try and go back next year !',
      stars: 5
      },
      {
      spotId: 3,
      userId: 3,
      review: 'We absolutely love this place. It’s well equipped with everything you need. Perfect for families with kids! We’ll be back next year!',
      stars: 5
      },
      {
      spotId: 4,
      userId: 5,
      review: 'Amazing house!! Very comfortable and lots to do',
      stars: 5
      },
      {
      spotId: 4,
      userId: 2,
      review: 'Our group of 11 adults and 3 toddlers had an excellent time. The property and house was much larger than we expected, and had everything we could have needed and more.',
      stars: 5
      },
      {
      spotId: 5,
      userId: 1,
      review: 'The house is stunningly beautiful! We had no problem fitting our 13 person party there. We are looking forward to possibly doing it again next year!',
      stars: 5
      },
      {
      spotId: 5,
      userId: 3,
      review: 'A great home and host! We had adults and children who all had a fun few days.',
      stars: 5
      },
      {
      spotId: 6,
      userId: 1,
      review: 'It was okay.',
      stars: 4
      },
      {
      spotId: 7,
      userId: 2,
      review: 'We had a wonderful stay at this beautiful home. A true gem with a beautiful view.',
      stars: 4
      },
      {
      spotId: 8,
      userId: 3,
      review: 'Beautiful place, tranquil. Really enjoyed our group stay.',
      stars: 5
      },
      {
      spotId: 9,
      userId: 4,
      review: 'Amazed and will return.',
      stars: 5
      },
      {
      spotId: 10,
      userId: 5,
      review: 'One of the best places we’ve ever stayed! Breathtaking views both ways and amazing sunsets - we couldn’t get enough of them.',
      stars: 5
      },
      {
      spotId: 6,
      userId: 3,
        review: 'We have no words- wow. What an amazing and incredibly unique experience.',
      stars: 5
      },
      {
      spotId: 7,
      userId: 1,
      review: 'Thoroughly enjoyed this vacation',
      stars: 5
      },
      {
      spotId: 8,
      userId: 2,
      review: 'Amazing stay! Best abnb we’ve ever stayed at! The hospitality and atmosphere was excellent! ',
      stars: 4
      },
      {
      spotId: 9,
      userId: 5,
      review: 'If you are looking for a place this is it. It is worth the 35 minute drive to stay by St. George. It was as described will recommend to everyone.',
      stars: 4
      },
      {
      spotId: 10,
      userId: 4,
      review: 'Enjoyed my stay',
      stars: 4
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete(options);
  }
};
