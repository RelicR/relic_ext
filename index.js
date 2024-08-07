function randDiap(min, max)
{
	return Math.floor(Math.random() * (max - min) + min);
}
const fs = require('node:fs');
const path = require('node:path');
const url = require('node:url');
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = process.env.DISCORD_TOKEN;
const { fileURLToPath } = require('node:url');

const msgMention = /<@\d+>/
const hidPing = "  ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ _ "

const gifs = {
	"трахать": [
		"https://imgur.com/ngpaTME.gif",
		"https://imgur.com/12LLWFo.gif",
		"https://imgur.com/su8DHqr.gif",
		"https://imgur.com/ZbRoiJB.gif",
		"https://imgur.com/Ij6zF1D.gif",
		"https://imgur.com/nc3kibC.gif",
		"https://imgur.com/Hy7RZFX.gif",
		"https://imgur.com/A5LOdPE.gif",
		"https://imgur.com/xlSb1n8.gif",
	],
	"трусики": [
		"https://imgur.com/dNH14HD.gif",
		"https://imgur.com/tSVEQDC.gif",
		"https://imgur.com/ZPr54uQ.gif",
		"https://imgur.com/vG6NPGq.gif",
		"https://imgur.com/veUWKqX.gif",
		"https://imgur.com/0zNnBKR.gif",
	],
	"лапать": [
		"https://imgur.com/oFxDIRm.gif",
		"https://imgur.com/WvtMQCd.gif",
		"https://imgur.com/4kdjRb6.gif",
		"https://imgur.com/FAeUyNj.gif",
		"https://imgur.com/gOsgjBc.gif",
		"https://imgur.com/82e5t6w.gif",
		"https://imgur.com/flvcvPz.gif",
		"https://imgur.com/mdW8VGO.gif",
		"https://imgur.com/5lcxAu3.gif",
	],
	"гладить": [
		'https://i.imgur.com/2GC0cIo.gif',
		'https://i.imgur.com/pcFeXYO.gif',
		'https://i.imgur.com/8Zy0HnJ.gif',
		'https://i.imgur.com/nAijrX6.gif',
		'https://i.imgur.com/BS9jHBi.gif',
		'https://i.imgur.com/Y2PuVkX.gif',
		"https://media1.tenor.com/m/V1Txxwwe0d8AAAAC/anime-head-pat-anime.gif"
	],
	"тык": [
		"https://imgur.com/gbZ0gRE.gif",
		"https://media1.tenor.com/m/8m9W6274Q2IAAAAC/chubs-cute.gif",
		"https://media1.tenor.com/m/U6qa9KfWsHoAAAAC/poke-stop.gif",
		"https://media1.tenor.com/m/6rS1x-dVUwEAAAAC/ishtar-ishtar-fgo.gif",
		"https://media1.tenor.com/m/DDbTTf6yoQYAAAAC/boop-cute.gif",
		"https://media1.tenor.com/m/XSkxT2nVgbAAAAAC/cat-nose.gif",
		"https://media1.tenor.com/m/ncx61LPfp2UAAAAC/chub-chubs.gif",
		"https://imgur.com/3RZiHHB.gif",
		"https://media1.tenor.com/m/_vVL5fuzj4cAAAAC/nagi-no.gif",
	],
	"тык": [
		"https://imgur.com/gbZ0gRE.gif",
		"https://media1.tenor.com/m/8m9W6274Q2IAAAAC/chubs-cute.gif",
		"https://media1.tenor.com/m/U6qa9KfWsHoAAAAC/poke-stop.gif",
		"https://media1.tenor.com/m/6rS1x-dVUwEAAAAC/ishtar-ishtar-fgo.gif",
		"https://media1.tenor.com/m/DDbTTf6yoQYAAAAC/boop-cute.gif",
		"https://media1.tenor.com/m/XSkxT2nVgbAAAAAC/cat-nose.gif",
		"https://media1.tenor.com/m/ncx61LPfp2UAAAAC/chub-chubs.gif",
		"https://imgur.com/3RZiHHB.gif",
		"https://media1.tenor.com/m/_vVL5fuzj4cAAAAC/nagi-no.gif",
	],
	"щёчка": [
		'https://i.imgur.com/YQrdV3N.gif',
		'https://i.imgur.com/Q5fPHNZ.gif',
		'https://i.imgur.com/6V4Zzvg.gif',
		'https://i.imgur.com/wqsWQ4s.gif',
		'https://i.imgur.com/SHyWkdl.gif',
		'https://i.imgur.com/tYsnEXS.gif',
		'https://i.imgur.com/Lbdgy6a.gif',
		'https://i.imgur.com/CRwZWff.gif',
		'https://i.imgur.com/CQr7Uic.gif',
		'https://i.imgur.com/CmSeeG0.gif',
		'https://i.imgur.com/V5xsmDq.gif',
		'https://i.imgur.com/v3LhVDz.gif',
		'https://i.imgur.com/5XeP7Qk.gif',
		'https://i.imgur.com/f1pX045.gif',
		'https://i.imgur.com/GxgMqit.gif',
		'https://i.imgur.com/X0Z3CcY.gif',
		'https://i.imgur.com/rzG6ZqR.gif',
		'https://i.imgur.com/90QOalc.gif',
		'https://i.imgur.com/mOYu81U.gif',
		'https://i.imgur.com/F4RRaJ3.gif',
		'https://i.imgur.com/7pzwfFU.gif',
		'https://i.imgur.com/maG169E.gif',
		'https://i.imgur.com/fLypNoY.gif',
		'https://i.imgur.com/K5pZ9m2.gif',
		'https://i.imgur.com/Ds69zma.gif',
		'https://i.imgur.com/VoamtAn.gif'
	],
	"щечка": [
		'https://i.imgur.com/YQrdV3N.gif',
		'https://i.imgur.com/Q5fPHNZ.gif',
		'https://i.imgur.com/6V4Zzvg.gif',
		'https://i.imgur.com/wqsWQ4s.gif',
		'https://i.imgur.com/SHyWkdl.gif',
		'https://i.imgur.com/tYsnEXS.gif',
		'https://i.imgur.com/Lbdgy6a.gif',
		'https://i.imgur.com/CRwZWff.gif',
		'https://i.imgur.com/CQr7Uic.gif',
		'https://i.imgur.com/CmSeeG0.gif',
		'https://i.imgur.com/V5xsmDq.gif',
		'https://i.imgur.com/v3LhVDz.gif',
		'https://i.imgur.com/5XeP7Qk.gif',
		'https://i.imgur.com/f1pX045.gif',
		'https://i.imgur.com/GxgMqit.gif',
		'https://i.imgur.com/X0Z3CcY.gif',
		'https://i.imgur.com/rzG6ZqR.gif',
		'https://i.imgur.com/90QOalc.gif',
		'https://i.imgur.com/mOYu81U.gif',
		'https://i.imgur.com/F4RRaJ3.gif',
		'https://i.imgur.com/7pzwfFU.gif',
		'https://i.imgur.com/maG169E.gif',
		'https://i.imgur.com/fLypNoY.gif',
		'https://i.imgur.com/K5pZ9m2.gif',
		'https://i.imgur.com/Ds69zma.gif',
		'https://i.imgur.com/VoamtAn.gif'
	],
	"kiss": [
		'https://i.imgur.com/YbBa4GE.gif',
		'https://i.imgur.com/Osngx3u.gif',
		'https://i.imgur.com/aJVXn7B.gif',
		'https://i.imgur.com/cwy4gs3.gif',
		'https://i.imgur.com/9t5Mccr.gif',
		'https://i.imgur.com/gZamymu.gif',
		'https://i.imgur.com/UGMJgTZ.gif',
		'https://i.imgur.com/2mlcDBh.gif',
		'https://i.imgur.com/DGcNa8I.gif',
		'https://i.imgur.com/Wx8mEez.gif',
		'https://i.imgur.com/sdwEn9g.gif',
		'https://i.imgur.com/8gL0J46.gif',
		'https://i.imgur.com/pEcx5ht.gif',
		'https://i.imgur.com/9tLv15X.gif',
		'https://i.imgur.com/2wmVTOx.gif',
		'https://i.imgur.com/XbyDv8X.gif',
		'https://i.imgur.com/Q24QYb6.gif',
		'https://i.imgur.com/WQ194f9.gif',
		'https://i.imgur.com/sRgxR1L.gif',
		'https://i.imgur.com/DWFoZ95.gif',
		'https://i.imgur.com/flWPBXi.gif',
		'https://i.imgur.com/4SFQJgo.gif',
		'https://i.imgur.com/ru9vhdi.gif',
		'https://i.imgur.com/OGXKegq.gif',
		'https://i.imgur.com/MqeA56v.gif',
		'https://i.imgur.com/rsxJ5du.gif',
		'https://i.imgur.com/xfgpCbr.gif',
		'https://i.imgur.com/TmHKOvP.gif',
		'https://i.imgur.com/svxhjNy.gif',
		'https://i.imgur.com/VdDn2gz.gif',
		'https://i.imgur.com/8QZYhXO.gif',
		'https://i.imgur.com/qKOixBu.gif',
		'https://i.imgur.com/mVvKhAu.gif',
		'https://i.imgur.com/cmJkGkq.gif',
		'https://i.imgur.com/mq6pPvx.gif',
		'https://i.imgur.com/K8r41Cw.gif',
		'https://i.imgur.com/gTcZUg9.gif',
		'https://i.imgur.com/XX7yp3i.gif',
		'https://i.imgur.com/edpaCsY.gif',
		'https://i.imgur.com/q2Gx7u7.gif',
		'https://i.imgur.com/dCcrjqS.gif',
		'https://i.imgur.com/QbW9tfB.gif',
		'https://i.imgur.com/b4QuQ7c.gif',
		'https://i.imgur.com/vpUUzSY.gif',
	],
	"other": ["https://media1.tenor.com/m/E-u6yuhVldsAAAAC/fireflysegsalarm-star-rail.gif"],
	"спунч": ["https://media1.tenor.com/m/i3oxc1HaCpMAAAAC/omnom-cut-the-rope.gif"],
	"лизочка": [
		"https://imgur.com/KhapG4q.gif"
	],
	"софа": ["https://imgur.com/XZBFbG2.gif"],
	"хахатунчик": [
		"https://media1.tenor.com/m/ac_WexNYzXIAAAAC/burnout-mercedes-benz.gif",
		"https://media1.tenor.com/m/wxlgthKz_gYAAAAC/amg-cls-63-night-drive-amg.gif",
	],
	"кощк": ["https://media1.tenor.com/m/kqIsWZcSeDUAAAAC/everyone-cute.gif"],
	"хехобара": ["https://imgur.com/ZHkoo3R.gif"],
	"сырник": [
		"https://media1.tenor.com/m/qi8MqDKmpl8AAAAC/lycoris-recoil-chisato.gif",
		"https://media.tenor.com/RVU4H9rRmpcAAAAC/kubo-nagisa-anime.gif",
		"https://media1.tenor.com/m/gIbE9pZ7raYAAAAC/wataten-watashi-ni-tenshi-ga-maiorita.gif",
		"https://media1.tenor.com/m/xS09IqCS1e0AAAAC/anime-anime-boy.gif",
		"https://media1.tenor.com/m/stQ5fJpT4FsAAAAC/luck-and-logic-anime-girl.gif",
		"https://imgur.com/5981ogp.gif",
		"https://imgur.com/2T29jAb.gif",
		"https://media1.tenor.com/m/d9cJHr3KukMAAAAC/cat-kittie.gif",
		"https://media1.tenor.com/m/ElNeJpOxlbwAAAAC/cat-cute.gif",
		"https://media1.tenor.com/m/QY_-xKLfDkMAAAAC/munchies.gif",
	]
}

const phrases = {
	"трахать": " решил пошалить с ",
	"трусики": " показывает непотребства для ",
	"лапать": " тянет лапки к ",
	"гладить": " гладит ",
	"тык": " тычет в ",
	"тыкнуть": " тычет палкой в ",
	"щёчка": " целует в щёчку ",
	"щечка": " целует в щёчку ",
	"kiss": " слюнявит ",
	"сырник": " кормит сырным продуктом ",
}
const otherPhrases = {
	"релик": " вызывает сучего <@767304954880720916>",
	"опостал": " вызывает спортика <@755654273173291008>",
	"папуг": " вызывает пернатого <@293031501514276864>",
	"спунч": " вызывает <:spunch:1162380652826599534> <@561514969716359169>",
	"лизочка": " вызывает мефчика <@1023724564330578013>",
	"софа": " вызывает софочку <@1060999684300210266>",
	"хахатунчик": " вызывает бизнес-класс <@665105418824974336>",
	"кощк": " вызывает <:10671gagaga:1261101437191065652> <@952072802083667988>",
	"хехобара": " вызывает 1ana4ille <@839929881760628746>",
}
const otherPing = {
	"релик": "<@767304954880720916>",
	"опостал": "<@755654273173291008>",
	"папуг": "<@293031501514276864>",
	"спунч": "<@561514969716359169>",
	"лизочка": "<@1023724564330578013>",
	"софа": "<@1060999684300210266>",
	"хахатунчик": "<@665105418824974336>",
	"кощк": "<@952072802083667988>",
	"хехобара": "<@839929881760628746>",
}
const aliases = {
	"релик": ["сучий", "брелок", "брелик"],
	"опостал": ["апостал", "опездал"],
	"папуг": ["папук", "ром4ик", "ром4iк", "ром4ik"],
	"спунч": ["чнапс", "чнупс"],
	"лизочка": ["мефчик", "лидочка", "лида", "лиза"],
	"софа": ["соня", "софик", "safrol", "сафрол"],
	"хахатунчик": ["владос", "владик"],
	"кощк": ["кощьк", "кiт", "котяра"],
	"хехобара": ["поля", "полина", "хехочка", "хеха"],
}
const guilds = {
	"979816565174333480": ["979816565174333483"],
	"1042560078038966293": ["1042560078038966296"],
	"1162360231871922328": ["1162360232484282412", "1259868662492434468"],
};
const lastInter = {};
const currDate = new Date();
var prevMsg;

global.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, '/src/commands');
const functionsPath = path.join(__dirname, '/src/functions');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	client.user.setStatus("idle");
	client.user.setActivity('Bored');
	client.channels.cache.get("1042560078038966296").send('<@209346736676667396> Бот запущен <a:RRE_LuciAhh:1046073428718911561>');
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


function toLog(usr, cnt, rpl){
	return console.log(`---------\n${new Date()}\nA new message detected!\nContent: "${cnt}"\nUser: ${usr}\nReply: ${rpl}\n---------`)
}

const exampleEmbed = new EmbedBuilder().setColor(0xffc0cb)

const uwagaEmbed = new EmbedBuilder().setColor(0xff0000)

const spunchEmbed = new EmbedBuilder().setColor(0xa4f50f);

client.on('messageCreate', msg => {
	if(!msg.author.id != 1042540656758886530 && guilds[msg.guildId.toString()].includes(msg.channelId.toString())){
		if(!msg.content.startsWith('.')){return}
		tempPhrase = msg.content.replace('.', '')
		if (msg.content == '.команды')
		{
			msg.reply('```.трахать\n.трусики\n.лапать\n.гладить\n.тык\n.тыкнуть\n.щёчка или .щечка\n.kiss```')
			return 
		}
		for(var i in aliases)
		{
			if (tempPhrase == i || aliases[i].includes(tempPhrase))
			{
				tempPhrase = i
				break
			}
		}
		if (otherPhrases[tempPhrase] != undefined)
		{
			tempGif = gifs[tempPhrase] != undefined ? gifs[tempPhrase][randDiap(0, gifs[tempPhrase].length)] : gifs["other"][0];
			toLog(msg.author + ' ' + msg.author.username, msg.content);
			if (tempPhrase == "спунч")
			{
				msg.channel.send({
				content: `${hidPing}${msg.author.toString()}${otherPing[tempPhrase]}`,
				embeds: [
					spunchEmbed
					.setAuthor({ name: `УВАГА` })
					.setDescription(
						`${msg.author.toString()}${otherPhrases[tempPhrase]}`,
					)
					.setImage(tempGif)
					.setTimestamp(),
				],
				});
				return
			}
			msg.channel.send({ 
				content: `${ hidPing }${ msg.author.toString() }${ otherPing[tempPhrase] }`, 
				embeds: [uwagaEmbed.setAuthor({ name: `УВАГА` }).setDescription(`${msg.author.toString()}${otherPhrases[tempPhrase]}`).setImage(tempGif).setTimestamp()] });
			return 
		}
		for(var i in phrases){
			// Console.log(msg.channel)
			if (msg.content.startsWith(`.${ i }`) && (msg.type == 19 || msgMention.test(msg.content)))
			{
				gif_n = randDiap(0, gifs[i].length)
				// console.log(randDiap(1, gifs[i].length))
				if (i == "трахать" && !msg.channel.nsfw)
				{
					msg.reply('Использование команд бота не поддерживается в канале для малолеток.\nОтсутствует флаг NSFW.')
					return
				}
				var targetUser = msg.type == 19 ? msg.mentions.repliedUser.toString() : msgMention.exec(msg.content)[0]
				toLog(msg.author + ' ' + msg.author.username, msg.content);
				msg.channel.send({ 
					content: `${ hidPing }${ msg.author.toString() }${ targetUser }`, 
					embeds: [exampleEmbed.setAuthor({ name: `Реакция: ${i}` }).setDescription(`${msg.author.toString()}${phrases[i]}${targetUser}`).setImage(gifs[i][Math.floor(gif_n)]).setTimestamp()] });
					return
			}
		}
	}
}
);

(async () => {
	console.log(`${currDate}`);
	currDate = Date();
});

client.login(token);

function sendMessage(tempGuild, tempChannel, tempMessage)
{
	try
	{
		targetC = client.guilds.cache.get(tempGuild).channels.cache.get(tempChannel)
		targetC.send(tempMessage)
		console.log("Message was sent successfully")
		return 
	}
	catch (error)
	{
		console.log(`Failed sending the message\n${error}`)
		return
	}
}

const http = require('http');
const express = require('express');
const app = express();
app.use(express.json())
app.set('port', process.env.PORT)
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  console.log(request.body)
  response.sendStatus(200);
});
app.post("/admin", (request, response) => {
	console.log(Date.now() + " Post Received");
	tempBody = request.body
	console.log(tempBody)
	if(tempBody["secret"] == process.env.SECRET)
	{
		console.log("Secret passed")
		sendMessage(tempBody["guild"], tempBody["channel"], tempBody["message"])
	}
	response.sendStatus(200);
})
app.listen(process.env.PORT);
// setInterval(() => {
//   http.get(`http://127.0.0.1:${process.env.PORT}/`);
// }, 10000);

setInterval(() => {
	fetch(`https://relic-ext.onrender.com/`, {
		method: "get",
		headers: {
			"Host": `relic-ext.onrender.com`,
			"User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)",
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			"Accept-Language": "en-us,en;q=0.5",
		}
	});
  }, 280000);

