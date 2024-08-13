const Discord = require('discord.js');
const client = new Discord.Client({intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.GuildVoiceStates
]});

const canvas = require('canvas');
const vc = require('@discordjs/voice');
const fileService = require('fs');
const tts = require('say');

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
        status: 'online',
        activities: [{
            type: Discord.ActivityType.Custom,
            name: 'customname',
            state: '⚠️undergoing maintenance, hoping to regain full function soon, but all commands available are fully functional!'
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
                    .setRequired(true)
            )
            .addBooleanOption(option =>
                option
                    .setName('keepauthor')
                    .setDescription('Whether or not you want it to display that you authored the command. Off by default.')
            )
            .addBooleanOption(option =>
                option
                    .setName('voice')
                    .setDescription('Whether or not you want it to be played in voice chat. On by default.')
            ),
        serverIcon = new Discord.SlashCommandBuilder()
            .setName('servericon')
            .setDescription('Gets the icon of the server and sends it!'),
        versionCom = new Discord.SlashCommandBuilder()
            .setName('version')
            .setDescription('Sends the current version of the bot.'),
        joinCom = new Discord.SlashCommandBuilder()
            .setName('join')
            .setDescription('Joins your discord voice channel! Must be in one already to work.'),
        leaveCom = new Discord.SlashCommandBuilder()
            .setName('leave')
            .setDescription('Leaves your discord voice channel! Must be in one already to work.'),
        vcMemberCount = new Discord.SlashCommandBuilder()
            .setName('voicemembercount')
            .setDescription('Tells you how many members your discord voice channel has! Must be in one already to work.'),
        boomCom = new Discord.SlashCommandBuilder()
            .setName('boom')
            .setDescription('Vine boom! Also plays the sfx, like soundboard, if you\'re in a vc!'),
    ];
    commands.forEach(command => {
        client.application.commands.create(command);
    });
});

client.on(Discord.Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const self = interaction.guild.members.cache.get("771195366645039115");

    function reply(messageReply, isReply = true, filesAttached = []) {
        //messageReply is the content of the message
        //isReply is true, it replies to the command, if false, sends new message
        //filesAttached requires you to use [] around the parameter
        if(isReply){
            interaction.reply({content: messageReply, files: filesAttached});
        } else {
            try{
                interaction.deferReply();
                interaction.deleteReply();
            } catch {}
            if(interaction.guild === null) interaction.user.send({content: messageReply, files: filesAttached}); else interaction.channel.send({content: messageReply, files: filesAttached});
        }
    }

    function playAudioFile(pathToFile, err = false){
        try{
            if(interaction.member.voice.channel.id == self.voice.channel.id){
                const connection = vc.getVoiceConnection(interaction.guild.id);
                const player = vc.createAudioPlayer();
                connection.subscribe(player);
                player.play(vc.createAudioResource(pathToFile));
            }
        } catch {
            if(err) reply("Either both of us aren't in the same voice channel, or someone ate all my wiring.");
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
            let author = false;
            if(interaction.options.getBoolean('keepauthor') == true) author = true; else author = false;

            if(!author) reply(interaction.options.getString('message'), false); else reply(interaction.options.getString('message'));
            
            let playInVc = true;
            if(interaction.options.getBoolean('voice') == false) playInVc = false; else playInVc = true;

            if(playInVc){
                if(interaction.options.getString('message').length < 1500){
                    if (!fileService.existsSync('./cache')){
                        fileService.mkdirSync('./cache');
                    }
                    const timestamp = new Date().getTime();
                    const soundPath = `./cache/${timestamp}.wav`;
                    tts.export(interaction.options.getString('message'), null, 1, soundPath, (err) => {
                        playAudioFile(soundPath);
                    });
                } else {
                    interaction.followUp({ content: "Sorry! You're message was too long for voice chat...", ephemeral: true });
                }
            }
            break;
        case "servericon":
            attachment = new Discord.AttachmentBuilder().setFile("./parnets.png");
            if(interaction.guild === null){
                reply("Sure, but this is a dm, moron. Here's my profile picture, I guess??", true, [client.user.avatarURL()]);
            } else reply("sure, here!", true, [interaction.guild.iconURL()]);
            break;
        case "version":
            reply(`Idiot Bot is on v.**${require('./package.json').version}**.`);
            break;
        case "join":
            try{
                const connection = vc.joinVoiceChannel({
                    channelId: interaction.member.voice.channel.id,
                    guildId: interaction.guild.id,
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                });
                const player = vc.createAudioPlayer();
                const subscription = connection.subscribe(player);
                reply("I should've joined...!");
            } catch {
                reply("Either you aren't in a voice channel, or someone ate all my wiring.");
            }
            break;
        case "leave":
            try{
                const connection = vc.getVoiceConnection(interaction.guild.id);
                connection.destroy();
                reply("Left!");
            } catch {
                reply("Either both of us aren't in the same voice channel, or someone ate all my wiring.");
            }
            break;
        case "voicemembercount":
            try{
                reply(`There are *${interaction.member.voice.channel.members.size}* members in your voice chat!`);
            } catch {
                reply("Either you aren't in a voice channel, or someone ate all my wiring.");
            }
            break;
        case "boom":
            playAudioFile('./audio/boom.mp3');
            reply("***VINE BOOM***");
            break;
    }
});

const prefix = '>';
client.on("messageCreate", message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/), cmd = args.shift().toLowerCase();
    const self = message.guild.members.cache.get("771195366645039115");

    function send(messageReply, isReply = true) {
        //isReply is true, it replies to the command, if false, sends new message
        if(isReply){
            message.reply(messageReply);
        } else {
            if(message.channel.type != Discord.ChannelType.GuildText) message.author.send(messageReply); else message.channel.send(messageReply);
        }
    }
    function playAudioFile(pathToFile, err = false){
        try{
            if(message.member.voice.channel.id == self.voice.channel.id){
                const connection = vc.getVoiceConnection(message.guild.id);
                const player = vc.createAudioPlayer();
                connection.subscribe(player);
                player.play(vc.createAudioResource(pathToFile));
            }
        } catch {
            if(err) reply("Either both of us aren't in the same voice channel, or someone ate all my wiring.");
        }
    }

    if(cmd === 'fart'){
        reply = parseInt(message.content.split(" ").slice(1).join(" "));
        if(reply.toString() == '1'){
            send("HAHAHBUHAIFIHAUIFHUAHAHAHAHHAHAHAHAHHAHAHAHHAA", false);
        } else {
            send("HAHAHBUHAIFIHAUIFHUAHAHAHAHHAHAHAHAHHAHAHAHHAA");
        }
        playAudioFile('./audio/fart.mp3');
    }
});

client.login(token);