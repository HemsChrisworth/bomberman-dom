
import { VElement } from "../../../framework/VElement.js";
import { CHAT_MESSAGE_FORM_INPUT_NAME } from "../js_modules/consts/consts.js";

export function createChatMessageArea() {
  return new VElement({
    tag: 'div',
    attrs: { id: 'chatmessagearea' },
    children: [
      // chat messages here, new messages as addChild
      new VElement({
        tag: 'div',
        attrs: { class: 'chatmessage', id: 'ChatStatusConnected' },
        content: "Connected to chat...",
      })
    ]
  });
}


export function createChatC() {
  return new VElement({
    tag: "div",
    attrs: { id: "chat" },
    children: [
      // chatheader
      new VElement({
        tag: 'p',
        attrs: { id: 'chatheader' },
        content: 'Chat'
      }),
      //ChatMessageArea(), will be added in chatModel.js
      // chat form
      new VElement({
        tag: "form",
        attrs: { id: "chatform" },
        children: [
          new VElement({
            tag: "input",
            attrs: { type: "text", id: "chattextarea", name: CHAT_MESSAGE_FORM_INPUT_NAME , autocomplete: "off", placeholder: 'Type here...'},
          }),
          new VElement({
            tag: "input",
            attrs: { type: "Submit", id: 'sendmessagebutton', class: 'material-symbols-outlined', value: 'send' },
          }),
        ],
        '@submit.prevent': (velem, event) => {
          const chatMessage = event.target[CHAT_MESSAGE_FORM_INPUT_NAME].value

          // send message to backend via 'ws.request()'
          // in ws_response_router, add the new message into the chatMessageArea VElement with addChild() method

        }
      }),
    ],
  });
}