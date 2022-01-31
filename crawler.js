const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
    try {
        return await axios.get("https://poro.gg/champions?gameMode=aram");
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    stuff: function (callback) {
        getHtml()
            .then(html => {
                let champions = [];
                const $ = cheerio.load(html.data);
                const $bodyList = $("div.champion-sub-list__content").first().children("div.champion-sub-list__item");

                $bodyList.each(function (i, elem) {
                    if (i > 0)

                        champions[i] = {
                            rank: $(this).find('div.rank').text(),
                            name: $(this).find('div.champion a div span').text().trim(),
                            tier: $(this).find('div:nth-child(3) img').attr("alt"), //.replace("Tier ", "")
                            winrate: $(this).find('div:nth-child(4)').text().trim(),
                            pickrate: $(this).find('div:nth-child(5)').text().trim()
                        };
                })
                const data = champions.filter(n => n.name);
                return data;
            })
            .then(data => {
                //console.log(data);
                callback(data);
            });
    }
};