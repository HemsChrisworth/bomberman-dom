# bomberman-dom

This is a complex project of a multi-player version of the game "Bomberman" for 2 to 4 players. To create it, we used our own framework written in JavaScript, which can be found in the `Framework` folder. 

Audit questions can be found here: [>>> AUDIT <<<](https://github.com/01-edu/public/tree/master/subjects/bomberman-dom/audit)
<br>
<br>

## How to launch

To launch the project, please open a terminal, navigate to the `backend` folder, and type

```
go run .
```

Then, please open a new terminal, go back to the main project folder and launch `server.mjs`.
<br>
After doing this, you can open http://localhost:8080 and enjoy the game!
<br>
<br>

## How to play

1. To start the game, you need at least 2 people (or you can open http://localhost:8080 in two different browsers for testing).
<br>
2. On the main page, each player need to choose a nickname and click "Start".
<br>
3. After this, you will be taken to a waiting room where you will wait for 20 seconds until 2 to 4 people will be gathered for playing.
<br>
4. When time is over and you have enough people to play, the game screen opens automatically.
<br>
<br>

Now, you are in a game! It's time to act!
<br>
<br>
The aim of each player is to kill all the other players who are his enemies in the game. You need to place bombs near blocks or other players to explode them. Be careful, bombs can kill you too! So after placing a bomb, run away and hide as fast as you can!

Every player has 3 lives at the beginning of the game. If player lose all of his lives, he is out of the game.

### Controls 

```
To move, use Right, Up, Left and Down arrow buttons on your keyboard.
To place a bomb, use Space button
```

### Features

* The game room has an online chat where players can talk.
* After destroying a block, player can randomly receive a power-up: bomb amount, fire or speed increase. Not all the blocks contain power-ups.

## Project information

### Used technologies

* HTML5
* CSS3
* JavaScript
* Custom made framework for managing HTML components
* GoLang for backend
* WebSockets

### Authors

* [Hems_Chrisworth](https://01.kood.tech/git/Hems_Chrisworth)
* [OLENA BUDARAHINA](https://01.kood.tech/git/obudarah)
* [Lauri99](https://01.kood.tech/git/Lauri99)
* [Mustkass](https://01.kood.tech/git/Mustkass)

<br>