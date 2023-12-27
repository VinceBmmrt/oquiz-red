const dbConnexionSequelize = require('../database.js');
const { Model, DataTypes } = require('sequelize');

class Level extends Model {}

Level.init({
    // description des champs de la table (dans la BDD), qui sont aussi les atributs du modèle (dans node.js)
    name: DataTypes.STRING
}, {
    sequelize: dbConnexionSequelize,
    modelName: 'Level',
    tableName: 'level'
})

module.exports = Level;