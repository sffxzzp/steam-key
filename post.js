const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = (postAddress, subId, subName, serverId) => {
    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            subId: subId,
            subName: subName,
            server: serverId,
        }),
    };
    start(postAddress, options);
};


async function start(url, options) {
    try {
        for (let i = 0; i < 3; i++) {
            let res = await doPost(url, options);
            if (res === 'OK') {
                break;
            }
        }
    } catch (error) {
        // console.log(error);
    }
}

function doPost(url, options) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                resolve(response.body);
            }
        } catch (error) {
            reject(error);
        }
    });
}