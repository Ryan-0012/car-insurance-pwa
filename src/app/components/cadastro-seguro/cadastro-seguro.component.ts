import { Component, OnInit } from '@angular/core';
import { Seguro } from 'src/app/models/Seguro';
import { MarcaCarro } from 'src/app/models/MarcaCarro';
import { Observable } from 'rxjs';
import { MarcaCarroService } from 'src/app/services/marca-carro.service';
import { SeguroService } from 'src/app/services/seguro.service';
import { PushNotificationService } from 'src/app/services/push-notification.service';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-cadastro-seguro',
  templateUrl: './cadastro-seguro.component.html',
  styleUrls: ['./cadastro-seguro.component.css']
})
export class CadastroSeguroComponent implements OnInit {
  
  public seguro = new Seguro();
  public marcasCarro$!: Observable<MarcaCarro[]>;
  subscription: any;

  constructor(
    private marcaCarroService: MarcaCarroService,
    private seguroService: SeguroService,
    private pushNotificationService: PushNotificationService,
    ){}

  ngOnInit(){
    this.marcasCarro$ = this.marcaCarroService.getMarcas();
  }

  cadastrar(){
    if (this.seguro.placaCarro) {
      this.seguro.id = this.seguro.placaCarro;
      this.seguroService.cadastrar(this.seguro);
    }
  }

  enviarNotificacao() {
    this.pushNotificationService.enviar();
  }

  
  

    
    
  
  

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
