const TelegramBot = require('node-telegram-bot-api');
const config = require("./config");
const bot = new TelegramBot(config.TOKEN, {polling: true});

// On receiving start command
bot.onText(/\/start/, (msg) => {
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: config.KEYBOARD,
            resize_keyboard: true,
        })
    };
    console.log(`Received start command at ${new Date(msg.date * 1000)}.`);
    console.log(`User info:\nUsername: ${msg.from.username} \nFirst name: ${msg.from.first_name} \nLast name: ${msg.from.last_name}\n `);
    bot.sendMessage(msg.chat.id, config.RESPONSE_HELLO, opts);
    console.log(`Sent start message.`);
});

const replyToRequest = function (msg, match) {
    const chatId = msg.chat.id;
    let response;
    if (msg.text === `/start`) return;
    console.log(`Received message '${msg.text}' at ${new Date(msg.date * 1000)}.`);
    console.log(`User info:\nUsername: ${msg.from.username} \nFirst name: ${msg.from.first_name} \nLast name: ${msg.from.last_name}\n `);

    switch (msg.text) {
        case 'Monday':
            response = config.RESPONSE_MONDAY;
            break;
        case 'Tuesday':
            response = config.RESPONSE_TUESDAY;
            break;
        case 'Wednesday':
            response = config.RESPONSE_WEDNESDAY;
            break;
        case 'Thursday':
            response = config.RESPONSE_THURSDAY;
            break;
        case 'Friday':
            response = config.RESPONSE_FRIDAY;
            break;
        case 'Saturday':
            response = config.RESPONSE_SATURDAY;
            break;
        case 'Sunday':
            response = config.RESPONSE_SUNDAY;
            break;
        default:
            response = config.RESPONSE_DEFAULT;
            break;
    }

    bot.sendMessage(chatId, response);
    console.log(`Sent response message: ${response}.`);
};

bot.on('message', replyToRequest);
