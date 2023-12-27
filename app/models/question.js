const dbConnexionSequelize = require('../database.js');
const { Model, DataTypes } = require('sequelize');

class Question extends Model {}

Question.init({
    // la liste des propriétés de la classe (avec leurs types)
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    anecdote: DataTypes.TEXT,
    wiki: DataTypes.TEXT,
    // level_id, answer_id, quiz_id : ce sont des clés étrangères : on ne les définit pas ici, elles sont définies au moment où on définit les relations / les associations (on va le faire tout à l'heure)

}, {
    // un peu de configuration
    sequelize: dbConnexionSequelize, // l'instance de connexion (fait dans le fichier database.js)
    modelName: 'Question',
    tableName: 'question'
})

module.exports = Question;