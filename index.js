const secret = require('./secret.json');
const dic = require('./dictionary.json');
const discord = require('discord.js');
const crawler = require('./crawler');

const client = new discord.Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES'
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong! `' + Math.floor(client.uptime) + ' ms`');
  }
  if (msg.content.startsWith('!칼')) {
    // Solving command and champion names
    const params = msg.content.split(" ");
    params.shift();
    let nicknames = dic.filter(x=> params.includes(x.name));
    nicknames.forEach(function(e) {
      params.push(e.dest);
    });

    crawler.stuff(function (data) {
      console.log("크롤러 반환 완료, 데이터 수 : " + data.length);
      let res = data.filter(x => params.includes(x.name));

      var builder = "순위\t티어\t이름\t승률\t픽률\n";
      for(var i= 0; i< res.length; i++) {
        builder += res[i].rank+'\t' + res[i].tier+'\t' + res[i].name+'\t' + res[i].winrate+'\t' + res[i].pickrate+'\n';
      }
      msg.reply(builder);
    });
  }
});


client.login(secret.token);