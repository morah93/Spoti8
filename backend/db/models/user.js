'use strict';
const bcrypt = require('bcryptjs');
const { Model, validator } = require('sequelize');
// const { FOREIGNKEYS } = require('sequelize/types/query-types');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, username, email } = this; //user instance
      return{ id, firstName, lastName, username, email}
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserbyId(id) {
      return User.scope('currentUser').findByPk(id)
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id)
      }
    }
    static async signup({firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1 to *
      // User.belongsToMany(models.Spot, { through: models.Booking, foreignKey: 'userId', otherKey: 'spotId', onDelete: 'CASCADE'})
      User.hasMany(models.Booking, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
      User.hasMany(models.Review, {foreignKey: 'userId'})
      User.hasMany(models.Spot, {foreignKey: 'ownerId', as: 'Owner'})
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   len: [4, 30],
      //   isNotEmail(value) {
      //     if (validator.isEmail(value)) {
      //       throw new Error("Cannot be email.");
      //     }
      //   }
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword', 'createdAt', 'updatedAt']}
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
