const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const xml = require('xml2js').parseString;

module.exports = (steamId, callback) => {
    let url = `http://steamcommunity.com/profiles/${steamId}/?xml=1`;
    start(url).then(result => callback(result));
};

async function start(url) {
    try {
        let xmlData = await getXml(url);
        let result = await parseXml(xmlData);

        if (!result || !result['profile']
            || !result['profile']['isLimitedAccount']) {
            console.log('Unable to check! Url: ' + url);
            // FIXME
            return 'OK';
        }

        if (result['profile']['isLimitedAccount'][0] === '0') {
            return 'OK';
        } else {
            return 'Limited account';
        }
    } catch (err) {
        return err.message;
    }
}

function getXml(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                resolve(response.body);
            }
        } catch (error) {
            reject("Cannot get the xml");
        }
    });
}

function parseXml(xmlData) {
    return new Promise((resolve, reject) => {
        xml(xmlData, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject("Cannot parse the xml");
            }
        });
    });
}
