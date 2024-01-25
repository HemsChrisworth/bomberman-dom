import { VElement } from "../../../../framework/VElement.js";

export function createWelcomeScreenC() {
  return new VElement({
    tag: 'div',
    attrs: { class: 'body' },
    //children: [createRegisterScreenC()]
  });
}