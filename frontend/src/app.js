import { Frame } from '../../framework/Frame.js';
import { mainView } from './mainView.js';
import { welcomeScreen } from './views/launchView.js';
import { countdown20sec } from '../design.js';
import { testCreateMap, testRenderMap } from './test/test.js';

//export const router = createRouter(routes);

export const App = new Frame() // create a new Frame, all virtual Elements will be added to it

App.useEvents("click", "keydown", "submit") // REQUIRED

//reactives.push(updateReactiveValues)

App.mount(document.getElementById('app'))

App.addVElement(mainView);

testRenderMap()