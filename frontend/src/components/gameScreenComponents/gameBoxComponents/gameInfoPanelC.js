import { VElement } from "../../../../../framework/VElement.js";
import { mainView } from "../../../app.js";

function createAvatar() {
    return new VElement({
        tag: 'div',
        attrs: { class: 'avatar', /*style: 'background-image: url("path/to/your/image.jpg");'*/ },
        // Replace background-image path vith actual avatar
    });
}

function createUsername(playerName) {
    return new VElement({
        tag: 'span',
        attrs: { class: 'gamePlayerUsername' },
        content: playerName,
    });
}

function createOnePlayer(player) {
    return new VElement({
      // One element of the players list
      tag: "div",
      attrs: { class: "playerone" },
      children: [
        // Avatar (hero + color) + nickname + status icon: "In game" OR "Died but online (can write in chat)" OR "Offline"
        // If in game => <3 <3 <3 + Lives
        createAvatar(),
        createUsername(player.name),
        player.stats.vPlayerStatsBar,
      ],
    });
}

function addPlayersToInfoBar(playerList) {
  const playerInfoVelements = [];
  Object.values(playerList).forEach((player) => {
    const vPlayerInfo = createOnePlayer(player);
    playerInfoVelements.push(vPlayerInfo);
  });
  return playerInfoVelements;
}

function createPlayersOnline(playerList) {
  return new VElement({
    // The list of players connected / online / in game
    tag: "div",
    attrs: { class: "playerlist" },
    children: addPlayersToInfoBar(playerList),
  });
}

// Children of game specs:
function ShowFPS(playerList) {
  return new VElement({
    tag: "div",
    content: "FPS: 60", // Change the content when the real specs will be added
  });
}

function ShowScore(playerList) {
  return new VElement({
    tag: "div",
    content: "Score: 1500", // Change the content when the real specs will be added
  });
}

function ShowBombPUP(playerList) { // The amount of bomb powerups
  return new VElement({
    tag: "div",
    content: "Bombs: 3", // Change the content when the real specs will be added
  });
}

function ShowFlamePUP(playerList) { // The amount of bomb powerups
  return new VElement({
    tag: "div",
    content: "Flame: 3", // Change the content when the real specs will be added
  });
}

function ShowSpeedPUP(playerList) { // The amount of bomb powerups
  return new VElement({
    tag: "div",
    content: "Speed: 3", // Change the content when the real specs will be added
  });
}

// Powerups will be in player panel
function createGameSpecs() {
    return new VElement({ // The list of game details: Lives, Score, FPS, etc
        tag: 'div',
        attrs: { id: 'gamespecs' },
        children: [
          ShowFPS(),
          //ShowScore(),
          ShowBombPUP(),
          ShowFlamePUP(),
          ShowSpeedPUP(),
        ],
    });
}

function createGameInfoHeader() {
    return new VElement({
        tag: 'span',
        attrs: { id: 'gameinfoheader' },
        content: "Players",
    });
}

function youDied(playerList) { // The amount of bomb powerups
  return new VElement({
    tag: "span",
    attrs: { id: "youdied" },
    content: "You died", 
  });
}
function helperdiv(playerList) { // The amount of bomb powerups
  return new VElement({
    tag: "span",
    attrs: { id: "helpdivyoudied" },
    content: "You died", 
  });
}
function GameOverScreen(playerList) { // The amount of bomb powerups
  return new VElement({
    tag: "div",
    attrs: { id: "gameover" },
    children: [
      helperdiv(),
      youDied(),
    ],
  });
}

export function createGameInfoPanelC(playerList) {
    return new VElement({
      tag: "div",
      attrs: { id: "gameinfo" },
      children: [
        createGameInfoHeader(),
        createPlayersOnline(playerList),
        createGameSpecs(),
        //GameOverScreen(),
      ],
    });
}