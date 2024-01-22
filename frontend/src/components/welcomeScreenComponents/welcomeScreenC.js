import { VElement } from "../../../../framework/VElement.js";
import { PLAYER_NAME_FORM_INPUT } from "../../js_modules/consts/consts.js";
import { Player } from "../../js_modules/models/playersModel.js";
import { playerList } from "../../js_modules/playerList.js";
import { mainView } from "../../mainView.js";
import { welcomeScreen } from "../../views/launchView.js";
import { chatC } from "../chatC.js";
import { waitingScreenC } from "./waitingScreenC.js";

function loadWaitingScreen(playerName) {
  mainView.addChild(chatC)
  // submit player name to ws connection, add player in ws_response_router
  
  welcomeScreen.delChild(WelcomeScreenC._vId);
  welcomeScreen.addChild(waitingScreenC);
  console.log(playerList.players)
}



const formChildren = [
    new VElement({ tag: 'input', attrs: { type: 'text' , name: PLAYER_NAME_FORM_INPUT}}),
    new VElement({ tag: 'input',
    attrs: { type: 'submit', value: 'Start!' },
})
];

const formElement = new VElement({
  tag: "form",
  attrs: { id: "chooseName" },
  children: formChildren,
  "@submit.prevent": (velem, event) => {
    const playerName = event.target[PLAYER_NAME_FORM_INPUT].value;
    loadWaitingScreen(playerName)
  },
});

export const WelcomeScreenC = new VElement({
    tag: 'div',
    attrs: { id: 'welcome', class: 'welcomescreens' },
    children: [
        new VElement({ content: 'Welcome to the game!' }),
        new VElement({ content: 'Choose your nickname:' }),
        formElement
    ]
});
