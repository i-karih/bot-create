const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')

const token = "7123295257:AAEwU4cXLGNSxda9EFY3VtPIpN4Ci2wubkU"

const bot = new TelegramApi(token, {polling: true})
bot.setMyCommands([
    {command: '/game', description: 'Сыграем в игру'},
    {command: '/info', description: 'Получить информацию'},

])
const gameInfo = {}
const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`)
    const randomNumber = Math.floor(Math.random() * 10)
    gameInfo[chatId] = randomNumber
    await bot.sendMessage(chatId, `Отгадывай!`, gameOptions)
    console.log(gameInfo)

}



const start = () => {
    bot.on('message', msg => {
        const text = msg.text;
        const chatId = msg.chat.id

        if(text === '/start') {
            return bot.sendMessage(chatId, `Приветствую ${msg.from.first_name} это тестовый бот для учебы в разработке, выбери одну из команд`)
        }
        if(text === '/game') {
            return startGame(chatId)
        }
        if(text === '/info') {
            return bot.sendMessage(chatId, `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate`)
        }
    })
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data === '/again') {
            return startGame(chatId)
        }
        if(+data === +gameInfo[chatId]) {
            return bot.sendMessage(chatId, `Вы угадали`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Вы не угадали, я загадал число ${gameInfo[chatId]}`, againOptions)
        }

    })
}

start()