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



var OverwatchGroupID = [];
var OverwatchGroupUser = [];

bot.on('message', function (user, userID, channelID, message, evt) {
   
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `.g`
    if (message.substring(0, 2) == '.g') {
        var args = message.substring(2).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        console.log(cmd);
        switch(cmd) {
///////////////////////////////////////////////////
///////////Memes//////////////////////////////////
/////////////////////////////////////////////////
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
            case 'echo':
                bot.sendMessage({
                    to: channelID,
                    message: args.toString().replace(/,/g ,' ')
                });
                break;
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'gboobs - Bewbs \ngass - Ass \ngecho - Repeat after me \ngadd (group) - Join a party\ngwho (group) - Lists everyone in the party\ngstart (group) - Party leader can ping and start'
                });
                break;
//////////////////////////////////////////////////////////////////
//////////PARTY COMMANDS/////////////////////////////////////////
////////////////////////////////////////////////////////////////
            case 'add':
                if (args[0] == ("overwatch" || "Overwatch")){
                    if (OverwatchGroupUser.length < 6){
                        if (user != (OverwatchGroupUser[0] || OverwatchGroupUser[1] || OverwatchGroupUser[2] || OverwatchGroupUser[3] || OverwatchGroupUser[4] || OverwatchGroupUser[5])){
                            OverwatchGroupUser[OverwatchGroupUser.length] = user;
                            OverwatchGroupID[OverwatchGroupID.length] = userID;
                            bot.sendMessage({
                                to: channelID,
                                message: `<@${userID}> is in for some Overwatch! (${OverwatchGroupUser.length}/6)`
                            });
                        } else {
                            bot.sendMessage({
                                to: channelID,
                                message: 'You have already joined the group.'
                            });
                        }
                    } else {
                        bot.sendMessage({
                            to: channelID,
                            message: 'Group is full'
                        });
                    }
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Invalid group!'
                    });
                }
                break;
            case 'who':
                if (args[0] == ("overwatch" || "Overwatch")){
                    if (OverwatchGroupUser.length > 0){
                        bot.sendMessage({
                            to: channelID,
                            message: `${OverwatchGroupUser[0]} (leader), ${OverwatchGroupUser[1]}, ${OverwatchGroupUser[2]}, ${OverwatchGroupUser[3]}, ${OverwatchGroupUser[4]}, ${OverwatchGroupUser[5]} (${OverwatchGroupUser.length}/6)`.replace(/undefined/g, "empty")
                        });
                    } else {
                        bot.sendMessage({
                            to: channelID,
                            message: 'Group is empty'
                        });
                    }
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Invalid group!'
                    });
                }
                break;
            case 'start':
                if (args[0] == ("overwatch" || "Overwatch")){
                    if (user == OverwatchGroupUser[0]){
                        bot.sendMessage({
                            to: channelID,
                            message: `We are starting! <@${OverwatchGroupID[0]}> <@${OverwatchGroupID[1]}> <@${OverwatchGroupID[2]}> <@${OverwatchGroupID[3]}> <@${OverwatchGroupID[4]}> <@${OverwatchGroupID[5]}>`.replace(/<@undefined>/g, "")
                        });
                        OverwatchGroupUser = [];
                        OverwatchGroupID = [];
                    } else {
                        bot.sendMessage({
                            to: channelID,
                            message: 'You are not the group leader!'
                        });
                    }
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Invalid group!'
                    });
                }
                break;       
         } 
     }
});