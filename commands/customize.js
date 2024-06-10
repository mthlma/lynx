module.exports = (bot) => (ctx) => {
  const chatId = ctx.chat.id;
  const fs = require('fs').promises;

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

  async function writeToFile(text) {
    try {
      await fs.appendFile('dados.txt', text + '\n');
      return 'Texto escrito com sucesso!';
    } catch (error) {
      console.error('Erro ao escrever no arquivo:', error);
      return 'Ocorreu um erro ao escrever no arquivo.';
    }
  }

  const message = "Select your pronouns:";
  const message2 = "You selected He/Him";
  const message3 = "You selected She/Her";
  const message4 = "You selected They/Them";


  console.log("Sending message:", message);
  ctx.telegram.sendMessage(chatId, message, opts)
    .catch(error => console.error('WARN: Message cannot be sent: ', error));

  bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    const id = ctx.from.id + ' ';
    let replyMessage;

    switch (text) {
      case 'He/Him':
      case 'She/Her':
      case 'They/Them':
        replyMessage = await writeToFile(id + text);
        break;
      default:
        replyMessage = 'Mensagem não reconhecida. Por favor, envie "He/Him", "She/Her" ou "They/Them".';
    }

    if (replyMessage) {
      console.log('Sending reply:', replyMessage);

      try {
        await ctx.reply(replyMessage, {
          reply_markup: {
            remove_keyboard: true
          }
        });
      } catch (error) {
        console.error('WARN: Message cannot be sent:', error);
      }
    }
  });
}
