import { VElement } from "../../../../../framework/VElement.js";
import { mainView } from "../../../app.js";

function createAvatar() {
    return new VElement({
        tag: 'div',
        attrs: { class: 'avatar', /*style: 'background-image: url("path/to/your/image.jpg");'*/ },
        // Replace background-image path vith actual avatar
    });
}


function createStatus(playerLives) {
    return new VElement({
      tag: "span",
      attrs: { class: "userGameStatus", class: "material-symbols-outlined" },
      content: `${playerLives}favorite`,
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

function createGameSpecs() {
    return new VElement({ // The list of game details: Lives, Score, FPS, etc
        tag: 'div',
        attrs: { id: 'gamespecs' },
        content: "Score: 1500", // Remove the content when the eal specs will be added
        children: [
            // children
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

export function createGameInfoPanelC(playerList) {
    return new VElement({
      tag: "div",
      attrs: { id: "gameinfo" },
      children: [
        createGameInfoHeader(),
        createPlayersOnline(playerList),
        createGameSpecs(),
      ],
    });
}