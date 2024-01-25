import { VElement } from "../../../../framework/VElement.js";
import { PLAYER_NAME_FORM_INPUT } from "../../js_modules/consts/consts.js";
import { Player } from "../../js_modules/models/playersModel.js";
import { playerList } from "../../js_modules/playerList.js";
import { ChatModel } from "../../js_modules/models/chatModel.js";
import { WelcomeScreenModel } from "../../js_modules/models/welcomeScreenModel.js";
import { mainView } from "../../app.js";

function loadWaitingScreen(playerName) {
    console.debug(playerName);
    const chatModel = mainView.addChatView();
    chatModel.launch(playerName);
    const welcomeScreenModel = mainView.currentViewModel;
    // submit player name to ws connection, add player in ws_response_router
    welcomeScreenModel.showWaitingScreen()
    /*if (waiting20sec === 0) { // + add (.. || playerCount === 4)
        welcomeScreen.delChild(waitingScreenC);
        welcomeScreen.addChild(waitingScreen10secC);
        if (waiting10sec === 0) { 
            welcomeScreen.delChild(waitingScreen10secC);
            
        }
    }*/
    console.log(playerList.players)
    mainView.currentViewModel.countdown10sec();
    mainView.currentViewModel.countdown20sec();
}



function createFormChildren() {
    return [
        new VElement({ tag: 'input', attrs: { required: "", type: 'text', id: 'chooseusername', autocomplete: "off", name: PLAYER_NAME_FORM_INPUT } }),
        new VElement({
            tag: 'input',
            attrs: { type: 'submit', id: "startgame", value: 'Start!' },
        })
    ];
}

function createFormElement() {
    return new VElement({
        tag: "form",
        attrs: { id: "chooseName" },
        children: createFormChildren(),
        "@submit.prevent": (velem, event) => {
            const playerName = event.target[PLAYER_NAME_FORM_INPUT].value;

            loadWaitingScreen(playerName)
        },
    });
}

export function createRegisterScreenC() {
    return new VElement({
        tag: 'div',
        attrs: { id: 'welcome', class: 'welcomescreens' },
        children: [
            new VElement({ tag: 'p', attrs: { id: "welcometothegame" }, content: 'Welcome to the game!' }),
            new VElement({ tag: 'span', attrs: { class: "welcometext" }, content: 'Choose your nickname:' }),
            createFormElement(),
        ]
    });
}