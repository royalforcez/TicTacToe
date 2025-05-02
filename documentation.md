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

## 3. Configuration Technique

- Frontend : React.js
- Backend : Node.js/Express
- Authentication : JWT