const dbConnexionSequelize = require('../database.js');
const { Model, DataTypes } = require('sequelize');

class Tag extends Model {}

Tag.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: dbConnexionSequelize,
    modelName: 'Tag',
    tableName: 'tag'
})

module.exports = Tag;

