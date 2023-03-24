import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'car-insurance-pwa';

  subscription: any;
  readonly VAPID_PUBLIC_KEY = 'BLg5XlFaotXLBDWqoWAWzwxEikcdUuHWGrQ2cKhCl1_hVNIN3vZ5iA8-ofqgJSMX98wh3myTXIojUPkSWaFDk_M'
  constructor(
    private http: HttpClient,
    private swPush: SwPush
  ) {

    
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(subscription => {
      this.subscription = subscription;
      console.log('Usuário permitiu notificações.');
      this.http.post('https://localhost:9000/add-subscription', subscription)
        .subscribe();

    })
    .catch(err => {
      console.error('Usuário recusou ou Navegador não suporta', err);
    });
  
  

    /*
    this.swPush.requestSubscription({
      serverPublicKey: 'BBl5Vw0PCEM8nbonAjahMaBPAR3MEibrU-zwkXHd0vp_bL4w43ej_K41pLBWOIjCW_3TnotZvskdY_Xmg0Hde3I'
    })
    .then(subscription => {
      console.log('Usuário permitiu notificações.');
      this.http.post('https://localhost:9000/add-subscription', subscription)
        .subscribe();
    })
    .catch(err => {
      console.error('Usuário recusou ou Navegador não suporta', err);
    });
    */
  }

  ngOnInit(): void {
    this.subscribeToNotificationClicks();
  }

  subscribeToNotificationClicks(): void {
    this.swPush.notificationClicks
      .subscribe(result => {
        alert('Usuário clicou na ação ' + result.action);
      });
  }
  
}
