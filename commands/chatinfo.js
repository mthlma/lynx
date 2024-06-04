module.exports = (ctx) => {
  const chatId = ctx.chat.id;
  const chatName = ctx.chat.title;
  const chatHandle = ctx.chat.username;
  const isForum = ctx.chat.is_forum;
  let chatNameOutput = "";
  let chatHandleOutput = "";
  let isForumOutput = "";

  if (isForum) {
    isForumOutput = "*This chat is a forum (has topics enabled).*";
  } else {
    isForumOutput = "*This chat is not a forum (doesn't have topics enabled).*";
  }

  if (chatHandle) {
    chatHandleOutput = `*Chat handle:* \`@${chatHandle}`;
  } else {
    chatHandleOutput = `*Chat handle:* \`none (private group)\``;
  }
  
  // if chatName returns undefined, the chat is not a group or channel
  if (chatName) {
    chatNameOutput = `*Chat name:* \`${chatName}\`\n${chatHandleOutput}\n*Chat ID:* \`${chatId}\`\n\n${isForumOutput}`;
  } else {
    chatNameOutput = "Whoops!\nThis command doesn't work in PM.";
  }
  
  const message = chatNameOutput;

  ctx.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' })
    .catch(error => console.error('WARN: Message cannot be sent: ', error));
}
