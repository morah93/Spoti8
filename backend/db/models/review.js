'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {foreignKey: 'userId'})
      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId', onDelete: 'CASCADE',hooks: true})
      Review.belongsTo(models.Spot, {foreignKey: 'spotId'})
    }
  }

  // put validations if needed
  Review.init({
    // id: {
    //   allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: sequelize.INTEGER
    // },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 5]
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
