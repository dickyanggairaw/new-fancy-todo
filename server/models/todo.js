'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:true
      }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate:{
        isDate(value){
          let newValue = new Date(value)
          let now = new Date()
          if(newValue < now){
            throw new Error("date Invalid") 
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
    hooks:{
      beforeCreate: (user, options) => {
        if(!user.status){
          user.status = "unfinish"
        }
      }
    }
  });
  return Todo;
};