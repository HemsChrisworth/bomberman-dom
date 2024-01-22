import { VElement } from "../../framework/VElement.js";
import { HeaderC } from "./components/headerC.js";
import { gameScreen } from "./views/gameView.js";
import { welcomeScreen } from "./views/launchView.js";

export const mainView = new VElement({
    tag: 'div',
    attrs: {id: "main"},
    children: [
        HeaderC, welcomeScreen // start at the welcome screen, delete from here when vies change
        // can put chatC into this component as well so view changes don't affect the chat element
    ]
}) //gameScreen