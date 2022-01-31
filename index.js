const secret = require('./secret.json');
const dic = require('./dictionary.json');
const discord = require('discord.js');
const crawler = require('./crawler');

const fs = require('fs');

const client = new discord.Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES'
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function dataLog(data) {
  var builder = "";
  for(var i= 0; i< data.length; i++) {
    builder +=  data[i].rank+'\t' + data[i].tier+'\t' + data[i].name+'\t' + data[i].winrate+'\t' + data[i].pickrate+'\n';
  }
  return builder;
}

function getTierString(tier) {
  if(tier==="Tier 1") return ":crown:";
  else if(tier==="Tier 2") return ":second_place:";
  else if(tier==="Tier 3") return ":third_place:";
  else if(tier==="Tier 4") return ":four:";
  else if(tier==="Tier 5") return ":poop:";
  else if(tier==="애쉬") return getTierString("Tier 1"); //왜이럼이거..
  else return tier;
}

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
      fs.writeFileSync("crawled.txt", '\ufeff' + dataLog(data), {encoding: 'utf-8'});

      // 파라미터로 입력받은 챔피언만 걸러냄
      let res = data.filter(x => params.includes(x.name));

      // 결과 문자열 빌드
      var builder = "";
      var summary = 0;
      for(var i= 0; i< res.length; i++) {
        builder += `${getTierString(res[i].tier)} ${res[i].name}\t\t\t\t\t[승률 ${res[i].rank}위(${res[i].winrate}) / 픽률:${res[i].pickrate}]\n`;
        summary += parseFloat(res[i].winrate.slice(0, -1));
      }

      if(res.length == 5) {
        const average = summary / 5;
        builder += `\n\n승률 평균 : ${average.toFixed(2)}%`

        if(average < 50) {
          builder += `\n\n
          ＿人人人人人＿
          ＞ 닷지하자 ＜
          ￣Y^Y^Y^Y^Y￣`;
        }
      }

      msg.reply(builder);
    });
  }
});


client.login(secret.token);