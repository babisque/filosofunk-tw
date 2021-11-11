const Twit = require('twit');
const config = require('./config.json');
const filosobot = new Twit(config);

let https = require('https');
let url = 'https://raw.githubusercontent.com/IgorRozani/filosofunk/master/poesias.json';

function tweetar() {
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    https.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            let json = JSON.parse(data);
            let sorted = randomNumber(0, Object.keys(json).length);
            let poesiaPost = `"${json[sorted].estrofe}" - ${json[sorted].poeta}`;
            filosobot.post(
                'statuses/update',
                { status: poesiaPost },
                function (err, data, response) {
                    if (err) {
                        console.log('ERRO: ' + err);
                        return false;
                    }
                    console.log('Tweet postado com sucesso');
                }
            )
        });
    });
}

tweetar();
setInterval(tweetar, 43200000);