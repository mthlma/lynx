const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require('telegraf')
const fs = require('fs');
const path = require('path');
const token = process.env.TGBOT_TOKEN;

const bot = new Telegraf(token, { polling: true });
const { isBlocked } = require('./blocklist');
const { isOnSpamWatch } = require('./spamwatch');
require('./logger');

const commandsPath = path.join(__dirname, 'commands');
const commandHandlers = {};

fs.readdirSync(commandsPath).forEach(file => {
  const command = `/${path.parse(file).name}`;
  const handler = require(path.join(commandsPath, file));
  commandHandlers[command] = handler;
});

for (const [command, handler] of Object.entries(commandHandlers)) {
  bot.command(command.slice(1), handler);
}

//bot.start((ctx) => ctx.reply('Teste')); -> funciona
bot.command('furry', (ctx)=>{
  ctx.reply('TesteFurry')
})

bot.on('message', (ctx) => {
  const userName = ctx.from.first_name;
  const userId = ctx.from.id;
  const messageText = ctx.text;

  if (ctx.chat.type == 'private') {
    if (isBlocked(userId) || isOnSpamWatch(userId)) {
      console.log(`WARN: Blocked user ${userName}, ${userId} tried to access the bot with the command or message "${messageText}".\n`);
      return;
    }
    console.log(`INFO: User ${userName}, ${userId} sent a command or message with the content:
    • ${messageText}\n`)
  }

  if (commandHandlers[messageText]) {
    commandHandlers[messageText](bot, (ctx));
  }
});

bot.on('polling_error', (error) => {
  console.error('WARN: Polling error:', error);
});
bot.launch();
console.log(`INFO: Lynx started\n`);
