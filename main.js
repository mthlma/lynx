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
  let handler;
  const commandsRequiringBot = ['customize'];
  
  if (commandsRequiringBot.includes(path.parse(file).name)) {
    handler = require(path.join(commandsPath, file))(bot); // Passa a instância do bot
  } else {
    handler = require(path.join(commandsPath, file));
  }
  
  commandHandlers[command] = handler;
});

for (const [command, handler] of Object.entries(commandHandlers)) {
  bot.command(command.slice(1), handler);
}

//bot.start((ctx) => ctx.reply('Teste')); -> funciona

bot.on('polling_error', (error) => {
  console.error('WARN: Polling error:', error);
});
bot.launch();
console.log(`INFO: Lynx started\n`);
