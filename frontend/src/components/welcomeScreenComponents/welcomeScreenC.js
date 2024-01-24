import { VElement } from "../../../../framework/VElement.js";
import { PLAYER_NAME_FORM_INPUT } from "../../js_modules/consts/consts.js";
import { Player } from "../../js_modules/models/playersModel.js";
import { playerList } from "../../js_modules/playerList.js";
import { mainView } from "../../mainView.js";
import { welcomeScreen } from "../../views/launchView.js";
import { waitingScreenC } from "./waitingScreenC.js";
import { waitingScreen10secC } from "./waitingScreenC.js";
import { countdown10sec, countdown20sec} from "../../../design.js";
import { ChatModel } from "../../js_modules/models/chatModel.js";

function loadWaitingScreen(playerName) {
  console.debug(playerName);
  const chat = new ChatModel
  chat.launch(playerName)
  mainView.addChild(chat.chatC)
  // submit player name to ws connection, add player in ws_response_router
  
  welcomeScreen.delChild(WelcomeScreenC.vId);
  welcomeScreen.addChild(waitingScreenC);
  /*if (waiting20sec === 0) { // + add (.. || playerCount === 4)
    welcomeScreen.delChild(waitingScreenC);
    welcomeScreen.addChild(waitingScreen10secC);
    if (waiting10sec === 0) { 
      welcomeScreen.delChild(waitingScreen10secC);

    }
  }*/
  console.log(playerList.players)
  countdown10sec();
  countdown20sec();
}



const formChildren = [
    new VElement({ tag: 'input', attrs: { required:"", type: 'text' , id: 'chooseusername', name: PLAYER_NAME_FORM_INPUT}}),
    new VElement({ tag: 'input',
    attrs: { type: 'submit', id: "startgame", value: 'Start!' },
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
        new VElement({ tag: 'p', attrs: { id: "welcometothegame" }, content: 'Welcome to the game!' }),
        new VElement({ tag: 'span', attrs: { class: "welcometext" }, content: 'Choose your nickname:' }),
        formElement
    ]
});
