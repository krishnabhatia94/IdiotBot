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

require('dotenv').config({ quiet: true });
const clientID = '771195366645039115'

rest = new Discord.REST().setToken(process.env.DT);

/*******************THIS CODE DELETES ALL APPLICATION COMMANDS WHEN RUN******************//*
rest.put(Discord.Routes.applicationCommands(clientID), { body: [] })
 	.then(() => console.log('Successfully deleted all application commands.'))
 	.catch(console.error);
*/

client.once(Discord.Events.ClientReady, c => {
    console.log(`${c.user.username} is Online!`);
    client.user.setPresence({
        status: 'idle',
        activities: [{
            type: Discord.ActivityType.Custom,
            name: 'customname',
            state: '⚠️ stable for now, but many commands still in development!'
        }]
    });

    commands = [
        ping = new Discord.SlashCommandBuilder()
            .setName('ping')
            .setDescription('Tests response time for basic text response.')
            .setIntegrationTypes([0, 1])
            .setContexts([0, 1, 2]),
        hello = new Discord.SlashCommandBuilder()
            .setName('hello')
            .setDescription('Says hello to whoever sends the command!')
            .setIntegrationTypes([0, 1])
            .setContexts([0, 1, 2]),
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
                    .setDescription('Whether or not you want it to display that you authored the command. On by default.')
            )
            .addBooleanOption(option =>
                option
                    .setName('voice')
                    .setDescription('Whether or not you want it to be played in voice chat. On by default.')
            )
            .setIntegrationTypes([0])
            .setContexts([0]),
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
                    .setName('voice')
                    .setDescription('Whether or not you want it to be played in voice chat. On by default.')
            )
            .setIntegrationTypes([1])
            .setContexts([1, 2]),
        serverIcon = new Discord.SlashCommandBuilder()
            .setName('servericon')
            .setDescription('Gets the icon of the server and sends it!'),
        versionCom = new Discord.SlashCommandBuilder()
            .setName('version')
            .setDescription('Sends the current version of the bot.')
            .setIntegrationTypes([0, 1])
            .setContexts([0, 1, 2]),
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
        pfp = new Discord.SlashCommandBuilder()
            .setName('pfp')
            .setDescription('Sends your, or a requested user\'s profile picture!')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('If you want to get someone else\'s pfp, put the user in here! By default, it\'ll be your pfp.')
            )
            .setIntegrationTypes([0, 1])
            .setContexts([0, 1, 2]),
        caption1 = new Discord.SlashCommandBuilder()
            .setName('caption1')
            .setDescription('Adds a caption in style one to your profile picture, or an image you attach. Bottom text optional.')
            .addStringOption(option =>
                option
                    .setName('texttop')
                    .setDescription('The top text for your outputted image!')
                    .setRequired(true)
            )
            .addStringOption(option =>
                option
                    .setName('textbottom')
                    .setDescription('The bottom text for your outputted image!')
            )
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('If you want to use someone\'s pfp as the base image, put the user in here!')
            )
            .addAttachmentOption(option =>
                option
                    .setName('image')
                    .setDescription('If you want to make it output a specific image instead of your pfp!')
            )
            .setIntegrationTypes([0, 1])
            .setContexts([0, 1, 2]),
        caption2 = new Discord.SlashCommandBuilder()
            .setName('caption2')
            .setDescription('Adds a caption in style two to your profile picture, or an image you attach. Bottom text optional.')
            .addStringOption(option =>
                option
                    .setName('texttop')
                    .setDescription('The top text for your outputted image!')
                    .setRequired(true)
            )
            .addStringOption(option =>
                option
                    .setName('textbottom')
                    .setDescription('The bottom text for your outputted image!')
            )
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('If you want to use someone\'s pfp as the base image, put the user in here!')
            )
            .addAttachmentOption(option =>
                option
                    .setName('image')
                    .setDescription('If you want to make it output a specific image instead of your pfp!')
            )
            .setIntegrationTypes([0, 1])
            .setContexts([0, 1, 2])
    ];
    commands.forEach(command => {
        client.application.commands.create(command);
    });
});

let image;
let output;
let context;
let targetAttachment;
let outimage;

client.on(Discord.Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    
    let self;
    try { self = interaction.guild.members.cache.get("771195366645039115"); } catch {};

    /**
     * Helper function for replying to /say command.
     * @param {String} messageReply - Content of the message
     * @param {Boolean} keepAuthor - Default true, it replies to the command, if false, sends new message
     * @param {*} filesAttached - Requires you to use [] around the parameter
     */
    async function reply(messageReply, keepAuthor = true, filesAttached = []) {
        //isReply is true, it replies to the command, if false, sends new message
        //filesAttached requires you to use [] around the parameter
        if(keepAuthor || !interaction.guildId){
            await interaction.deferReply();
            await interaction.editReply({content: messageReply, files: filesAttached});
        } else {
            try{
                await interaction.deferReply();
            } catch (e) {
                console.error("Error sending response in context:", e);
            }
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
            if(interaction.options.getBoolean('keepauthor') == true) author = true;

            if(!author) reply(interaction.options.getString('message'), false); else reply(interaction.options.getString('message'));
            
            let playInVc = true;
            if(!interaction.member?.voice || !interaction.options.getBoolean('voice')) playInVc = false;

            if(playInVc){ try { if(interaction.member.voice.channel.id == self?.voice?.channel?.id){
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
            } } catch { } }
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
        case "pfp":
            if(interaction.options.getUser('user') == null){
                reply("No problem, here's your profile picture!", true, [interaction.user.displayAvatarURL({extension: 'png',  size: 1024 })]);
            } else {
                reply(`Sure, here's <@${interaction.options.getUser('user').id}>'s avatar!`, true, [interaction.options.getUser('user').displayAvatarURL({extension: 'png',  size: 1024 })]);
            }
            break;
        case "caption1":
            await interaction.deferReply();
            canvas.registerFont('./fonts/impact.ttf', { family: 'Impact'});
            image;
            output = canvas.createCanvas(512, 512);
            context = output.getContext('2d');

            targetAttachment = interaction.options.getAttachment('image');

            if(!targetAttachment && interaction.options.getUser('user') != null){
                image = await canvas.loadImage(interaction.options.getUser('user').displayAvatarURL({ extension: 'png', size: 512 }));
                context.drawImage(image, 0, 0, output.width, output.height);
            } else if(targetAttachment && interaction.options.getUser('user') == null){
                output.width = targetAttachment.width || 512; output.height = targetAttachment.height || 512;

                const attachment = targetAttachment.url.split('?')[0];
                if(attachment.endsWith(".png") || attachment.endsWith(".jpg") || attachment.endsWith(".gif") || attachment.endsWith(".webp")){
                    image = await canvas.loadImage(targetAttachment.url);
                }
            } else {
                image = await canvas.loadImage(interaction.user.displayAvatarURL({ extension: 'png', size: 512 }));
                await context.drawImage(image, 0, 0, output.width, output.height);
            }
            await context.drawImage(image, 0, 0, output.width, output.height);
            
            //text size equation: ((strlength / width) * (3/2)) + x
            //const sizeTop = (((interaction.options.getString('texttop').length / output.width) * (800)) + 10);
            context.font = '80px Impact, sans-serif';
            context.fillStyle = '#ffffff';
            context.textBaseline = 'top';

            /*let totalText = interaction.options.getString('texttop').split(" ");
            let progress = totalText[0];
            let currentLine = progress;
            let outString = " ";
            for(let i = 1; i < totalText.length; i++){
                let currentWord = totalText[i];
                let currentWidth = context.measureText(currentLine + " " + currentWord).width;
                if(currentWidth > output.width){
                    progress = progress + "\n" + currentLine;
                    currentLine = currentWord;
                } else {
                    currentLine += " " + currentWord;
                }
            }*/
            outString = interaction.options.getString('texttop');

            context.textAlign = 'center';
            context.fillText(outString, output.width / 2, output.height / 14);

            context.lineWidth = 3.3;
            context.strokeStyle = '#000000';
            context.strokeText(outString, output.width / 2, output.height / 14);

            if(interaction.options.getString('textbottom') != null){
                const sizeBottom = (((interaction.options.getString('textbottom').length * output.width) * (3)) + 12);
                // context.font = '80px Impact, sans-serif';
                context.textBaseline = 'bottom';
                // context.textAlign = 'center';
                context.fillText(interaction.options.getString('textbottom'), output.width / 2, output.height / 1.05);
                context.strokeText(interaction.options.getString('textbottom'), output.width / 2, output.height / 1.05);
            }
            outimage = new Discord.AttachmentBuilder(output.toBuffer(), 'captionone.jpg');
            try{await interaction.editReply({content: "(Feature is in beta!)", files: [outimage]});} catch {await interaction.editReply("Something went wrong :(");}
            //reply("*Feature is in beta!", true, [outimage]);
            break;
        case "caption2":
            await interaction.deferReply();
            canvas.registerFont('./fonts/impact.ttf', { family: 'Impact'});
            image = undefined;
            output = canvas.createCanvas(710, 510);
            context = output.getContext('2d');

            targetAttachment = interaction.options.getAttachment('image');
            
            const background = await canvas.loadImage('./blackspace.jpg');
            context.drawImage(background, 0, 0, output.width, output.height);

            if(!targetAttachment && interaction.options.getUser('user') != null){
                image = await canvas.loadImage(interaction.options.getUser('user').displayAvatarURL({ extension: 'png', size: 512 }));
            } else if(targetAttachment && interaction.options.getUser('user') == null){
                output.width = targetAttachment.width || 512; output.height = targetAttachment.height || 512;
                attachment = targetAttachment.url.split('?')[0];
                if(attachment.endsWith(".png") || attachment.endsWith(".jpg") || attachment.endsWith(".gif") || attachment.endsWith(".webp")){
                    image = await canvas.loadImage(targetAttachment.url);
                }
            } else {
                image = await canvas.loadImage(interaction.user.displayAvatarURL({ extension: 'png', size: 512 }));
                // await context.drawImage(image, 0, 0, output.width, output.height);
            }
            await context.drawImage(image, 100, 45, 500, 300);
            
            //const sizeTop = (((interaction.options.getString('texttop').length / output.width) * (800)) + 10);
            context.strokeStyle = '#ffffff';
            await context.strokeRect(85, 30, 530, 330);

            context.font = '55px "Times New Roman"';
            context.textAlign = 'center';
            context.fillStyle = '#ffffff';

            await context.fillText(interaction.options.getString('texttop'), output.width / 2, output.height / 1.2);

            if(interaction.options.getString('textbottom') != null){
                context.font = '30px "Times New Roman"';
                await context.fillText(interaction.options.getString('textbottom'), output.width / 2, output.height / 1.05);
            }
            outimage = new Discord.AttachmentBuilder(output.toBuffer(), 'captiontwo.jpg');
            try { await interaction.editReply({content: "(Feature is in beta!)", files: [outimage]});}
            catch { await interaction.editReply("Something went wrong :(");}
            //reply("*Feature is in beta!", true, [outimage]);
            break;
    }
});

const prefix = '>';
client.on("messageCreate", message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/), cmd = args.shift().toLowerCase();
    const self = message.guild.members.cache.get("771195366645039115");

    /**
     * Send a message in chat.
     * @param {String} messageReply - Message to reply with
     * @param {Boolean} isReply - Default true, it replies to the command, if false, sends new message 
     */
    function send(messageReply, isReply = true) {
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
        let reply = parseInt(message.content.split(" ").slice(1).join(" "));
        if(reply.toString() == '1'){
            send("HAHAHBUHAIFIHAUIFHUAHAHAHAHHAHAHAHAHHAHAHAHHAA", false);
        } else {
            send("HAHAHBUHAIFIHAUIFHUAHAHAHAHHAHAHAHAHHAHAHAHHAA");
        }
        playAudioFile('./audio/fart.mp3');
    }
});

client.login(process.env.DT);