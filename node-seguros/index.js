const express = require("express");
const cors = require('cors');
const { addSubscription } = require('./add-subscription');
const { sendNotification } = require('./send-notification');
const { sendNotification2 } = require('./send-notification2');
const { db } = require('./in-memory-db');

const bodyParser = require('body-parser');
const webpush = require('web-push');

const { enviarNotificacao } = require('./enviar-notificacao');
const { listarSeguros, salvarSeguro } = require('./seguro-service');
const { adicionaPushSubscriber } = require('./adiciona-push-subscriber');

// VAPID keys should be generated only once.
const vapidKeys = {
  "publicKey": "BLg5XlFaotXLBDWqoWAWzwxEikcdUuHWGrQ2cKhCl1_hVNIN3vZ5iA8-ofqgJSMX98wh3myTXIojUPkSWaFDk_M",
    "privateKey": "gAegrUro5BKLgxtU07aO0NzFq0DFWAWVLFir2eOsNP0"
}
webpush.setVapidDetails(
    'https://example.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

app.route('/add-subscription')
    .post(addSubscription);

app.route('/api/subscriptions/all')
    .get((req, res) => {
        res.json(db);
    });


app.route('/send-notification')
    .get(sendNotification);

app.route('/send-notification2')
    .get(sendNotification);

app.route('/api/seguros')
    .post(salvarSeguro);

app.route('/api/seguros')
    .get(listarSeguros);

app.route('/api/notificacao')
    .post(adicionaPushSubscriber);

app.route('/api/notificacao/enviar')
    .post(enviarNotificacao);

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

const PORT = 9000;
const HOST = 'localhost';

const server = https.createServer(options, app);

server.listen(PORT, HOST, () => {
  console.log(`HTTPS Server running at https://${HOST}:${PORT}`);
});
