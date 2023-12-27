// on a besoin de dotenv pour que sequelize (et donc pg) aille chercher les infos de ma db dans le fichier .env
const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('../app/database.js');

// on require les models "modifiée" dans l'index (avec les associations)
const { User, Quiz, Level, Question, Answer, Tag } = require('../app/models/index.js'); 

/*
const testConnexion = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testConnexion();
*/

const testUser = async () => {
    const bob = await User.create({ 
        firstname: "Bob", 
        lastname: "Marley",
        email: "robert@gmail.com",
        password: "jamaica"
    });
    console.log("Id de Bob ajouté à la db: " + bob.id);

    const userList = await User.findAll({ raw: true });
    // { raw: true } = pour voir seulement les data de la db, sans modèle d'entité sequelize autour
    console.log(userList);

    // findByPk = Primary Key = find by id
    const user3 = await User.findByPk(3);
    console.log(user3.firstname);
}

// testUser();

const testLevel = async () => {
    const levelList = await Level.findAll({ raw: true });
    // { raw: true } = pour voir seulement les data de la db, sans modèle d'entité sequelize autour
    console.log(levelList);
}

// testLevel();

const testQuestion = async () => {
    // const questionList = await Question.findAll({ raw: true });
    // on peut affiner notre recherche comme ceci par exemple :
    const questionList = await Question.findAll({
        attributes: ['id', 'text'],
        // where: {id: 3},
        order: [['text', 'DESC']],
        raw: true 
    });
    console.log(questionList);
}

testQuestion();

const testAssociationsUserQuiz = async () => {
   // je récupère un quiz, ainsi que l'auteur du quiz
    // on demande à Sequelize d'inclure dans le quiz, l'auteur du quiz
    const quiz = await Quiz.findByPk(1, {
        include: ['author']
    });
    console.log(quiz.title);
    // ça marche : on a accès aux infos de l'auteur qui est lié à ce quiz
    console.log(quiz.author.firstname);

    // j'aimerai récupérer très facilement : un utilisateur donné (celui d'id 1 par ex), ainsi que ses quiz
    const Philou = await User.findByPk(1, {
        include: ['quizList']
    });
    console.log(Philou.firstname);
    for (const quiz of Philou.quizList) {
        console.log(quiz.title);
    }
}

// testAssociationsUserQuiz();

const testAssociationsQuestionLevel= async () => {
    // on récup le level d'id 3, ainsi que les questions de niveau 3
    const levelExpert = await Level.findByPk(3, {
        include: ['questionList']
    });
    console.log(levelExpert.name);
    for (const question of levelExpert.questionList) {
        console.log(question.text);
    }

    // on teste aussi l'association dans l'autre sens :
    // je veux récupérer une question et le niveau de difficulté de cette question
    const uneQuestion = await Question.findByPk(20, {
        include: ['level']
    });
    // j'affiche le texte de la question
    console.log(uneQuestion.text);
    // et son niveau :
    console.log("Niveau de difficulté de la question : " + uneQuestion.level.name);
}
 
// testAssociationsQuestionLevel();

const testAssociationsQuestion= async () => {
    const question = await Question.findByPk(20, {
        include: ['level', 'quiz', 'answerList', 'goodAnswer']
    });
    console.log(question.text);
    console.log(question.quiz.title);
    console.log(question.level.name);
    // map = fait la même chose qu'une boucle
    console.log(question.answerList.map(answer => answer.text));
    console.log(question.goodAnswer.text);
}

// testAssociationsQuestion();

const testAssociationsQuizTag= async () => {
    // tous les tags du quiz numéro 1 :
    const quiz = await Quiz.findByPk(1, {
        include: ['tagList']
    });
    console.log(quiz.title);
    // map = fait la même chose qu'une boucle
    console.log(quiz.tagList.map(tag => tag.name));

    // dans l'autre sens : tous les quiz qui ontle tag numéro 5
    const tag = await Tag.findByPk(5, {
        include: ['quizList']
    });
    console.log(tag.name);
    console.log(tag.quizList.map(quiz => quiz.title));
}

// testAssociationsQuizTag();

const testAssociationsTransitives= async () => {
    // on récupère un quiz, avec ses questions et la difficulté de chaque question
    const quizWithQuestions = await Quiz.findByPk(1, {
        include: [{
            association: "questionList", // on inclut les questions du quiz
            include: [{
                association : 'level' // et on inclut le niveau de chaque question
            }] 
        }]
    });
    console.log(quizWithQuestions.title);

    // console.log(quizWithQuestions.questionList.map(question => {
    //     return `la question : ${question.text} / Difficulté : ${question.level.name}`
    // }));

    // on peut remplacer le .map par un boucle classique :
    for (const question of quizWithQuestions.questionList) {
        console.log(`la question : ${question.text} / Difficulté : ${question.level.name}`)
    }
}

// testAssociationsTransitives();