# Tic-tac-toe Project Documentation

## 1. Fonctionnalités Principales

### 1.1. Gestion du Jeu
- **Création d'une partie**
  - Flux de données : 
    ```
    Front (Click "New Game") 
    → API POST /api/game/create 
    → DB (création nouvelle partie) 
    → API (retourne ID partie + état initial) 
    → Front (affiche plateau)
    ```

- **Placer un symbole (X/O)**
  - Flux de données :
    ```
    Front (Click case) 
    → API POST /api/game/move 
    → DB (mise à jour état) 
    → API (retourne nouvel état) 
    → Front (actualise plateau)
    ```

- **Vérification victoire**
  - Flux de données :
    ```
    Front (après chaque coup) 
    → API GET /api/game/check/{gameId} 
    → DB (lecture état) 
    → API (retourne statut partie) 
    → Front (affiche résultat)
    ```

## 2. Backend Documentation

### 2.1. Routes API

#### POST /api/game/create
- **Description** : Crée une nouvelle partie
- **Réponse** : 
```json
{
  "gameId": "string",
  "board": [[null,null,null],[null,null,null],[null,null,null]],
  "currentPlayer": "X"
}
```

#### POST /api/game/move
- **Description** : Enregistre un coup
- **Corps requête** :
```json
{
  "gameId": "string",
  "position": {
    "row": number,
    "col": number
  },
  "player": "X|O"
}
```

#### GET /api/game/check/{gameId}
- **Description** : Vérifie l'état de la partie
- **Réponse** :
```json
{
  "status": "IN_PROGRESS|WINNER|DRAW",
  "winner": "X|O|null",
  "board": [[]]
}
```

### 2.2. Middleware

#### Authentication Middleware
```javascript
// Vérifie la validité de la session
// Vérifie les permissions
```

#### Game State Middleware
```javascript
// Valide les mouvements
// Vérifie le tour du joueur
```

### 2.3. Base de données

#### Structure des données
```javascript
Game {
  id: string,
  board: array[3][3],
  currentPlayer: string,
  status: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```


## 3. Descritption du projet

### Contexte du projet
- Ce projet a été réalisé dans le cadre de l’apprentissage du framework React Native, avec pour objectif de mettre en pratique les compétences acquises en développement mobile. Il s’agissait de concevoir une application interactive intégrant une interface utilisateur, une logique de jeu, ainsi qu’un système de sauvegarde locale.


### Objectif
- L’application développée est un jeu de morpion (tic-tac-toe) dans lequel deux joueurs placent tour à tour un symbole (X ou O) sur une grille de 3x3. Le système identifie automatiquement un gagnant ou un match nul. À l’issue de chaque partie, un bouton permet de réinitialiser le jeu et d’effacer les données sauvegardées.

### Fonctionnalités principales
- Grille interactive 3x3 avec prise en charge des clics utilisateur. 
- Alternance automatique des joueurs. 
- Détection d’un gagnant ou d’une égalité. 
- Sauvegarde de l’état du jeu dans une base de données locale. 
- Bouton de réinitialisation réinitialisant l’interface et les données. 
- Affichage de l’état de la partie en temps réel (joueur en cours, résultat).

### Technologies utilisées
- React Native : développement mobile multiplateforme. 
- JavaScript (ES6) : logique de jeu. 
- AsyncStorage (ou SQLite) : sauvegarde des données localement. 
- Visual Studio Code : environnement de développement.

### Architecture technique
- L’application est découpée en plusieurs composants : 
- GameBoard : gère l’état global de la grille, la logique de victoire et le déroulement de la partie. 
- Square : représente une case individuelle, cliquable, affichant un X ou un O. 
- GameStatus : affiche les messages de statut (joueur actuel, victoire, nul). 
- dbService : module d’abstraction de la base de données locale, responsable de l’enregistrement, du chargement et de l’initialisation des données.

### Paramètres et utilisation
- Installation via npm install ou yarn install. 
- Lancement de l’application avec npm run dev

### Perspectives d’évolution
- Ajout d’un mode joueur contre IA. 
- Création d’un tableau des scores. 
- Tests unitaires avec Jest. 
- Intégration d’une base de données distante (Firebase, MongoDB...). 
- Améliorations graphiques : thèmes, animations, avatars joueurs.