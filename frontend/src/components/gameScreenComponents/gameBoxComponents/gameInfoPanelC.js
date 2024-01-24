import { VElement } from "../../../../../framework/VElement.js";

const Avatar = new VElement({
    tag: 'div',
    attrs: { class: 'avatar' , style: 'background-image: url("path/to/your/image.jpg");' },
    // Replace background-image path vith actual avatar
});

const Status = new VElement({
    tag: 'span',
    attrs: { class: 'userGameStatus' , class: 'material-symbols-outlined' },
    content: "favorite",
});

const Username = new VElement({
    tag: 'span',
    attrs: { class: 'gamePlayerUsername' },
    content: 'Player1',
});

const OnePlayer = new VElement({ // One element of the players list
    tag: 'div',
    attrs: { class: 'playerone' },
    children: [
        // Avatar (hero + color) + nickname + status icon: "In game" OR "Died but online (can write in chat)" OR "Offline"
        // If in game => <3 <3 <3 + Lives
        Avatar,
        Username,
        Status,
    ],
});

const TwoPlayer = new VElement({
    tag: 'div',
    attrs: { class: 'playerone' },
    children: [
        Avatar,
        Username,
        Status,
    ],
});

const ThreePlayer = new VElement({
    tag: 'div',
    attrs: { class: 'playerone' },
    children: [
        Avatar,
        Username,
        Status,
    ],
});

const FourPlayer = new VElement({
    tag: 'div',
    attrs: { class: 'playerone' },
    children: [
        Avatar,
        Username,
        Status,
    ],
});

const PlayersOnline = new VElement({ // The list of players connected / online / in game
    tag: 'div',
    attrs: { class: 'playerlist' },
    children: [
        OnePlayer, // Need to make them be 4 psc
        TwoPlayer,
        ThreePlayer,
        FourPlayer,
    ],
});

const GameSpecs = new VElement({ // The list of game details: Lives, Score, FPS, etc
    tag: 'div',
    attrs: { id: 'gamespecs' },
    content: "Score: 1500", // Remove the content when the eal specs will be added
    children: [
        // children
    ],
});

const GameInfoHeader = new VElement({ 
    tag: 'span',
    attrs: { id: 'gameinfoheader' },
    content: "Players",
});

export const gameInfoPanelC = new VElement({
    tag: 'div',
    attrs: { id: 'gameinfo' },
    children: [
        GameInfoHeader,
        PlayersOnline,
        GameSpecs,
    ],
});