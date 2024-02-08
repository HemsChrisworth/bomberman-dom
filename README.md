# bomberman-dom

<br>

This is a complex project of a multi-player version of the game "Bomberman" for 2 to 4 players. To create it, we used our own framework written in JavaScript, which can be found in the `Framework` folder. 

Here you can find the [task description](https://github.com/01-edu/public/tree/master/subjects/bomberman-dom) and [>>> AUDIT QUESTIONS <<<](https://github.com/01-edu/public/tree/master/subjects/bomberman-dom/audit).
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

<br>

1. To start the game, you need at least 2 people (or you can open http://localhost:8080 in two different browsers for testing).


2. On the main page, each player needs to choose a nickname and click "Start".


3. After this, you will be taken to a waiting room where you will wait for 20 seconds until 2 to 4 people will be gathered for playing.


4. When time is over, and you have enough people to play, the game screen opens automatically.

<br>
<br>

**Now, you are in a game! It's time to act!**
<br>
<br>
The aim of each player is to kill all the other players who are his enemies in the game. You need to place bombs near blocks or other players to explode them. Be careful, bombs can kill you too! So after placing a bomb, run away and hide as fast as you can!

Each player has 3 lives at the beginning of the game. If player lose all of his lives, he is out of the game.

<br>

### Controls 


```
To move, use Right, Up, Left and Down arrow buttons on your keyboard.
To place a bomb, use Space button
```

<img src="https://01.kood.tech/git/Hems_Chrisworth/bomberman-dom/raw/branch/master/frontend/src/assets/images/updown.JPG" width="30%" height="30%">

### Features


* The game room has an online chat where players can talk.
* After destroying a block, player can randomly receive a power-up: bomb amount, fire or speed increase. Not all the blocks contain power-ups.
* Training mode

<br>

### Training mode

We implemented a training zone to let you check the game mechanics and train before the real battle. To open it, please type your nickname on the main page, and then choose "Training zone".
<br>
In the opened game, you will be alone without enemies. You can check all the controls and mechanics including placing bombs, destroying blocks, and receiving power-ups. If you lose all of your lives, you will die. If you destroy all the blocks, you will win. 

**Feel free to discover the game from the new side!**

<br>

## Project information

### Used technologies

* HTML5
* CSS3
* JavaScript
* Custom made framework for managing HTML components
* GoLang for backend
* WebSockets

<br>

### Authors

* [Hems_Chrisworth](https://01.kood.tech/git/Hems_Chrisworth)
* [OLENA BUDARAHINA](https://01.kood.tech/git/obudarah)
* [Lauri99](https://01.kood.tech/git/Lauri99)
* [Mustkass](https://01.kood.tech/git/Mustkass)

<br>