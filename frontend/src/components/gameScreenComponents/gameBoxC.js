import { VElement } from "../../../../framework/VElement";

export const gameBoxC = new VElement({
    tag: 'div',
    attrs: {id: 'game'},
    children: []
})

/* <div id="game">
        <div id="gamepanel">
            <div id="gamedata">
                <span class="gameinfo">hearts & FPS</span>
            </div>
            <div id="gamescreen">
            <!-- An image placeholder of the actual game screen,
                real game: (height: 12 x 32px blocks (384 px) + frame) + (width: 18 x 32px blocks (576 px) + frame) -->
                <img src="https://img.y8.com/cloud/y8-thumbs/103/big.gif" style="width: 576px; height: 384px;">
            </div>
        </div>
        <div id="chat">
            <p id="chatheader">Chat</p>
            <div id="chatmessagearea">

            </div>
            <form id="chatform">
                <input type="text" placeholder="Type your message here..."> <!-- Submit on Enter -->
                <input type="submit" value="Send">
            </form>
        </div>
    </div> */