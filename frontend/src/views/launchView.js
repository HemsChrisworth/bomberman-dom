import { VElement } from "../../../framework/VElement.js";

import { HeaderC } from "../components/headerC.js";
import { WelcomeScreenC } from '../components/welcomeScreenC.js';

export const welcomeScreen = new VElement({
        tag: 'div',
        attrs: { id: 'app', class: 'body' },
        children: [HeaderC, WelcomeScreenC]
      });
