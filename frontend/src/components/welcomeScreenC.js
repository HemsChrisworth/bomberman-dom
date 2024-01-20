import { VElement } from "../../../framework/VElement.js";

const formChildren = [
    new VElement({ tag: 'input', attrs: { type: 'text' }}),
    new VElement({ tag: 'input', attrs: { type: 'submit', value: 'Start!' }})
];

export const WelcomeScreenC = new VElement({
    tag: 'div',
    attrs: { id: 'welcome', class: 'welcomescreens' },
    children: [
        new VElement({ content: 'Welcome to the game!' }),
        new VElement({ content: 'Choose your nickname:' }),
        new VElement({ tag: 'form', attrs: { id: 'chooseName' }, children: formChildren })
    ]
});