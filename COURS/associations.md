# Associations

Petit fichier pense bête pour se souvenir de qeulle fonction utiliser en fonction de la cardinalité dans le MCD pour définir les associations avec Sequelize :

|Relation (Max/Max)|Cardinalité (sur le MCD)| Phrase en français                               |Fonction Sequelize | Association          |Où Sequelize cherche la FK ?|
|---|---|---|---|---|---|
1/1 (one-to-one) | 1,1 | une question posède 1 bonne réponse | `belongsTo` | `Question.belongsTo(Answer);`||
|---|---|---|---|---|---|
1/N (one-to-many)| 0,N | Un user a plusieurs quiz| `hasMany`| `User.hasMany(Quiz);`| quiz |
1/N (one-to-many)| 1,1 | Un quiz appartient à un user| `belongsTo`| `Quiz.belongsTo(User);`| quiz |
|---|---|---|---|---|---|
1/N | 1,1 | un user a une adresse (hors du contexte du cours) | `hasOne` | `User.hasOne(Adress);`||
|---|---|---|---|---|---|
N/N | peu importe | un tag a plusieurs quiz | `BelongsToMany` | `Tag.BelongsToMany(Quiz);` ||
N/N | peu importe | un quiz a plusieurs tags | `BelongsToMany` | `Quiz.BelongsToMany(Tag);` ||