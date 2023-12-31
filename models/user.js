'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON(){
      return {...this.get(), id: undefined}
    }

  }
  user.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name:{
      type:  DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:'User must have a name'},
        notEmpty:{msg:'Name must not be empty'}
      }
    },
    email: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg:'User must have a email'},
        notEmpty:{msg:'Email must not be empty'},
        isEmail:{msg: 'Must be a valid email address '}
      }
    },
    number:{
      type:  DataTypes.BIGINT,
      allowNull: false,
      validate:{
        notNull:{msg:'User must have a number'},
        notEmpty:{msg:'number must not be empty'},
        isNumeric:{msg:'Input value must be number'}
      }
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};