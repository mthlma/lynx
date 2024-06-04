module.exports = (ctx) => {
  const chatId = ctx.chat.id;
  const userName = ctx.from.first_name;
  let isFurry = "";

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randomValue = getRandomInt(2);

  if (randomValue === 0) {
    isFurry = `*You (${userName}) are not a furry.*`;
  } else {
    isFurry = `*Yes, you (${userName}) are a furry.*`;
  }

  const message = `${isFurry}`;
  
  ctx.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' })
    .catch(error => console.error('WARN: Message cannot be sent: ', error));
}
