// ici on gère la connexion à la db via Sequelize (qui lui, utilise pg)

// 1. on require le module sequelize
const { Sequelize } = require('sequelize');

// 2. comme pour pg : on fait une nouvelle instance de Sequelize
// on le configure un peu
const dbConnexionSequelize = new Sequelize({
    dialect: 'postgres', // le type de SGBD avec lequqel on travaille

    // on ajout aussi cette option qui sert à désactiver une fonctionnalité par default de Sequelize
    // par default Sequelize s'attend à ce qu'il y ait pour chaque table des chmamps "created_at" et "updated_at". nos tables n'ont pas ces champs donc on desactive la fonctionnnalité avec timestamps: false
    define: {
        timestamps: false
    }
});

// sequelize se connecte à la DB via pg. Il trouve les infos de connexion à la db dans le .env (important : il faut nommer les variables correctement dans le .env pour qu'il les trouve)

// 3. on exporte l'instance de Sequelize
module.exports = dbConnexionSequelize;