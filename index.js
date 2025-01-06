require ('dotenv').config() 
const {
    Bot, 
    GrammyError, 
    HttpError, 
    keyboard
} = require('grammy');
const {hydrate} = require ('@grammyjs/hydrate')

const bot = new Bot(process.env.BOT_API_KEY)
bot.use(hydrate())
bot.api.setMyCommands([
    {
        command:'start',
        description:'Запуск бота'
    },
    {
        command:'saymyname',
        description:'Попробуй тыкнуть'
    }
])

bot.command('start',async(ctx) => {
    await ctx.reply('Привет, я бот.')

})


bot.command('saymyname', async (ctx)=>{
    await ctx.reply('Я не знаю твоего имени.')
})


bot.on('message', async(ctx)=>{
    await ctx.reply('я люблю вику')
    })

bot.catch ((err) => {
    const ctx = err.ctx
    console.error(`Error while handling update ${ctx.update.update_id}:`)
    const e = err.error
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description)
    }
     else if (e instanceof HttpError) {
            console.error("Could not contact Telegram", e)
        } else {
            console.error("unknown error")
        }
})

bot.start();