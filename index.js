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
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259857893797134367/f7.gif?ex=668d3598&is=668be418&hm=89f0a7a5d25b4c52a54717d6e3ff15567d2c3323bd8160a7a884bada67d5191f&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259857894439125002/f1.gif?ex=668d3599&is=668be419&hm=058c6903b58f3bca1c3b1373d81013857128728d77ed89a24355bd428b583320&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259857895114145883/f2.gif?ex=668d3599&is=668be419&hm=e131bc7b04b2807d7e0bfc6edc5f9284256424db270fc2beeb418e48087562c2&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259857895600820315/f3.gif?ex=668d3599&is=668be419&hm=f1d4c10036a9ffa40acbc573d46b0cd0368d7b2d808509384bf35f33a7c73690&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259857896284618794/f4.gif?ex=668d3599&is=668be419&hm=0a8cabf590873c37b852b7fa80a43cf8d4b4b3f6c6ba95ae37ba3481629bfe90&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259857897106444288/f5.gif?ex=668d3599&is=668be419&hm=4f013299dc965815681246e55f5366686efbde67cbb6effffb525646a449f081&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259857897719070852/f6.gif?ex=668d3599&is=668be419&hm=1b69b4f55fae08e233d8d544f770af3b006158c27e89b599d1fd97f776eec6ae&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259870036902805616/p12.gif?ex=668d40e8&is=668bef68&hm=2b25731c98053f5dfc869dfa6885b97c5a68455ec46354d1515cf6ab6d03c6d8&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259882010558595102/f8.gif?ex=668d4c0e&is=668bfa8e&hm=1755dd506b20984d7a43b8a6c62a3aab03199bcb8c002b40966057a0f8dad866&",
	],
	"трусики": [
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259858288061976586/p1.gif?ex=668d35f6&is=668be476&hm=9e6b193a855c06fa70ce4a9407c437ab6f960959ff891881251dcde42d3c2f7b&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259858288896376912/p2.gif?ex=668d35f7&is=668be477&hm=e479bb9e96bfe962c65a4025cb0e8eea91606ffe605175d524f5f6967ef87ff8&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259858289630642186/p3.gif?ex=668d35f7&is=668be477&hm=147ef9f10643ecfcc9f5e29bae732b629f0d7cca909d5f6526fb4a9e4b2db20c&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259858290427432983/p4.gif?ex=668d35f7&is=668be477&hm=9cbf4f8cf862077d97119a5d39ee5911e19f9cefab327f87e9f7ca671e72bdea&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259858291039932566/p5.gif?ex=668d35f7&is=668be477&hm=c77040ecd35f6a457d203d6933296034c72dab7696ed6c056f1a88086ce6668f&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259858291899498608/p6.gif?ex=668d35f7&is=668be477&hm=5b9eeca5615abddf3b63004aa2488a31de141e360d4d760761c239965dc7659b&",
	],
	"лапать": [
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259869983878545408/p10.gif?ex=668d40db&is=668bef5b&hm=5fd2ff31ec88c83dfb333061853a05b4626917bf710745d4c4738fccc0fbe1bf&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259869984218157097/p1.gif?ex=668d40db&is=668bef5b&hm=82eee8437688dbdcc4fee340df6ef535c16b7a5cad13b6f35d5ef6320e2a95c3&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259869984574803988/p2.gif?ex=668d40db&is=668bef5b&hm=c15941f0518905b2cd9da4faefc1880395b7421d894378fadfd354587cef6fcf&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259869984998293585/p3.gif?ex=668d40db&is=668bef5b&hm=8d80cfe90fb9f87eff3ebee49e54ee79d5606725ae28e8672262203d711e94fa&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259869985422180515/p4.gif?ex=668d40db&is=668bef5b&hm=af8d77b447c4617f686e4f0bc05d4e79767debdf811874359c6901faf33da268&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259869986143342714/p6.gif?ex=668d40db&is=668bef5b&hm=6de85a986df017c9abdd0f18448dab5f2d50540b8b3118d465342a9f2fa730fe&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259869986487402669/p7.gif?ex=668d40dc&is=668bef5c&hm=df9040e27766949a54e10f6e3e8e0ea5115fe0a355a76351ba1bb4b8bbe342ef&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259869986906964008/p8.gif?ex=668d40dc&is=668bef5c&hm=1d7f0c29e7921c5dafa2ddbe49a0628dec09bd48a1a155bcb03c91f0e76c14e8&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259869987238182912/p9.gif?ex=668d40dc&is=668bef5c&hm=fb238d2276633bb08ba1853e9ecfe9c4f294b4daf8b67f31c8e231dd7f3921c3&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259870037276233859/p11.gif?ex=668d40e8&is=668bef68&hm=b70130903fb81a3a73345735d4c8bb426131cb43c1106801bb890d3bc39179c3&",
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
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259885576145080351/t1.gif?ex=668d4f60&is=668bfde0&hm=ae5dfa06f223f6d6f8d5a3be7b2d400175f9af7be0b28938b1bc4d7830d3eddd&",
		"https://media1.tenor.com/m/8m9W6274Q2IAAAAC/chubs-cute.gif",
		"https://media1.tenor.com/m/U6qa9KfWsHoAAAAC/poke-stop.gif",
		"https://media1.tenor.com/m/6rS1x-dVUwEAAAAC/ishtar-ishtar-fgo.gif",
		"https://media1.tenor.com/m/DDbTTf6yoQYAAAAC/boop-cute.gif",
		"https://media1.tenor.com/m/XSkxT2nVgbAAAAAC/cat-nose.gif",
		"https://media1.tenor.com/m/ncx61LPfp2UAAAAC/chub-chubs.gif",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259885576572633118/t2.gif?ex=668d4f60&is=668bfde0&hm=cc411f612f2b7c7e925c7d021c6928f939d1661995141954acbd282a1dbf0e08&",
		"https://media1.tenor.com/m/_vVL5fuzj4cAAAAC/nagi-no.gif",
	],
	"тыкнуть": [
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259885576145080351/t1.gif?ex=668d4f60&is=668bfde0&hm=ae5dfa06f223f6d6f8d5a3be7b2d400175f9af7be0b28938b1bc4d7830d3eddd&",
		"https://media1.tenor.com/m/8m9W6274Q2IAAAAC/chubs-cute.gif",
		"https://media1.tenor.com/m/U6qa9KfWsHoAAAAC/poke-stop.gif",
		"https://media1.tenor.com/m/6rS1x-dVUwEAAAAC/ishtar-ishtar-fgo.gif",
		"https://media1.tenor.com/m/DDbTTf6yoQYAAAAC/boop-cute.gif",
		"https://media1.tenor.com/m/XSkxT2nVgbAAAAAC/cat-nose.gif",
		"https://media1.tenor.com/m/ncx61LPfp2UAAAAC/chub-chubs.gif",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1259885576572633118/t2.gif?ex=668d4f60&is=668bfde0&hm=cc411f612f2b7c7e925c7d021c6928f939d1661995141954acbd282a1dbf0e08&",
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
		'https://i.imgur.com/Z6fAorC.gif',
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
		"https://cdn.discordapp.com/attachments/1259856927865700452/1260627390510530601/mefchik2.gif?ex=6690023f&is=668eb0bf&hm=50f4fe2c3ce97cfc83f41c8952e0d525e7c4104608370226243b2f864a3e1bdf&"
	],
	"софа": ["https://media1.tenor.com/m/F4A5RHNrTIEAAAAC/zdarova.gif"],
	"хахатунчик": ["https://media1.tenor.com/m/rRQFGTU6FAMAAAAC/mercedes.gif"],
	"сырник": [
		"https://media1.tenor.com/m/qi8MqDKmpl8AAAAC/lycoris-recoil-chisato.gif",
		"https://media.tenor.com/RVU4H9rRmpcAAAAC/kubo-nagisa-anime.gif",
		"https://media1.tenor.com/m/gIbE9pZ7raYAAAAC/wataten-watashi-ni-tenshi-ga-maiorita.gif",
		"https://media1.tenor.com/m/xS09IqCS1e0AAAAC/anime-anime-boy.gif",
		"https://media1.tenor.com/m/stQ5fJpT4FsAAAAC/luck-and-logic-anime-girl.gif",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1260158595295608873/Strike-Witches-Charlotte-E-Yeager-Strike-Witches-Character-Strike-Witches-gif-3392747.gif?ex=668e4da5&is=668cfc25&hm=c58ec3fd8584cbf18d86314ad77fb6fc698393bb0167467d4a3b6a426476e4d4&",
		"https://cdn.discordapp.com/attachments/1259856927865700452/1260158595685814374/kanzashi-eating.gif?ex=668e4da5&is=668cfc25&hm=b629989d6a87cc12144a337ba5c4ecc08e9ee32527c8710e9ceaed979f3b28c2&",
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
}
const otherPing = {
	"релик": "<@767304954880720916>",
	"опостал": "<@755654273173291008>",
	"папуг": "<@293031501514276864>",
	"спунч": "<@561514969716359169>",
	"лизочка": "<@1023724564330578013>",
	"софа": "<@1060999684300210266>,
}
const aliases = {
	"релик": ["сучий", "брелок", "брелик"],
	"опостал": ["апостал", "опездал"],
	"папуг": ["папук"],
	"спунч": ["чнапс", "чнупс"],
	"лизочка": ["мефчик", "лидочка", "лида"],
	"софа": ["соня", "софик"]
}
const triggers = {
    //"привет": "Доброго времени суток, господин!",
    "спокойной ночи": "Прекрасной ночи, мой господин! <a:RRE_RaidenNyaah:1046076468129693747>",
	"сладких снов": "Прекрасной ночи, мой господин! <a:RRE_RaidenNyaah:1046076468129693747>",
    "мур": "Мяу <:RRE_NekoAdmin:1042932728582123572>",
    "мяу": "Мр-р-р-р <:RRE_NekoAdmin:1042932728582123572>",
    "лох": "Не обзывайся!",
	"<@1042540656758886530>": "Что такое, сладкий?",
	"мама": "Да, мой сладкий котёночек?",
	"<@1042540656758886530> мама": "Да, мой сладкий котёночек?",
	"а": "Хуй на <:RRE_Mari:1042497825310785576>",

}; //"а": "Хуй на <:RRE_Mari:1042497825310785576>",
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
//const functionFiles = fs.readdirSync(functionsPath).filter(file => file.endsWith('.js'));

//const channelResp = client.channels.cache.get(channel => channel.id === "1042560078038966296");

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

//for (const file of functionFiles) {
//	const funcPath = path.join(functionsPath, file);
//	const funct = require(funcPath);
//	// Set a new item in the Collection
//	// With the key as the command name and the value as the exported module
//	client.functions.set(funct.data.name, funct);
//}

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
			tempGif = gifs[tempPhrase] != undefined ? gifs[tempPhrase][0] : gifs["other"][0];
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

// client.on('messageCreate', msg => {
// 	if(!msg.author.bot){
// 		// console.log('123');
// 		// console.log(msg.mentions.repliedUser.id);
// 		for(var i in triggers){
// 			if (msg.type == 19 && msg.mentions.repliedUser.id == '1042540656758886530'){
// 			//else if (msg.content.toLowerCase().toString().startsWith('привет') && msg.type == 'REPLY'){
// 				//if (msg.author.toString() == "<@764949316703223838>") msg.reply("Доброго времени суток, госпожа!");
// 				//else prevMsg = msg.reply("Доброго времени суток, господин!");
// 				toLog(msg.author + ' ' + msg.author.username, msg.content, "Доброго времени суток, господин!");
// 				msg.channel.send({ content: `${ hidPing }<@${ msg.author.id }>`, embeds: [exampleEmbed.setAuthor({ name: 'Трахнуть' })] });
// 				break;
// 			}
// 			else if(msg.content.toLowerCase().toString().startsWith('123')){
// 				prevMsg = msg.reply(`321`);
// 				toLog(msg.author + ' ' + msg.author.username, msg.content, '123');
// 				break;
// 			}
// 			else if(msg.content.toLowerCase().toString().startsWith(i)){
// 				prevMsg = msg.reply(`${triggers[i]}`);
// 				toLog(msg.author + ' ' + msg.author.username, msg.content, triggers[i]);
// 				break;
// 			}
			
// 		}
// 	}
// }
// );

// client.on('messageCreate', msg => {
// 	if(!msg.author.bot){
// 		// console.log('123');
// 		// console.log(msg.mentions.repliedUser.id);
// 		for(var i in triggers){
// 			if (msg.type == 19 && msg.mentions.repliedUser.id == '1042540656758886530'){
// 			//else if (msg.content.toLowerCase().toString().startsWith('привет') && msg.type == 'REPLY'){
// 				//if (msg.author.toString() == "<@764949316703223838>") msg.reply("Доброго времени суток, госпожа!");
// 				//else prevMsg = msg.reply("Доброго времени суток, господин!");
// 				toLog(msg.author + ' ' + msg.author.username, msg.content, "Доброго времени суток, господин!");
// 				msg.channel.send({ content: `${ hidPing }<@${ msg.author.id }>`, embeds: [exampleEmbed.setAuthor({ name: 'Трахнуть' })] });
// 				break;
// 			}
// 			else if(msg.content.toLowerCase().toString().startsWith('123')){
// 				prevMsg = msg.reply(`321`);
// 				toLog(msg.author + ' ' + msg.author.username, msg.content, '123');
// 				break;
// 			}
// 			else if(msg.content.toLowerCase().toString().startsWith(i)){
// 				prevMsg = msg.reply(`${triggers[i]}`);
// 				toLog(msg.author + ' ' + msg.author.username, msg.content, triggers[i]);
// 				break;
// 			}
			
// 		}
// 	}
// }
// );


client.on('guildMemberAdd', async member => {
	console.log(member.guild.roles.cache.find());
	console.log(`~~~~~~\nNew user is joined!\nUser: ${member.id}\n~~~~~~`)
	member.guild.channels.get('channelID').send(`Добро пожаловать в чистилище, <@${member.id}>!`);
	member.roles.add(member.guild.roles.cache.get("995963494186881045"));
});

(async () => {
	console.log(`${currDate}`);
	currDate = Date();
});

client.login(token);

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
// setInterval(() => {
//   http.get(`http://127.0.0.1:${process.env.PORT}/`);
// }, 10000);

//setInterval(() => {
//	fetch(`https://relic-ext.onrender.com/`, {
//		method: "get",
//		headers: {
//			"Host": `relic-ext.onrender.com`,
//			"User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)",
//			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//			"Accept-Language": "en-us,en;q=0.5",
//		}
//	});
//  }, 280000);







// client.on('messageCreate', msg => {
// 	// You can view the msg object here with console.log(msg)
// 	//console.log(triggers[0]);
// 	for(var i in triggers){
// 		cont = msg.content.toLowerCase().split(/[.,!,? ]/);
// 		if(cont.toString().indexOf(i.split(/[.,!,? ]/)) != -1 && !msg.author.bot){
// 			console.log(`---------\n${new Date()} A new message detected! "${msg.content}"\nUser: ${msg.author}\nReply: ${triggers[i]}\n---------`);
// 			if (triggers[i] == "Хуй на <:RRE_Mari:1042497825310785576>"){
// 				if (cont.indexOf("а") != -1 && cont.length == 1){
// 					msg.reply(`${triggers[i]}`);
// 				}
// 			}
// 			else if ((i.includes("мама") && i.includes("<@1042540656758886530>")) && msg.author.toString() == "<@952072802083667988>"){
// 				msg.reply(`${triggers[i]}`);
// 			}
// 			else if ((i.includes("мама") && i.includes("<@1042540656758886530>")) && msg.author.toString() != "<@952072802083667988>"){
// 				msg.reply(`Я не твоя мама...`);
// 			}
// 			else{
// 				if (triggers[i] == "Доброго времени суток, господин!"){
// 					if (msg.author.toString() == "<@764949316703223838>") msg.reply("Доброго времени суток, госпожа!");
// 					else msg.reply("Доброго времени суток, господин!");
// 					console.log(`${msg.author == "<@764949316703223838>"}`);
// 				}
// 				else msg.reply(`${triggers[i]}`);
// 			}
// 		};
// 	};
// });



//client.on('messageCreate', msg => {
//	// You can view the msg object here with console.log(msg)
//	 if (msg.content === 'Hello') {
//	   msg.reply(`Hello ${msg.author.username}`);
//	 }
//});
