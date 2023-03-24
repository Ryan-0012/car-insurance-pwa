const webpush = require('web-push');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
/**
 * Settings VAPID
 */

const vapidKeys = {
    "publicKey": "BMtQTXeTAMb6dirLG0o2oMENske28eSfSRJkK6VEdXH9lcH3mwfEU7cza8hNhEnJOOyacb95QOeIFaTpPdFn8Xw",
    "privateKey": "eOLnIMyvDEhCWvwTOFax9MGbV0W8c_WTjZ_KCW1CREY"
}

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const enviarNotificacion = (req, res) => {

    const pushSubscription = {
        endpoint: 'https://wns2-bl2p.notify.windows.com/w/?token=BQYAAAAN6SITwSV12Ryv%2bSarEodGzAPdDB%2b%2fQlwGnALe6Wb%2bu%2brISBEsuPxME0azDf4%2f7uu0QGZq5G9DfnU02JYzw8f7sXsXeDJ3iveMm73fN%2f7tnUMmwjvleha7rq8s7bk8bu7RZSN9ylrlGuqbMp4ELgV53u632vorkPOHOwPIrG783epVDtmITdMhm%2fiszDVUbiRIo%2bA0NSSJ65MM0hCy4f0McCqvoymLfnMZymYRGvKxgq2ywYJHE%2b%2fixLoRKm1WWKnRGHflZqVehkq%2fROzX1B8rkWP3TxjcGV5izyfZLeSinAar1kDUJgk1QasHF%2fQFmEU%3d',
        keys: {
            auth: '_CxsQbf-Z-UlfWjXsZKIJQ',
            p256dh: 'BGCQ34b3xIj7gLGsi8IlWrwdUGP-JUv2uR3F6ztaHOL99HTyPqLAC4VwYMYDszu6ORyhdjc9G2jOiT1L9RqsvWQ'
        }
    };

    const payload = {
        "notification": {
            "title": "😄😄 Saludos",
            "body": "Subscribete a mi canal de YOUTUBE",
            "vibrate": [100, 50, 100],
            "image": "https://avatars2.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4",
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }

    webpush.sendNotification(
        pushSubscription,
        JSON.stringify(payload))
        .then(res => {
            console.log('Enviado !!');
        }).catch(err => {
            console.log('Error', err);
        })

    res.send({ data: 'Se envio subscribete!!' })

}

app.route('/send-notification').post(enviarNotificacion);


const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});
