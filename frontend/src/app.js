import { Frame } from '../../framework/Frame.js';
//import { VElement } from '../../framework/VElement.js';
//import createRouter from '../../framework/router.js';
//import { routes } from './router/routes.js';
import { welcomeScreen } from './views/launchView.js';
//import { reactives } from '../../framework/functions.js';
//import { updateReactiveValues } from './helpers/updateReactiveValues.js';

//export const router = createRouter(routes);

export const App = new Frame() // create a new Frame, all virtual Elements will be added to it

//App.useEvents("click", "keydown", "dblclick")

//reactives.push(updateReactiveValues)

App.mount(document.getElementById('app'))

App.createElement(welcomeScreen);