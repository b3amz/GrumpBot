var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
console.log("gothere");
bot.on('ready', function (evt) {
    console.log("gothere");
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
console.log("gothere");
bot.on('message', function (user, userID, channelID, message, evt) {
   
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `.g`
    if (message.substring(0, 2) == '.g') {
        var args = message.substring(2).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        console.log(cmd);
        switch(cmd) {
            // .gboobs
            case 'boobs':
                bot.sendMessage({
                    to: channelID,
                    message: '(.)(.)'
                });
                break;
            case 'ass':
                bot.sendMessage({
                    to: channelID,
                    message: '(‿ˠ‿)'
                });
                break;
            // Just add any case commands if you want to..
         }
     }
});