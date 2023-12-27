const dbConnexionSequelize = require('../database.js');
const { Model, DataTypes } = require('sequelize');

class Quiz extends Model {}

Quiz.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: DataTypes.TEXT
    // user_id : FK : définie dans les associations
}, {
    sequelize: dbConnexionSequelize,
    modelName: 'Quiz',
    tableName: 'quiz'
})

module.exports = Quiz;