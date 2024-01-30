import { VElement } from "../../../../../framework/VElement.js";

function createAvatar() {
    return new VElement({
        tag: 'div',
        attrs: { class: 'avatar', /*style: 'background-image: url("path/to/your/image.jpg");'*/ },
        // Replace background-image path vith actual avatar
    });
}

function createStatus() {
    return new VElement({
        tag: 'span',
        attrs: { class: 'userGameStatus', class: 'material-symbols-outlined' },
        content: "favorite",
    });
}

function createUsername() {
    return new VElement({
        tag: 'span',
        attrs: { class: 'gamePlayerUsername' },
        content: 'Player1',
    });
}

function createOnePlayer() {
    return new VElement({ // One element of the players list
        tag: 'div',
        attrs: { class: 'playerone' },
        children: [
            // Avatar (hero + color) + nickname + status icon: "In game" OR "Died but online (can write in chat)" OR "Offline"
            // If in game => <3 <3 <3 + Lives
            createAvatar(),
            createUsername(),
            createStatus(),
        ],
    });
}

function createTwoPlayer() {
    return new VElement({
        tag: 'div',
        attrs: { class: 'playerone' },
        children: [
            createAvatar(),
            createUsername(),
            createStatus(),
        ],
    });
}

function createThreePlayer() {
    return new VElement({
        tag: 'div',
        attrs: { class: 'playerone' },
        children: [
            createAvatar(),
            createUsername(),
            createStatus(),
        ],
    });
}

function createFourPlayer() {
    return new VElement({
        tag: 'div',
        attrs: { class: 'playerone' },
        children: [
            createAvatar(),
            createUsername(),
            createStatus(),
        ],
    });
}

function createPlayersOnline() {
    return new VElement({ // The list of players connected / online / in game
        tag: 'div',
        attrs: { class: 'playerlist' },
        children: [
            createOnePlayer(), // Need to make them be 4 psc
            createTwoPlayer(),
            createThreePlayer(),
            createFourPlayer(),
        ],
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

export function createGameInfoPanelC() {
    return new VElement({
        tag: 'div',
        attrs: { id: 'gameinfo' },
        children: [
            createGameInfoHeader(),
            createPlayersOnline(),
            createGameSpecs(),
        ],
    });
}