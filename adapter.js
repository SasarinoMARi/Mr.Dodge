// index.js와 크롤러 모듈 사이르를 조율하는 모듈

const fs = require('fs');
const crawler = require('./crawler');
const time = require('./time');

module.exports = {
    get: function(type, callback) {
        let filename = `analytics/${type}/${time().format("YYYY-MM-DD")}.log`;
        // 오늘자 챔피언 통계표 있는지 확인
        if(fs.existsSync(filename)) { // 있는 경우 파일 불러와서 데이터 받아오기
            console.log("오늘자 통계 파일을 확인했습니다.")
            var json = fs.readFileSync(filename, {encoding:'utf-8'});
            var data = JSON.parse(json);
            callback(data);
        } 
        else { // 없는 경우 크롤러 호출해서 데이터 받아오기
            console.log("오늘자 통계 파일을 확인하지 못했습니다.\nporo.gg 사이트에서 크롤링을 시작합니다.")
            crawler.stuff(type, function (data) {
                var json = JSON.stringify(data);
                fs.writeFileSync(filename, json, {encoding:'utf-8'});
                callback(data);
            });
        }
    },

    // 아래는 안씀
    getKal: function(callback) {
        this.get('aram', callback);
    },
    getUrf: function(callback) {
        this.get('urf', callback);
    }
};