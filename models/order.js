'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'user_id' })
      Order.hasMany(models.OrderDetail, { foreignKey: 'order_id' })
    }
  }
  Order.init({
    user_id: DataTypes.INTEGER,
    session_id: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    total: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    underscored: true
  });
  return Order;
};