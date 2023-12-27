const dotenv = require('dotenv');
dotenv.config();

const Tag = require('../app/models/tag.js');
const User = require('../app/models/user.js');
const Level = require('../app/models/level.js');


/*
// Test de la classe Tag
const unTag = new Tag(
    {
        id: 12,
        name: "Cinéma"
    }
);

console.log(unTag);


// Test de la classe User
const JeanMich = new User(
    {
        id: 1,
        firstname: "Jean-Michel",
        lastname: "Dupond",
        email: "jeanmichmich@gmail.com",
        password: "j'aimelespatates"
    }
);
console.log(JeanMich);
*/

// Modele LEVEL :

// J'aimerai pouvoir créer un objet, et dire à l'objet : enregistre-toi en BDD !
// quelque chose comme ceci :

const testLevel = async () => {
    // Note : on se place dans une fonction des test asynchrone car on execute la méthode "insert" qui est elle même asynchrone. On ne peut pas executer une fonction async à la racine d'un fichier (top level), il faut forcément se placer dans une fonciton asyn

    // je crée un objet levelCheesecake avec des données "en dur", mais on peut immaginer que ce sont des infos qui viennent d'un formulaire par exemple
    const levelCheesecake = new Level(
        {
            name: "Cheesecake"
        }
    );
    await levelCheesecake.insert(); // insert-toi dans la db please !
    // insert = une fonction qui n'existe pas, il va falloir la créer
    // on va le faire avec pg
    // objectif : avoir une fonction "insert", qui prend toutes les données d'un objet, et qui les insert en base de donnée.
    // console.log(levelCheesecake);

    // mauvaise solution : 
    // levelCheesecake.getAll(); // what ?? bizarre, non ?
    // ça voudrait dire qu'il faut forcément que je crée un level pour pouvoir récupérer TOUS les levels... ??
    // heureusement JS a une fonctionnalité qui va nous aider : les méthodes statiques
    // on peut faire :
    const list = await Level.getAll(); // = une méthode STATIQUE : une méthode que l'on apelle sur la classe elle même, et non pas sur une instance de la classe.
    
    // une fois qu'on récupère la liste des niveaux, on opeut boucler dessus pour les afficher :
     for (const level of list) {
        level.displayLevelInfo();
        // j'ai accès à la méthode displayLevelInfo car chaque level est bien une instance de la classe Level
    }
    // ou on peut aussi cibler un élément du tableau en particulier :
    list[2].displayLevelInfo();
    // autre intérêt d'avoir des instances de classe : dans VS Code on a l'autocompletion avec la liste des méthodes et propriétés dispo sur l'objet ! trop cool :)
};

// testLevel();

const testUser = async () => {
    const bob = new User({
        firstname: "Bob",
        lastname: "l'éponge",
        email: "sponge-bob@gmail.com",
        password: "gary<3"
    });
    // bob est une instanc de la classe User, il a donc accès a toutes les méthodes de la classe User ! 
    // donc pour l'insérer en db, on fait :
    // await bob.insert();
    // on vérifie avec une requête dans la db : SELECT * FROM "user"; (attention les guillements !!)

    // méthode getAll = méthode statique : on l'apelle sur la classe User elle même (pas sur une instance de la classe)
    const userList = await User.getAll()
    // on peut boucler sur les users pour les afficher
    for (const user of userList) {
        console.log(user.fullname) // on utilise le getter custom qui affiche nom + prénom, pratique !
    }
}

// testUser();

const testLevelUpdate = async () => {
    const nouveauNiveau = new Level({
        name: "Niveau super dur"
    });
    await nouveauNiveau.insert();
    nouveauNiveau.name = "Niveau méga dur de l'espace !"
    await nouveauNiveau.update();
}

// testLevelUpdate();

const testLevelGetOne = async () => {
    const level = await Level.getOneById(12);
    level.displayLevelInfo();
    level.name = "Julien Lepers";
    level.update();
    const levelUpdated = await Level.getOneById(12);
    levelUpdated.displayLevelInfo();
}

// testLevelGetOne();

const testLevelDelete = async () => {
    const level = await Level.getOneById(7);
    await level.delete();
    // pour vérifier :
    const deletedLevel = await Level.getOneById(7);
    console.log(deletedLevel); // ça devrait afficher null
}

testLevelDelete();
