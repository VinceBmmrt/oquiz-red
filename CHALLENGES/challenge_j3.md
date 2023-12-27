# oQuiz - Challenge jour 3 : Active Record

Nous avons commencé à coder les méthodes Active Record du modèle `Level`.

On a pu vérifier que ces méthodes fonctionnent en jouant avec dans `testModels.js`.

En s'inspirant (très largement) de ce code existant, codez les méthodes `insert` et `getAll` du modèle `User` : 
- `insert()` : qui insert l'instance courante dans la base de données.
- `getAll()` : qui trouve tous les Users dans la base de données.


### Bonus :

Essayez de coder les méthode manquante sur le modèle `Level`.

Au final ou voudrait toutes ces méthodes :

- `getAll()`, qui trouve tous les Levels dans la base de données. (on l'a déja)
- `getOneById(id)`, qui trouve un Level en fonction de son ID.
- `insert()`, qui insert l'instance courante dans la base de données. (on l'a déja)
- `update()`, qui met à jour l'instance courante dans la base de données.
- `delete()`, qui supprime l'instance courante de la base de données.


### Méga Bonus : 

Commencer à réfléchir pour factoriser tout ce code (c'est-à-dire coder toutes les méthodes Active Record dans CoreModel !)
