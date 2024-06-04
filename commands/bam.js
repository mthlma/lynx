module.exports = (ctx) => {
  const chatId = ctx.chat.id;

  const message = `User was bammed with success!`;
  
  ctx.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' })
    .catch(error => console.error('WARN: Message cannot be sent: ', error));
}