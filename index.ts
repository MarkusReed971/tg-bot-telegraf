import { Markup, Telegraf } from 'telegraf'
import { message } from "telegraf/filters";
import * as process from 'process'
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_TOKEN as string)
const clientUrl = process.env.CLIENT_URL as string

bot.command('start', async (context) => {
  const { message } = context

  return context.reply(
    `Привет, ${message.from.first_name}`,
    Markup.keyboard([
      Markup.button.webApp('Открыть сайт', clientUrl)
    ])
  )
})

bot.on(message('web_app_data'), (context) => {
  const { message } = context

  if (!message.web_app_data) {
    return
  }

  const data = JSON.parse(message.web_app_data.data)
  const { country, city, street } = data

  return context.reply(`Страна: ${country}, Город: ${city}, Улица: ${street}`)
})

bot.launch()
