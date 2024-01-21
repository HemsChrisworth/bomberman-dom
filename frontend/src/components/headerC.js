import { VElement } from "../../../framework/VElement.js";

//bomberman dom main logo header
export const HeaderC = new VElement({
        tag: 'header',
        children: [
            new VElement({
                tag: 'img',
                attrs: { id: 'logo', src: './src/assets/images/Bomberman_logo.png' }
            })
        ]
});

