import { Telegraf } from 'telegraf'
import 'dotenv/config'
import * as process from 'process'

const bot = new Telegraf(process.env.BOT_TOKEN as string)
const clientUrl = process.env.CLIENT_URL as string

bot.command('start', async (context) => {
  const { telegram, message } = context

    return telegram.sendMessage(message.chat.id, `Привет, ${message.chat.first_name}`, {
      reply_markup: {
        keyboard: [
          [{ text: 'Открыть сайт', web_app: { url: clientUrl } }]
        ]
      }
    });

})

bot.on('message', (context) => {
  if (context.message.web_app_data) {
    const data = JSON.parse(context.message.web_app_data.data)
    const { country, city, street } = data

    return context.telegram.sendMessage(context.message.chat.id, `Страна: ${country}, Город: ${city}, Улица: ${street}`)
  }
})

// bot.on('message', (context) => {
//
//   return context.telegram.sendMessage(context.message.chat.id, 'Da!')
// })

bot.launch()
