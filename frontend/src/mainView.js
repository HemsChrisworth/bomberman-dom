import { VElement } from "../../framework/VElement.js";
import { gameBoxC } from "./components/gameScreenComponents/gameBoxC.js";
import { HeaderC } from "./components/headerC.js";
import { welcomeScreen } from "./views/launchView.js";

export const mainView = new VElement({
    tag: 'div',
    attrs: {id: "main"},
    children: [
        HeaderC, welcomeScreen
        // HeaderC, gameBoxC
        // can put chatC into this component as well so view changes don't affect the chat element
    ]
}) //gameScreen