
// routes the response from websocket to various functions for components

export const wsResponseRouter = {
  newOnlineUser(payload) {
    onlineUserTracker.value.renderNewOnlineUser(payload);
  },
};