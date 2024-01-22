import { VElement } from "../../../framework/VElement.js";
import { WelcomeScreenC } from '../components/welcomeScreenComponents/welcomeScreenC.js';

export const welcomeScreen = new VElement({
        tag: 'div',
        attrs: {class: 'body' },
        children: [WelcomeScreenC]
      });
