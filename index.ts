// import { Markup, Telegraf } from 'telegraf'
// import { message } from "telegraf/filters";

import TelegramApi from 'node-telegram-bot-api'

import * as process from 'process'
import 'dotenv/config'

// ****************************** TELEGRAF ******************************

// const bot = new Telegraf(process.env.BOT_TOKEN as string)
// const clientUrl = process.env.CLIENT_URL as string
//
// bot.command('start', async (context) => {
//   const { message } = context
//
//   return context.reply(
//     `Привет, ${message.from.first_name}`,
//     Markup.keyboard([
//       Markup.button.webApp('Открыть сайт', clientUrl)
//     ])
//   )
// })
//
// bot.on(message('web_app_data'), (context) => {
//   const { message } = context
//
//   if (!message.web_app_data) {
//     return
//   }
//
//   const data = JSON.parse(message.web_app_data.data)
//   const { country, city, street } = data
//
//   return context.reply(`Страна: ${country}, Город: ${city}, Улица: ${street}`, Markup.removeKeyboard())
// })
//
// bot.launch()

// ****************************** NODE-TELEGRAM-BOT-API ******************************

const bot = new TelegramApi(process.env.BOT_TOKEN as string, {polling: true})
const clientUrl = process.env.CLIENT_URL as string

const start = async () => {
    await bot.setMyCommands([
        { command: '/start', description: 'Начать' }
    ])

    bot.on('message', async (message) => {
        const { text, chat } = message

        if (text === '/start') {
            return bot.sendMessage(chat.id, `Привет, ${chat.first_name}`, {
                reply_markup: {
                    keyboard: [
                        [{ text: 'Открыть сайт', web_app: { url: clientUrl } }]
                    ]
                }
            })
        }
    })

    bot.on('web_app_data', async (message) => {
        const { web_app_data, chat } = message

        if (web_app_data) {
            if (!web_app_data) {
                return
            }

            const data = JSON.parse(web_app_data.data)
            const { country, city, street } = data

            return bot.sendMessage(chat.id, `Страна: ${country}, Город: ${city}, Улица: ${street}`, {
                reply_markup: {
                    remove_keyboard: true
                }
            })
        }
    })
}

start()
