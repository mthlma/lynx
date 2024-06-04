module.exports = (ctx) => {
  const chatId = ctx.chat.id;
  const userName = ctx.from.first_name;
  const userId = ctx.from.id;
  const userHandle = ctx.from.username;
  const isBot = ctx.from.is_bot;
  const userPremium = ctx.from.is_premium;
  const userLang = ctx.from.language_code;
  let haveUsername = "";
  let userPremiumOutput = "";
  
  if (userPremium) {
    userPremiumOutput = "*You have a Telegram Premium subscription.*";
  } else {
    userPremiumOutput = "*You don't have a Telegram Premium subscription.*";
  }

  if (userHandle) {
    haveUsername = `*Your username is:* \`@${userHandle}\``;
  } else {
    haveUsername = `*Your username is:* \`none\``;
  }

  const message = `*Your name is:* \`${userName}\`\n${haveUsername}\n*Your ID is:* \`${userId}\`\n*You are a bot:* \`${isBot}\`\n*Your language:* \`${userLang}\`\n\n${userPremiumOutput}`;

  ctx.telegram.sendMessage(chatId, message, { parse_mode: 'Markdown' })
    .catch(error => console.error('WARN: Message cannot be sent: ', error));
}
