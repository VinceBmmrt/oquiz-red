const dbConnexionSequelize = require('../database.js');
const { Model, DataTypes } = require('sequelize');

class Answer extends Model {}

Answer.init({
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: dbConnexionSequelize,
    modelName: 'Answer',
    tableName: 'answer'
})

module.exports = Answer;