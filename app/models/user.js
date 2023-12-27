const dbConnexionSequelize = require('../database.js');
const { Model, DataTypes } = require('sequelize');

class User extends Model {}

// Nous on décrivait les champs à l'intérieur de la classe
// Sequelize, lui veut qu'on les lui décrive à l'extérieur, via une méthode qu'il nous fournit : la méthode "init"
// (méthode statique, donc on peut faire User.init())
// et il a besoin qu'on type chaque champs : qu'on précise si c'est une string, un number, un boolean...

// On initialise notre modèle, et on lui définit les différentes propriétés
// cf. la Doc : https://sequelize.org/master/manual/model-basics.html
// il faut passer deux arguments : 
//   - un objet avec la liste des champs
//   - un objet avec l'instance de la connexion, et le nom du modèle

User.init({
    // Model attributes are defined here
    // version courte :
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    // version longue avec plus d'options
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false // (si on a mis NOT NULL dans la db par exemple)
    }
  }, {
    // Other model options go here
    sequelize: dbConnexionSequelize, // We need to pass the connection instance (+ ajouter l'import en haut du fichier)
    modelName: 'User', // We need to choose the model name (par default on prends le nom de la classe User)
    // important : il faut ausi lui spécifier le nom de la table correspondant dans la db
    // par defaut Sequelize prends le nom de la classe, et la mets au pluriel ("users" au lieu de "user")
    // nous on préfère donner le nom de la table dans la base de donnée de manière explicite avec le paramètre tableName, comme ceci :
    tableName: 'user'
});

// et on exporte notre classe
module.exports = User;