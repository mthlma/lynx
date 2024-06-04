module.exports = (ctx) => {
  const chatId = ctx.chat.id;
  const userName = ctx.from.first_name;
  let isGay = "";

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randomValue = getRandomInt(2);

  if (randomValue === 0) {
    isGay = `*You (${userName}) are not gay.*`;
  } else {
    isGay = `*Yes, you (${userName}) are gay.*`;
  }

  const message = `${isGay}`;

  ctx.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' })
    .catch(error => console.error('WARN: Message cannot be sent: ', error));
}
