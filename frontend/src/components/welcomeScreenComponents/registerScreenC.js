import { VElement } from "../../../../framework/VElement.js";
import { PLAYER_NAME_FORM_INPUT } from "../../js_modules/consts/consts.js";

export function createErrorMessageC() {
    return new VElement({
        tag: 'div',
        attrs: { id: 'error', class: 'errormessage hide' },
    });
}
export function createRegisterScreenC(registerplayer, errorMessageC) {
    return new VElement({
        tag: 'div',
        attrs: { id: 'welcome', class: 'welcomescreens' },
        children: [
            new VElement({ tag: 'p', attrs: { id: "welcometothegame" }, content: 'Welcome to the game!' }),
            new VElement({ tag: 'span', attrs: { class: "welcometext" }, content: 'Choose your nickname:' }),
            errorMessageC,
            createFormElement(registerplayer),
        ]
    });
}

function limitCharacters(event, maxLength) {
    const inputText = event.target.value;
    if (inputText.length > maxLength) {
        event.target.value = inputText.slice(0, maxLength);
    }
}

function createFormElement(registerplayer) {
    return new VElement({
        tag: "form",
        attrs: { id: "chooseName" },
        children: createFormChildren(),
        "@submit.prevent": (velem, event) => {
            const playerName = event.target[PLAYER_NAME_FORM_INPUT].value;

            registerplayer(playerName)
        },
    });
}

function createFormChildren() {
    return [
        new VElement({
            tag: 'input',
            attrs: { required: "", type: 'text', autofocus: "", id: 'chooseusername', autocomplete: "off", name: PLAYER_NAME_FORM_INPUT },
            "@input": (velem, event) => {
                limitCharacters(event, 15) // Limits the number of nickname symbols to 15
            },
        }),
        new VElement({
            tag: 'input',
            attrs: { type: 'submit', id: "startgame", value: 'Start!' },
        })
    ];
}
