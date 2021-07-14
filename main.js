const Discord = require('discord.js');
const fs = require('ffmpeg');
const { get } = require('http');
const path = require('path');
const ytdl = require('discord-ytdl-core');
const Canvas = require('canvas');
const tts = require('say');
const fileService = require('fs');
require('discord-reply');
const { UV_FS_O_FILEMAP } = require('constants');
const myIntents = new Discord.Intents(Discord.Intents.ALL);
const client = new Discord.Client({ ws: { intents: myIntents } });
const prefix = '>';

client.once('ready', () => {
    console.log('Idiot Bot is Online!');
    client.user.setPresence({ activity: { name: "i am an image {>help}" }, status: 'online'})
    .then(() => console.log)
    .catch(console.error);
});

const guildID = '791784654566064128';
const getApp = (guildID) => {
    const app = client.api.applications(client.user.id)
    if(guildID){
        app.guilds(guildID);
    }
    return app;
}

client.once('ready', async () => {
    const commands = await getApp(guildID).commands.get();

    client.api.applications(client.user.id).commands.post({data: {
        name: 'slash',
        description: "Why don't I have all slash commands?"
    }
    });
    client.api.applications(client.user.id).commands.post({data: {
        name: 'idiot',
        description: "Do it, call me an idiot!"
    }
    });
    client.api.applications(client.user.id).commands.post({data: {
        name: 'danny',
        description: "Danny the car from Cars 3."
    }
    });
    client.api.applications(client.user.id).commands.post({data: {
        name: 'fart',
        description: "I will laugh. (Not vc-compatible yet!)"
    }
    });
    client.api.applications(client.user.id).commands.post({data: {
        name: 'ping',
        description: "Test my reaction time!"
    }
    });
    client.api.applications(client.user.id).guilds('791784654566064128').commands.post({data: {
        name: 'pingtest',
        description: 'This command is meant to test /ping. It will be deleted after completion.'
    }})
    client.api.applications(client.user.id).commands.post({data: {
        name: 'fat',
        description: "This is mean."
    }
    });
    client.api.applications(client.user.id).commands.post({data: {
        name: 'cheese',
        description: "What's my opinion on it?"
    }
    });
    client.api.applications(client.user.id).commands.post({data: {
        name: 'swear',
        description: "Do not use swear words with me!"
    }
    });
    client.api.applications(client.user.id).commands.post({data: {
        name: 'chip',
        description: "mmmmmm ruffles (Song: Creative Exercise, Mario Paint; Not VC-compatible yet!)"
    }
    });
    client.api.applications(client.user.id).commands.post({data: {
        name: 'say',
        description: "i will saying anything you said back to you (Not VC-compatible yet!)",
        options: [
            {
                name: 'message',
                description: 'The message I will say goes here!',
                required: true,
                type: 3
            }
        ]
    }
    });
    client.api.applications(client.user.id).commands.post({data: {
        name: 'join',
        description: "I'll join the VC you are in!"
    }
    });
    
    // client.api.applications(client.user.id).commands.get();
    // client.api.applications(client.user.id).commands('id').delete();

    client.ws.on('INTERACTION_CREATE', async(interaction) => {
        const command = interaction.data.name;
        const args = interaction.data.options;

        if(command === 'slash'){
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: 'Unfortunately, for me to have FULL slash commands, it requires a restructuring of my core code. That may happen eventually, but... not yet. Thank you for your patience!'
                }
            }});
        } else if(command === 'idiot'){
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: 'You too.'
                }
            }});
        } else if(command === 'danny'){
            let randomNumber = Math.random();
            let dannyContent = ""
            if(randomNumber >= 0.5){
                dannyContent = "my names danny bro\n\nThis was a reference to the hit film Cars 3 in which one of the cars is replaced with another car named Danny. Lightning McQueen approaches the car asking what is going on and calling him by a name that is not Danny. When Danny turns around, he says this line to Lightning McQueen: 'My name's Danny bro.'";
            } else {
                dannyContent = "https://cdn.discordapp.com/attachments/796757259316887582/808330533779931196/image0.jpg";
            }
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: dannyContent
                }
            }});
        } else if(command === 'fart'){
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: 'HAHAHBUHAIFIHAUIFHUAHAHAHAHHAHAHAHAHHAHAHAHHAA'
                }
            }});
        } else if(command === 'ping'){
            // let timeDifference = Math.abs(Date.now() - interaction.timestamp).toString()
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: "This command is being constructed!"
                }
            }});
        } else if(command === 'pingtest'){
            let timeDifference = "ERR";// = Math.abs(Date.now() - interaction.fetchReply.timestamp).toString();
            client.api.applications(client.user.id).guilds(guildID).commands.post({data: {
                type: 4,
                data: {
                    content: "*Bonk!* Wait, no, wrong sound effect... `" + timeDifference + "ms`!"
                }
            }});
        } else if(command === 'fat'){
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: 'hey that was really rude :('
                }
            }});
        } else if(command === 'cheese'){
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: 'My favorite! :D'
                }
            }});
        } else if(command === 'swear'){
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: 'no. more. saying. CUSS WORDS!!!'
                }
            }});
        } else if(command === 'credits'){
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 4,
            data: {
                content: 'Idiot Bot was created by 94 Central: <https://www.youtube.com/94Central>'
            }
        }});
        } else if(command === 'chip'){
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: 'https://cdn.discordapp.com/attachments/488412628029276180/838251865249677322/Consumir.-1.mp4'
                }
            }});
        } else if(command === 'say'){
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: args.find(arg => arg.name === "message").value
                }
            }});
        } else if(command === 'join'){
            let statusIn = "";
            // const authorUser = interaction.guild.members.cache.find(m => m.id === interaction.user.id);
            // const selfBot = interaction.guild.members.cache.find(m => m.id === client.user.id);
            // if(authorUser.voice.channel){
            //     if(!selfBot.voice.channel){
                    statusIn = "This command is under construction!"
            //     }
            // }
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    content: statusIn
                }
            }});
        }
        // if(cmd === "join" || cmd === "joinvc"){
        //     if(message.member.voice.channel){
        //         if(!selfBot.voice.channel){
        //             const voiceChannel = await message.member.voice.channel.join();
        //             message.channel.send("I have arrived in the voice channel.");
                    
        //         } else {
        //         message.channel.send("I AM ALREADY IN THE VOICE CHANNEL, YOU FRICKHEAD.");
        //         }
        //     } else {
        //         message.channel.send(">join is used to get me into a voice channel. To get me in one, you might want to try joining one first, you half brained mortal.")
        //     }
        // }
    });
});

// client.on('debug', console.log); // used to see shard status

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm') return;
    
    // if((message.content.includes("@everyone") || message.content.includes("@here")) && !message.member.permissions.has("MENTION_EVERYONE") || message.mentions.roles || message.content.length >= 1950){
    //     message.channel.send("Nice try there, that was hilarious!");
    // } else {
        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();

        if(cmd === 'idiot'){
            message.channel.send('You too.');
        }
        if(cmd === 'danny'){
            let randomNumber = Math.random();
            if(randomNumber >= 0.5){
                message.channel.send("my names danny bro");
            } else {
                message.channel.send("https://cdn.discordapp.com/attachments/796757259316887582/808330533779931196/image0.jpg");
            }
            message.channel.send('This was a reference to the hit film Cars 3 in which one of the cars is replaced with another car named Danny. Lightning McQueen approaches the car asking what is going on and calling him by a name that is not Danny. When Danny turns around, he says this line to Lightning McQueen: "My names Danny bro."');
        }
        if(cmd === 'fat'){
            message.channel.send("hey that was really rude :(");
        }
        if(cmd === 'cheese'){
            message.channel.send("My favorite! :D");
        }
        if(cmd === 'swear'){
            message.channel.send("no. more. saying. CUSS WORDS!!!");
        }
        if(cmd === 'creator' || cmd === 'credits'){
            message.channel.send("Idiot Bot was created by 94 Central: <https://www.youtube.com/94Central>");
        }
        if(cmd === 'invite'){
            message.channel.send("The Official Idiot Bot Invite Link: <https://discord.com/api/oauth2/authorize?client_id=771195366645039115&permissions=8&scope=bot%20applications.commands>");
        }
        if(cmd === '>'){
            message.channel.send(">>");
        }
        if(cmd === 'easteregg'){
            message.channel.send("There is no easter egg, go to sleep.");
        }
        if(cmd === 'snipe'){
            message.channel.send("bro you got the wrong bot for the job");
        }
        if(cmd === 'ok' || cmd === 'okay'){
            message.channel.send("ok");
        }
        if(cmd === 'version' || cmd === 'ver' || cmd === 'vers'){
            message.channel.send("Idiot Bot is on version **" + require('./package.json').version + "**!");
        }
        if(cmd === 'random' || cmd === 'randomnum' || cmd === 'randomnumber'){
            let numberSaidOne = parseInt(message.content.split(" ").slice(1).join(" "));
            let numberSaidTwo = parseInt(message.content.split(" ").slice(2).join(" "));
            if(message.content === ">random" || numberSaidOne.toString() == 'NaN' || numberSaidTwo.toString() == 'NaN'){
                message.channel.send(">random is for generating a random number between two numbers you give me. {>random <number> <number>}");
            } else {
                let mathRandom = (Math.round(Math.random() * (numberSaidTwo - numberSaidOne))+numberSaidOne).toString();
                message.channel.send("Your're random number are... **" + mathRandom + "**!");
            }
        }
        if(cmd === 'ping'){
            let timeDifference = Math.abs(Date.now() - message.createdTimestamp).toString()
            message.channel.send("*Bonk!* Wait, no, wrong sound effect... `" + timeDifference + "ms`!");
        }
        if(cmd === 'react'){
            if(message.content == ">react"){    // if plain >react is sent with no additional text
                message.channel.send("'>react {emote} {number}' is a command that reacts with an emote to the command. Make sure to leave out the :'s when typing the command! You have to put in a number to determine which message above you you want to react to.");
            } else {
                let numberMessage = parseInt(message.content.split(" ").slice(2).join(" "), 10)+1; //gets the message to react to from message, and converts it to a number

                const emojiList = message.guild.emojis.cache.map(e=>e.toString()).join(" "); // list of all emotes in server           
                let emoteCut = message.content.split(" ").slice(1).join(" ").replace(message.content.split(" ").slice(2).join(" "), ""); // gets the emote from the message
                const rctEmote = message.guild.client.emojis.cache.find(emoji => emoji.name === emoteCut.trim()); // finding emote in server emote list

                if(numberMessage !== 'NaN' && numberMessage < 20){ // checks if its a number, and if it is less than 20 messages ago
                    message.channel.messages.fetch({ limit: numberMessage}).then(messages => { // finds which message to react to
                        let messageReact = messages.last();
                        if(typeof(emojiList) != "undefined"){ // if emojiList var type is not undefined, react the emote!
                            messageReact.react(rctEmote);
                        } else { // if emote not recognized
                            message.channel.send("That emote's not in any servers i'm in, moron. (try removing the :'s if there are any.)");
                        }
                    })
                .catch(console.error);
                } else if(numberMessage > 20){ // checks if it is greater than 20
                    message.channel.send("Sorry fellow idiot, can't react to anything before 20 messages ago.");
                } else {
                    message.channel.send("Hey dumbo, you're supposed to put a number after the emote.");
                }
            }
        }
        if(cmd === 'membercount'){
            message.channel.send("**" + message.guild.name + "** is at **" + message.guild.memberCount + "** members!");
        }
        if(cmd === 'delete'){
            message.delete();
        }
        if(cmd === 'math'){
            const operation = message.content.split(" ").slice(2).join(" ");
            const numberOne = message.content.split(" ").slice(1).join(" ").split(" ")[0];
            const numberTwo = message.content.split(" ").slice(3).join(" ").split(" ")[0];
            if(message.content === ">math"){
                message.channel.send("This command is meant for math! Current operations are multiplication*, division/, addition+, subtraction-. Example: '>math 1 + 1'")
            } else if(operation.startsWith("x") || operation.startsWith("*") || operation.startsWith("m")){
                if(isNaN(numberOne) || isNaN(numberTwo) || numberOne === "" || numberTwo === ""){
                    message.channel.send("Try again, the parameters for multiplication are: '>math {number one} * {number two}'");
                } else {
                    message.channel.send("uhhhh i think it is `" + (parseFloat(numberOne)*parseFloat(numberTwo)) + "`?")
                }
            } else if(operation.startsWith("d") || operation.startsWith("/")){
                if(isNaN(numberOne) || isNaN(numberTwo) || numberOne === "" || numberTwo === ""){
                    message.channel.send("Try again, the parameters for division are: '>math {number one} / {number two}'");
                } else {
                    message.channel.send("uhhhh i think it is `" + (parseFloat(numberOne)/parseFloat(numberTwo)) + "`?")
                }
            } else if(operation.startsWith("a") || operation.startsWith("+")){
                if(isNaN(numberOne) || isNaN(numberTwo) || numberOne === "" || numberTwo === ""){
                    message.channel.send("Try again, the parameters for addition are: '>math {number one} + {number two}'");
                } else if(message.content === ">math 9 + 10" || message.content === ">math 10 + 9"){
                    message.channel.send("``21``? wait, i am stupid, it is ``19``!");
                } else {
                    message.channel.send("uhhhh i think it is `" + (parseFloat(numberOne)+parseFloat(numberTwo)) + "`?");
                }
            } else if(operation.startsWith("s") || operation.startsWith("-") || operation.startsWith("minus")){
                if(isNaN(numberOne) || isNaN(numberTwo) || numberOne === "" || numberTwo === ""){
                    message.channel.send("Try again, the parameters for subtraction are: '>math {number one} - {number two}'");
                } else {
                    message.channel.send("uhhhh i think it is `" + (parseFloat(numberOne)-parseFloat(numberTwo)) + "`?")
                }
            } else if(numberOne === "fart"){
                message.channel.send("did you have a brain fart");
            }
        }
        if(cmd === 'quote'){
            message.channel.messages.fetch({ limit: 2}).then(messages => {
                let lastMessage = messages.last();
                let lastPing;
                if(message.mentions.members.first() && message.content.split(" ").slice(1).join(" ").includes("@")){
                    lastPing = message.mentions.users.last();
                } else {
                    lastPing = "userNotSpecified";
                }
                if(!lastMessage.author.bot && !lastMessage.content.includes("@everyone") && !lastMessage.content.includes("@here") && lastMessage.mentions.roles.size === 0){
                    if(lastPing === "userNotSpecified"){
                        message.channel.send("> " + lastMessage.toString() + "\n<@" + lastMessage.author.id + ">");
                    } else {
                        message.channel.send("> " + lastMessage.toString() + "\n<@" + lastPing + ">");
                    }
                } else if(lastMessage.author.bot) {
                    message.channel.send("I won't quote a fellow bot, idiot.");
                } else if(!lastMessage.content.includes("@everyone") || !lastMessage.content.includes("@here") || lastMessage.mentions.roles.size > 0){
                    message.channel.send("Nice try there, that was hilarious!");
                }
            })
            .catch(console.error);
        }
        if(cmd === 'whos' || cmd === 'who' || cmd === "who's" || cmd === 'whois' || cmd === "mama"){
            message.channel.messages.fetch({ limit: 2}).then(messages => {
                let whosMessage = messages.last();
                if(!whosMessage.author.bot && !whosMessage.toString().includes("@everyone") && !whosMessage.toString().includes("@here") && whosMessage.mentions.roles.size === 0){
                    message.channel.send(whosMessage.toString() + " mama!");
                } else if(whosMessage.author.bot) {
                    message.channel.send("Can't mama a bot, idiot.");
                } else if(!whosMessage.content.includes("@everyone") || !whosMessage.content.includes("@here") || whosMessage.mentions.roles.size > 0){
                    message.channel.send("Nice try there, that was hilarious!");
                } else if(whosMessage.toString().length >= 1900){
                    message.channel.send("woah there i cant take that dadd-")
                }
            })
            .catch(console.error);
        }
        if(cmd === 'john' || cmd === 'jon' || cmd === "johnothan" || cmd === 'johnathan' || cmd === "haha" || cmd === 'jonathan' || cmd === 'jonothan'){
            message.channel.messages.fetch({ limit: 2}).then(messages => {
                let johnMessage = messages.last();
                if(!johnMessage.author.bot && !johnMessage.toString().includes("@everyone") && !johnMessage.toString().includes("@here") && johnMessage.mentions.roles.size === 0){
                    message.channel.send("HAHA Jonathan, you are " + johnMessage.toString() + "!");
                } else if(johnMessage.author.bot) {
                    message.channel.send("Can't Jonathan a bot, idiot.");
                } else if(!johnMessage.content.includes("@everyone") || !johnMessage.content.includes("@here") || johnMessage.mentions.roles.size > 0){
                    message.channel.send("Nice try there, that was hilarious!");
                } else if(johnMessage.content.toString().length >= 1900){
                    message.channel.send("woah there i cant take that dadd-")
                }
            })
            .catch(console.error);
        }
        if(cmd === 'restart' || cmd === 'refresh'){
            process.exit(1);
        }
        if(cmd === 'help'){
            const helpMessage = new Discord.MessageEmbed()
                .setColor('#009DFF')
                .setTitle('Prefix: >')
                .addFields(
                    { name: 'Basic Commands:', value: '>idiot/\n>danny/\n>fat/\n>cheese/\n>swear/\n>>\n>ok\n>version\n>invite\n\n\n*a / behind a command means it is also compatible as a slash command.', inline: true},
                    { name: 'Miscellaneous Commands:', value: '>say\n>react\n>whos\n>quote\n>delete\n>membercount\n>random\n>math\n>ping\n>meme\n>meme2\n>pfp\n>rps', inline: true},
                    { name: 'Voice Commands:', value: '>join\n>leave\n>voicemembercount\n>rickroll\n>fart/\n>avocado\n>chip/\n>say', inline: true},
                    { name: 'Support Server:', value: '<https://discord.gg/4kwx3ezpNW>'},
                    { name: 'Creator:', value: 'Idiot Bot was created by 94 Central, <https://www.youtube.com/94Central>.'}
                )
            message.channel.send(helpMessage);
        }
    // }
});
client.on('message', async message =>{
    if(!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm') return;
    
    if((message.content.includes("@everyone") || message.content.includes("@here")) && !message.member.permissions.has("MENTION_EVERYONE") || message.mentions.roles.size > 0 || message.content.length >= 1950){
        message.channel.send("Nice try there, that was hilarious!");
    } else {
        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();
        let selfBot = message.guild.members.cache.get("771195366645039115");
        function playSongFile(pathToFile){
            if(message.member.voice.channel && selfBot.voice.channel){
                if(message.member.voice.channel.id === selfBot.voice.channel.id){
                    message.member.voice.channel.join().then(connection =>{
                        const dispatcher = connection.play(pathToFile);
                    });
                }
            }
        }
        if(cmd === "reply"){
            if(message.content == ">reply"){
                message.lineReply("no.");
            } else {
                let numberMessageUp = message.content.split(" ").slice(1).join(" ");
                if(numberMessageUp !== 'NaN' && numberMessageUp < 20){ // checks if its a number, and if it is less than 20 messages ago
                    message.channel.messages.fetch({ limit: parseInt(numberMessageUp)+1}).then(messages => {
                        let messagesUp = messages.last();
                        if(!messagesUp.author.bot){
                            messagesUp.lineReply("no.");
                        } else {
                            message.channel.send("nope, cant reply to a bot.");
                        }
                    })
                .catch(console.log);
                } else if(numberMessageUp > 20){ // checks if it is greater than 20
                    message.channel.send("Sorry fellow idiot, can't reply to anything before 20 messages ago.");
                } else {
                    message.channel.send("bro just use NUMBERS");
                }
            }
        }
        if(cmd === "join" || cmd === "joinvc"){
            if(message.member.voice.channel){
                if(!selfBot.voice.channel){
                    const voiceChannel = await message.member.voice.channel.join();
                    message.channel.send("I have arrived in the voice channel.");
                    
                } else {
                message.channel.send("I AM ALREADY IN THE VOICE CHANNEL, YOU FRICKHEAD.");
                }
            } else {
                message.channel.send(">join is used to get me into a voice channel. To get me in one, you might want to try joining one first, you half brained mortal.")
            }
        }
        if(cmd === "leave" || cmd === "leavevc"){
            if(message.member.voice.channel){
                if(selfBot.voice.channel){
                    message.guild.me.voice.channel.leave();
                    message.channel.send("I have left the voice channel...");
                } else {
                message.channel.send("I AM NOT IN A VOICE CHANNEL, YOU FRICKHEAD");
                }
            } else {
                message.channel.send(">leave is used to get out of a voice channel. To get me out of one, you might want to try joining one first, you half brained mortal.")
            }
        }
        if(cmd === "voicemember" || cmd === "voicemembercount" || cmd === "vcmembercount"){
            if(selfBot.voice.channel){
                if(selfBot.voice.channel.members.size > 0){
                    message.channel.send("There are **" + selfBot.voice.channel.members.size + "** members in the voice chat right now!");
                }
            } else {
                message.channel.send("Sorry loser, only going to tell you about voice channels I'm in right now.");
            }
        }
        if(cmd === 'rickroll' || cmd === 'rickrol'){
            message.channel.send("<https://www.youtube.com/watch?v=dQw4w9WgXcQ>");
            playSongFile('./audio/rickroll.mp3');
        }
        if(cmd === 'fart'){
            message.channel.send("HAHAHBUHAIFIHAUIFHUAHAHAHAHHAHAHAHAHHAHAHAHHAA");
            playSongFile('./audio/fart.mp3');
        }
        if(cmd === 'avocado' || cmd === 'avacado' || cmd === 'avocados' || cmd === 'avacados'){
            message.channel.send("Avocados :avocado: from mexico :flag_mx:");
            playSongFile('./audio/avocado.mp3');
        }
        if(cmd === 'chip'){
            message.channel.send("https://cdn.discordapp.com/attachments/488412628029276180/838251865249677322/Consumir.-1.mp4");
            playSongFile('./audio/chip.mp3');
        }
        // if(cmd === 'play'){
        //     message.channel.send("Alright sure, playing whatever the hell you sent.");
        //     if(message.member.voice.channel && selfBot.voice.channel){
        //         message.member.voice.channel.join().then(connection, url =>{
        //             let stream = ytdl(url, {
        //                 filter: "audioonly"
        //             });
        //             const dispatcher = connection.play(stream, {
        //                 type: "opus"
        //             });
        //         });
        //     } else {
        //         message.channel.send("Gotta add me to whatever voice channel you're in first!");
        //     }
        // }
        if(cmd === 'rps'){
            let userMentioned = message.mentions.members.first();
            let whatPicked = "";
            let whatPickedOpponent = "";

            function checkWinner(challengeMessage){
                setTimeout(() => {
                    if(whatPicked === "r" && whatPickedOpponent === "r"){ //rock 1, rock 2
                        challengeMessage.edit(`<@${message.author.id}> picked rock!\n<@${userMentioned.id}> picked rock!\n\nThe game ends in a tie!`);
                    } else if(whatPicked === "r" && whatPickedOpponent === "p"){ //rock 1, paper 2
                        challengeMessage.edit(`<@${message.author.id}> picked rock!\n<@${userMentioned.id}> picked paper!\n\n<@${userMentioned.id}> wins!`);

                    } else if(whatPicked === "r" && whatPickedOpponent === "s"){ //rock 1, scissor 2
                        challengeMessage.edit(`<@${message.author.id}> picked rock!\n<@${userMentioned.id}> picked scissors!\n\n<@${message.author.id}> wins!`);

                    } else if(whatPicked === "p" && whatPickedOpponent === "p"){ // paper 1, paper 2
                        challengeMessage.edit(`<@${message.author.id}> picked paper!\n<@${userMentioned.id}> picked paper!\n\nThe game ends in a tie!`);

                    } else if(whatPicked === "p" && whatPickedOpponent === "r"){ // paper 1, rock 2
                        challengeMessage.edit(`<@${message.author.id}> picked paper!\n<@${userMentioned.id}> picked rock!\n\n<@${message.author.id}> wins!`);

                    } else if(whatPicked === "p" && whatPickedOpponent === "s"){ // paper 1, scissor 2
                        challengeMessage.edit(`<@${message.author.id}> picked paper!\n<@${userMentioned.id}> picked scissors!\n\n<@${userMentioned.id}> wins!`);

                    } else if(whatPicked === "s" && whatPickedOpponent === "s"){ // scissor 1, scissor 2
                        challengeMessage.edit(`<@${message.author.id}> picked scissors!\n<@${userMentioned.id}> picked scissors!\n\nThe game ends in a tie!`);

                    } else if(whatPicked === "s" && whatPickedOpponent === "r"){ // scissor 1, rock 2
                        challengeMessage.edit(`<@${message.author.id}> picked scissors!\n<@${userMentioned.id}> picked rock!\n\n<@${userMentioned.id}> wins!`);

                    } else if(whatPicked === "s" && whatPickedOpponent === "p"){ // scissor 1, paper 2
                        challengeMessage.edit(`<@${message.author.id}> picked scissors!\n<@${userMentioned.id}> picked paper!\n\n<@${message.author.id}> wins!`);

                    }
                }, 10010);
            }

            if(userMentioned && userMentioned.user.bot && userMentioned.id !== '771195366645039115'){
                message.channel.send("You can't challenge a bot to RPS...");
            } else if(userMentioned && userMentioned.id === '771195366645039115'){
                let valueChallenge = "Please react with either rock :rock:, paper :newspaper:, or scissors :scissors: to decide your move."
                let rpsMessageBot = await message.channel.send("Challenge loading...");
                rpsMessageBot.edit("RPS? With ME?! Challenge accepted!!!");
                (await rpsMessageBot).react('🪨'); //rock
                (await rpsMessageBot).react('📰'); //paper
                (await rpsMessageBot).react('✂️'); //scissors
                const filter = (reaction, user) => {
                    return ['🪨', '📰', '✂️'].includes(reaction.emoji.name) && user.id !== '771195366645039115' && user.id === message.author.id;
                };
                (await rpsMessageBot).awaitReactions(filter, {max: 1, time: 10000, errors: ['time']}).then(collected => {
                    const reaction = collected.first();
                    if(reaction.emoji.name === '🪨'){ //rock
                        message.channel.send("You chose rock!");
                        whatPicked = "r";
                    } else if(reaction.emoji.name === '📰'){ //paper
                        message.channel.send("You chose paper!");
                        whatPicked = "p";
                    } else if(reaction.emoji.name === '✂️'){ //scissors
                        message.channel.send("You chose scissors!");
                        whatPicked = "s";
                    }
                }).catch(collected => {
                    rpsMessageBot.edit("<@" + message.author.id + "> waited too long to react.");
                });
                
                let randomRPS = Math.floor(Math.random() * 3);
                switch(randomRPS){
                case 0:
                    whatPickedOpponent = "r"
                    break;
                case 1:
                    whatPickedOpponent = "p"
                    break;
                case 2:
                    whatPickedOpponent = "s"
                    break;
                }
                checkWinner(rpsMessageBot);
            } else if(userMentioned){
                const resultMessage = await message.channel.send("Challenge sent!");

                const rpsMessage = await message.author.send("Hello! Please react with either rock :rock:, paper :newspaper:, or scissors :scissors: to decide your move.");
                (await rpsMessage).react('🪨'); //rock
                (await rpsMessage).react('📰'); //paper
                (await rpsMessage).react('✂️'); //scissors
                const rpsMessageOpponent = await userMentioned.send("Hello! <@" + message.author.id + "> has challenged you to RPS! Please react with either rock :rock:, paper :newspaper:, or scissors :scissors: to decide your move.");
                (await rpsMessageOpponent).react('🪨'); //rock
                (await rpsMessageOpponent).react('📰'); //paper
                (await rpsMessageOpponent).react('✂️'); //scissors

                let isReacted;
                let isReactedOpponent;

                const filter = (reaction, user) => {
                    return ['🪨', '📰', '✂️'].includes(reaction.emoji.name) && user.id !== '771195366645039115';
                };
                (await rpsMessage).awaitReactions(filter, {max: 1, time: 10000, errors: ['time']}).then(collected => {
                    const reaction = collected.first();
                    if(reaction.emoji.name === '🪨'){ //rock
                        message.author.send("You reacted with rock!");
                        whatPicked = "r";
                    } else if(reaction.emoji.name === '📰'){ //paper
                        message.author.send("You reacted with paper!");
                        whatPicked = "p";
                    } else if(reaction.emoji.name === '✂️'){ //scissors
                        message.author.send("You reacted with scissors!");
                        whatPicked = "s";
                    }
                    isReacted = true;
                }).catch(collected => {
                    isReacted = false;
                    if(isReactedOpponent === false){
                        resultMessage.edit("<@" + message.author.id + "> waited too long to react.\n<@" + userMentioned.id + "> waited too long to react.");
                    } else {
                        resultMessage.edit("<@" + message.author.id + "> waited too long to react.");
                        rpsMessage.edit("This challenge has expired...");
                    }
                    rpsMessageOpponent.edit("This challenge has expired...");
                });
                (await rpsMessageOpponent).awaitReactions(filter, {max: 1, time: 10000, errors: ['time']}).then(collected => {
                    const reaction = collected.first();
                    if(reaction.emoji.name === '🪨'){ //rock
                        whatPickedOpponent = "r";
                        userMentioned.send("You reacted with rock!");
                    } else if(reaction.emoji.name === '📰'){ //paper
                        whatPickedOpponent = "p";
                        userMentioned.send("You reacted with paper!");
                    } else if(reaction.emoji.name === '✂️'){ //scissors 
                        whatPickedOpponent = "s";
                        userMentioned.send("You reacted with scissors!");
                    }
                    isReactedOpponent = true;

                }).catch(collected => {
                    isReactedOpponent = false;
                    if(isReacted === false){
                        resultMessage.edit("<@" + userMentioned.id + "> waited too long to react.\n<@" + message.author.id + "> waited too long to react.");
                    } else {
                        resultMessage.edit("<@" + userMentioned.id + "> waited too long to react.");
                        rpsMessageOpponent.edit("This challenge has expired...");
                    }
                    rpsMessage.edit("This challenge has expired...");
                });
                
                checkWinner(resultMessage);
            } else {
            message.channel.send("Hello! This is rock paper scissors! To start playing, use '>rps {user}'.\n\nMention a user in the {user} spot, and you'll get a dm.\n\nMake sure both you and your opponent have dms enabled! I need to be able to direct message you in order to play!\n\nReact to the dm to select your move, and wait for your opponent to react back.\n\nThere is a 10 second countdown from when the request is sent, and for the game to fully end.\n\nOf course... you could always challenge... me!\n\nHave fun!");
            }
        }
        if(cmd === "pfp" || cmd.startsWith("profile")){
            if(!message.mentions.members.first()){
                if(message.member.user.displayAvatarURL({ dynamic: true }).endsWith(".webp")){
                    message.channel.send("Here's your profile picture! " + message.member.user.displayAvatarURL({ format: 'png' }));
                } else {
                    message.channel.send("Here's your profile picture! " + message.member.user.displayAvatarURL({ dynamic: true }));
                }
            } else {
                if(message.mentions.members.first().user.displayAvatarURL({ dynamic: true }).endsWith(".webp")){
                    message.channel.send(`Here's <@${message.mentions.members.first().id}>'s profile picture! ${message.mentions.members.first().user.displayAvatarURL({ format: 'png' })}`);
                } else {
                    message.channel.send(`Here's <@${message.mentions.members.first().id}>'s profile picture! ${message.mentions.members.first().user.displayAvatarURL({ dynamic: true })}`);
                }
            }
        }
        if(cmd === "meme" || cmd === "image"){
            let registeredText = message.content.split(" ").slice(1).join(" ");
            if(registeredText.length > 0){
                Canvas.registerFont('./times.ttf', { family: 'Times New Roman'});
                const canvas = Canvas.createCanvas(700, 510);
                const context = canvas.getContext('2d');

                const background = await Canvas.loadImage('./background.jpg');
                context.drawImage(background, 0, 0, canvas.width, canvas.height);
                
                let image;
                if(!message.mentions.members.first() && message.attachments.size === 0){
                    image = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'png' }));
                } else if(message.mentions.members.first() && message.attachments.size === 0) {
                    registeredText = message.content.split(" ").slice(2).join(" ");
                    image = await Canvas.loadImage(message.mentions.members.first().user.displayAvatarURL({ format: 'png' }));
                } else if(message.attachments.size > 0){
                    let attatchmentMessage = message.attachments.first().url
                    if(attatchmentMessage.endsWith(".png") || attatchmentMessage.endsWith(".jpg") || attatchmentMessage.endsWith(".gif") || attatchmentMessage.endsWith(".webp")){
                        image = await Canvas.loadImage(message.attachments.first().url);
                    } else {
                        if(!message.mentions.members.first()){
                            image = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'png' }));
                        } else if(message.mentions.members.first()) {
                            registeredText = message.content.split(" ").slice(2).join(" ");
                            image = await Canvas.loadImage(message.mentions.members.first().user.displayAvatarURL({ format: 'png' }));
                        }
                    }
                }
                context.drawImage(image, 100, 45, 500, 300);

                context.strokeStyle = '#ffffff';
                context.strokeRect(85, 30, 530, 330);

                let textOne = registeredText;
                let textTwo = " ";
                if(registeredText.includes("|")){
                    textOne = registeredText.split("|")[0];
                    textTwo = registeredText.split("|")[1];
                }
                context.font = '30px "Times New Roman"';
                context.fillStyle = '#ffffff';
                context.textAlign = 'center';
                context.fillText(textTwo, canvas.width / 2.05, canvas.height / 1.05);
                
                context.font = '55px "Times New Roman"';
                context.fillText(textOne, canvas.width / 2, canvas.height / 1.2);
                context.textAlign = 'center';

                const attatchment = new Discord.MessageAttachment(canvas.toBuffer(), 'memeohp.jpg');
                message.channel.send(attatchment);
            } else {
                message.channel.send("'>meme' is used to generate a meme! You can also optionally attatch an image to the message! You can include a | somewhere in there to include bottom text.\n\nExample: '>meme ohp | ohp' or, you can ping someone, '>meme @user ohp | ohp' like that!\n\nEnjoy the command!");
            }
        }
        if(cmd === "meme2" || cmd === "image2"){
            let registeredText = message.content.split(" ").slice(1).join(" ");
            if(registeredText.length > 0){
                Canvas.registerFont("/Windows/Fonts/impact.ttf", { family: 'Times New Roman'});
                const canvas = Canvas.createCanvas(1000, 800);
                const context = canvas.getContext('2d');
                
                let image;
                if(!message.mentions.members.first() && message.attachments.size === 0){
                    image = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'png' }));
                } else if(message.mentions.members.first() && message.attachments.size === 0) {
                    registeredText = message.content.split(" ").slice(2).join(" ");
                    image = await Canvas.loadImage(message.mentions.members.first().user.displayAvatarURL({ format: 'png' }));
                } else if(message.attachments.size > 0){
                    let attatchmentMessage = message.attachments.first().url
                    if(attatchmentMessage.endsWith(".png") || attatchmentMessage.endsWith(".jpg") || attatchmentMessage.endsWith(".gif") || attatchmentMessage.endsWith(".webp")){
                        image = await Canvas.loadImage(message.attachments.first().url);
                    } else {
                        if(!message.mentions.members.first()){
                            image = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'png' }));
                        } else if(message.mentions.members.first()) {
                            registeredText = message.content.split(" ").slice(2).join(" ");
                            image = await Canvas.loadImage(message.mentions.members.first().user.displayAvatarURL({ format: 'png' }));
                        }
                    }
                }
                context.drawImage(image, 0, 0, canvas.width, canvas.height);

                let topText = registeredText; //get the top text if there is no |
                let bottomText = " "; //leave it empty for the sake of text generation in order and position
                if(registeredText.includes("|")){
                    topText = registeredText.split("|")[0]; // get before |
                    bottomText = registeredText.split("|")[1]; // get after |
                }
                context.font = '80px "Impact"';
                context.fillStyle = '#ffffff';
                context.textAlign = 'center';
                context.fillText(topText, canvas.width / 2, canvas.height / 7);
                context.fillText(bottomText, canvas.width / 2, canvas.height / 1.05);
                
                context.lineWidth = 3.3;
                context.strokeStyle = '#000000';
                context.strokeText(topText, canvas.width / 2, canvas.height / 7);
                context.strokeText(bottomText, canvas.width / 2, canvas.height / 1.05);
                
                const attatchment = new Discord.MessageAttachment(canvas.toBuffer(), 'meme2ohp.jpg');
                message.channel.send(attatchment);
            } else {
                message.channel.send("'>meme2' is used to generate a meme! You can also optionally attatch an image to the message! You can include a | somewhere in there to include bottom text.\n\nExample: '>meme2 ohp | ohp' or, you can ping someone, '>meme2 @user ohp | ohp' like that!\n\nEnjoy the command!");
            }
        }
        function sayCommand(){
            const whatSaid = message.content.split(" ").slice(1).join(" ");
            if(message.content == ">say"){
                message.channel.send(">say is for repeating what you say to me back to you. Additionally, the message I send will be repeated in voice chat, if both of us are in the same one!")// If you react to one of my >say messages, I'll dm you the person who requested the command.");
            } else {
                message.channel.send(whatSaid);
                if(message.channel.type !== 'dm'){
                    if(message.member.voice.channel && selfBot.voice.channel){
                        if(message.member.voice.channel.id === selfBot.voice.channel.id && whatSaid.length < 200){
                            if (!fileService.existsSync('./cache')){
                                fileService.mkdirSync('./cache');
                            }
                            const timestamp = new Date().getTime();
                            const soundPath = `./cache/${timestamp}.wav`;
                            tts.export(whatSaid, null, 1, soundPath, (err) => {
                                message.member.voice.channel.join().then(connection =>{
                                    const dispatcher = connection.play(soundPath);
                                    dispatcher.on('error', (err) => {
                                        console.error(err);
                                    }).on('finish', () => {
                                        fileService.unlinkSync(soundPath);
                                    });
                                }).catch((err) => {
                                    console.error(err);
                                });
                            });
                        } else if(whatSaid.length >= 1500){
                            message.channel.send("Sorry! You're message was too long for voice chat...");
                        }
                    }
                }
                // let authorSay = " ";
                // authorSay = message.author.tag;
                // client.on("messageReactionAdd", (reaction, user) => {
                //     user.send("The author of the >say message you requested is **" + authorSay + "**!");
                // });
            }
        }
        if(cmd === 'say'){
            sayCommand();
        }
        if(cmd === 'saydelete'){
            sayCommand();
            message.delete();
        }
        // if(selfBot.voice.channel){
        //     if(selfBot.voice.channel.members.size === 1){ 
        //         setInterval(function(){
        //             message.guild.me.voice.channel.leave(); //if no one is in the voice chat, leave.
        //         }, 300000); //5 minutes
        //     }
        // }
        if(cmd === 'poopy'){
            const editedMessage = await message.channel.send("https://media.discordapp.net/attachments/739702645454929992/785977747151257640/iseepoopy-1.gif");
            setTimeout(() => {
                editedMessage.edit("eh, no... not anymore!");
            }, 3000);
        }
    }
});

client.login('NzcxMTk1MzY2NjQ1MDM5MTE1.X5olpw.NLSg5aTOKVPosGCyWDIY9uIwD64');