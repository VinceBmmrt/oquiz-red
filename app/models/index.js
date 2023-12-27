// ce fichier va nous servir à dclarer les relations entre les modèles

// on importe les modèles nécessaires
const Quiz = require('./quiz.js');
const User = require('./user.js');
const Level = require('./level.js');
const Question = require('./question.js');
const Answer = require('./answer.js');
const Tag = require('./tag.js');

// *** Relation USER/QUIZ *** //
// un User possède plusieurs Quiz
User.hasMany(Quiz, {
    foreignKey: 'user_id', // le nom de la clé étrangère ui fait le lien entre les 2 (voir dans le fichier .sql)
    as: 'quizList' // on donne un petit nom à cette relation (un alias)
    // on pourra alors faire un user.quizList pour récupérer les quiz d'un utilisateur    
}); 

// un Quiz appartient à UN User
Quiz.belongsTo(User, {
    foreignKey: 'user_id', // qu'on soit dans un sens ou dans l'autre, c'est cette clé qui fait le lien entre les 2 tables (Sequelize sait tout seul où la trouver : ici c'est dans la table "quiz")
    as: 'author'
}); 


// *** Relation QUESTION/LEVEL *** //
Level.hasMany(Question, {
    foreignKey: "level_id",
    as: "questionList"
});

Question.belongsTo(Level, {
    foreignKey: "level_id",
    as: "level"
});


// *** Relation QUESTION/QUIZ *** //
// un quiz possède plusieurs questions
Quiz.hasMany(Question, {
    foreignKey: "quiz_id",
    as: "questionList"
});

Question.belongsTo(Quiz, {
    foreignKey: "quiz_id",
    as: "quiz"
});


// *** Relation QUESTION/ANSWER *** // 
// une question possède plusieurs réponses posibles (answer)
Question.hasMany(Answer, {
    foreignKey: 'question_id',
    as: 'answerList'
});
// réciproque : une réponse (answer) est lié à 1 seule question
Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question'
});

// cas particuluier : question et answer sont liés de 2 manières différentes
// n'oublions pas la "bone réponse"
// on a aussi 1 bonne réponse qui valide 1 question
Question.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'goodAnswer'
});


// *** Relation QUIZ/TAG *** // 
// un quiz a plusiurs tag et un tag ap lusieurs quiz : on définit la relation many-to-many, dans les 2 sens
Tag.belongsToMany(Quiz, {
    as: 'quizList', // la liste des quiz d'un tag
    through: 'quiz_has_tag', // via quelle table de liaison ces deux tables sont liées
    foreignKey: 'tag_id', // le nom de la clé de tag dans a table de liaison
    otherKey: 'quiz_id' // le nom de l'autre clé dans la table de liaison (donc quiz)
});
Quiz.belongsToMany(Tag, {
    as: 'tagList', // la liste des tags d'un quiz
    through: 'quiz_has_tag',
    foreignKey: 'quiz_id',
    otherKey: 'tag_id'
});

// on exporte nos models "modifiés"
module.exports = {
    User,
    Quiz,
    Level,
    Question,
    Answer, 
    Tag
}
