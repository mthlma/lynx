module.exports = (bot) => (ctx) => {
  const chatId = ctx.chat.id;
  
  const opts = {
    reply_to_message_id: ctx.message_id,
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      keyboard: [
        [{ text: 'He/Him' }],
        [{ text: 'She/Her' }],
        [{ text: 'They/Them' }],
      ],
    },
    parse_mode: 'Markdown',
  };

  const message = "Select your pronouns:";
  const message2 = "You selected He/Him";
  const message3 = "You selected She/Her";
  const message4 = "You selected They/Them";

  console.log("Sending message:", message);
  ctx.telegram.sendMessage(chatId, message, opts)
    .catch(error => console.error('WARN: Message cannot be sent: ', error));

  bot.on('message', (ctx) => {
    console.log("Received message:", ctx.message.text);

    const text = ctx.message.text;
    let replyMessage;

    if (text === 'He/Him') {
      replyMessage = message2;
    } else if (text === 'She/Her') {
      replyMessage = message3;
    } else if (text === 'They/Them') {
      replyMessage = message4;
    }

    if (replyMessage) {
      console.log("Sending reply:", replyMessage);
      ctx.reply(replyMessage, {
        reply_markup: {
          remove_keyboard: true
        }
      }).catch(error => console.error('WARN: Message cannot be sent: ', error));
    }
  });
}
