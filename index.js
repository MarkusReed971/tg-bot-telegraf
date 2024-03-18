import { Telegraf } from 'telegraf'
import 'dotenv/config'

const bot = new Telegraf(process.env.TOKEN)

bot.on('message', (context) => {
  const { telegram, message } = context

  console.log(context)

  if (message.text === '/start') {
    return telegram.sendMessage(message.chat.id, `Привет, ${message.chat.first_name}`, {
      reply_markup: {
        keyboard: [
          [{ text: 'Открыть сайт', web_app: { url: 'http://localhost:5173/' } }]
        ]
      }
    });
  }
});

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
