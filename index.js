//Start imports
const {TOKEN, prefix} = require( './config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const { readCmds } = require('./util/readcmds');
const  {findSimCmd} = require('./util/similarcmd');
//End imports

//CMD handling
let commandCollection = new Discord.Collection();
readCmds(commandCollection, './src/cmds')

//Body
client.once('ready', () => {
    console.log('READY');
})

client.on('message', (message) => {
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    if(message.author.bot && message.author.id !== "786839357062774794") return;
    let requestedCmd = message.content.toLowerCase().replace(prefix, '');
    let args = message.content.toLowerCase().replace(`${requestedCmd} `, '')
    if(!commandCollection.has(requestedCmd)) return message.channel.send(`I didn't quite understand that, maybe you meant \`${findSimCmd(commandCollection, requestedCmd)}\``).then(msg => {
        msg.awaitReactions()
    });
    let reqCmdFile = require(commandCollection.get(requestedCmd))
    reqCmdFile.execute(message, args);
})
//End body




//Footer code
client.login(TOKEN);
//End footer
