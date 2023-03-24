const express = require("express");
const cors = require('cors');
const { addSubscription } = require('./add-subscription');

const bodyParser = require('body-parser');
const webpush = require('web-push');

const { actionNotification } = require('./notifications/action-notification');
const { enviarNotificacao } = require('./enviar-notificacao');
const { listarSeguros, salvarSeguro } = require('./seguro-service');
const { adicionaPushSubscriber } = require('./adiciona-push-subscriber');

// VAPID keys should be generated only once.
const vapidKeys = {
    "publicKey":"BEyGvGb05J3tOzfxtl6wZ5uCojyoeMtuDD29mDP8cuOkxIjpwmGBK_6XUqSTfaNa7F-Tzz52dA-3ASkiStVRkdE",
    "privateKey":"_Q2-SfSZMhlNxJume2_BhnUxmgy4hVJNMJ6IrPTQiZk"
}
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const sendNotification = (req, res) => {
    console.log("1");
  
    
    console.log("2");
    const pushSubscription = {
      endpoint: 'https://fcm.googleapis.com/fcm/send/ccPCQNP4Qnw:APA91bHMJ-bnLeBYYeXKE89yfZPelTAW0F_Vy_IRFuefKesAM0yLRWH1WBQ75j0tTKrOHu7BQ2-d3mprNdKL7VtgGVaxTolPVcg_RiF3K0kl0EiGr6Ah9DTgEN3x5KHvqWdx0ZFAVOPh',
      keys: {
        auth: 'G_Acx30NqzC2WewXCbMQgg',
        p256dh: 'BMLehEY_yrcmsnAjaqjiO1IU_ECdfqseFYucKHkWTnbBEzm140Ka5Ev0t6cWNti04xJOSetvvjUHG4Q2_Dr-H4A'
      }
    };


    const actionNotification = {
        title: 'Novo Comentário!',
        body: 'Você recebeu um incrível comentário. O que deseja fazer?',
        icon: 'assets/img/cat-icon.png',
        actions: [
          {
            action: 'like',
            title: '👍 Like',
          },
          {
            action: 'whatever',
            title: '¯\\_(ツ)_/¯',
          }
        ]
      };
    console.log("3");
  
    webpush.sendNotification(
      pushSubscription,
      JSON.stringify(actionNotification),
      { vapidDetails }
    ).then(res => {
      console.log('Enviado !!');
    }).catch(err => {
      console.log('Error', err);
    })
    // console.log(webpush.generateVAPIDKeys());
    /*
    const vapidDetails = {
      subject: 'https://example.com',
      publicKey: 'BBl5Vw0PCEM8nbonAjahMaBPAR3MEibrU-zwkXHd0vp_bL4w43ej_K41pLBWOIjCW_3TnotZvskdY_Xmg0Hde3I',
      privateKey: 'QHznI0Lrhm5c8ByTsuNyuJKZamqo7qSXwuyBfSD7sIs'
    }
  
    for (const subscription of subscriptions) {
      await webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload),
        { vapidDetails }
      );
    }
    */
    res.status(200).json({message: 'Notificações enviadas!'});
  }

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

app.route('/add-subscription')
    .post(addSubscription);

app.route('/send-notification')
    .post(sendNotification);

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

const httpServer = server.listen(PORT, HOST, () => {
  console.log(`HTTPS Server running at https://${HOST}:${PORT}`);
});











