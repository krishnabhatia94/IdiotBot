const Discord = require('discord.js');
const { version } = require('ytdl-core');
const client = new Discord.Client({intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.DirectMessages
]});

const token = 'NzcxMTk1MzY2NjQ1MDM5MTE1.GHW9rC.0B6CiqdxpzPtRcUIbq0BM1tvanlRTm0yV_dhB8';
const clientID = '771195366645039115'

rest = new Discord.REST().setToken(token);

/*******************THIS CODE DELETES ALL APPLICATION COMMANDS WHEN RUN******************//*
rest.put(Discord.Routes.applicationCommands(clientID), { body: [] })
 	.then(() => console.log('Successfully deleted all application commands.'))
 	.catch(console.error);
*/

client.once('ready', () => {
    console.log('Idiot Bot is Online!');
    client.user.setPresence({
        status: 'idle',
        activities: [{
            type: Discord.ActivityType.Custom,
            name: 'customname',
            state: '⚠️currently on maintenance, slowly bulding up command library'
        }]
    });

    commands = [
        ping = new Discord.SlashCommandBuilder()
            .setName('ping')
            .setDescription('Tests response time for basic text response.'),
        hello = new Discord.SlashCommandBuilder()
            .setName('hello')
            .setDescription('Says hello to whoever sends the command!'),
        say = new Discord.SlashCommandBuilder()
            .setName('say')
            .setDescription('Says whatever you tell it to say!')
            .addStringOption(option =>
                option
                    .setName('message')
                    .setDescription('The message you want the bot to say')
            ),
        serverIcon = new Discord.SlashCommandBuilder()
            .setName('servericon')
            .setDescription('Gets the icon of the server and sends it!'),
        versionCom = new Discord.SlashCommandBuilder()
            .setName('version')
            .setDescription('Sends the current version of the bot.'),
    ];
    commands.forEach(command => {
        client.application.commands.create(command);
    });
});

client.on(Discord.Events.InteractionCreate, interaction => {
    if(!interaction.isChatInputCommand()) return;

    function reply(messageReply, filesAttached = [], isReply = true) {
        //isReply is true, it replies to the command, if false, sends new message
        if(isReply){
            interaction.reply(messageReply, {files: filesAttached});
        } else {
            try{
                interaction.deferReply();
                interaction.deleteReply();
            } catch {}
            if(interaction.guild === null) interaction.user.send(messageReply); else interaction.channel.send(messageReply);
        }
    }

    switch(interaction.commandName){
        case "ping":
            reply(`Time to respond: \`${Math.abs(Date.now() - interaction.createdTimestamp).toString()}\`ms`);
            break;
        case "hello":
            reply(`Hello ${interaction.user.displayName}!`);
            break;
        case "say":
            reply(interaction.options.getString('message') ?? "You forgot a message!", null, false);
            break;
        case "servericon":
            if(interaction.guild === null){
                reply(`Sure, but this is a dm, moron. Here's my profile picture, I guess?? ${client.application.iconURL()}`);
            } else reply(`Here you go! 😄 ${interaction.guild.iconURL()}`); //new Discord.AttachmentBuilder().setFile(interaction.guild.iconURL()));
            break;
        case "version":
            reply(`Idiot Bot is on **v. ${require('./package.json').version}.`);
            break;
    }
});

const prefix = '>';
client.on("messageCreate", message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/), cmd = args.shift().toLowerCase();

    function send(messageReply, isReply = true) {
        //isReply is true, it replies to the command, if false, sends new message
        if(isReply){
            message.reply(messageReply);
        } else {
            if(message.channel.type != Discord.ChannelType.GuildText) message.author.send(messageReply); else message.channel.send(messageReply);
        }
    }

    if(cmd === 'fart'){
        reply = parseInt(message.content.split(" ").slice(1).join(" "));
        if(reply.toString() == '1'){
            send("HAHAHBUHAIFIHAUIFHUAHAHAHAHHAHAHAHAHHAHAHAHHAA", false);
        } else {
            send("HAHAHBUHAIFIHAUIFHUAHAHAHAHHAHAHAHAHHAHAHAHHAA");
        }
    }
});

client.login(token);