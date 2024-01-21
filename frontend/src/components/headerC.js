import { VElement } from "../../../framework/VElement.js";

//bomberman dom main logo header
export const HeaderC = new VElement({
        tag: 'header',
        children: [
            new VElement({
                tag: 'h1',
                attrs: { id: 'logo' },
                content: 'Bomberman'
            })
        ]
});