import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Seguro } from 'src/app/models/Seguro';
import { SeguroService } from 'src/app/services/seguro.service';

@Component({
  selector: 'app-listar-seguros',
  templateUrl: './listar-seguros.component.html',
  styleUrls: ['./listar-seguros.component.css']
})
export class ListarSegurosComponent {

  public seguros$?: Observable<Seguro[]>;
  constructor(
    private seguroService: SeguroService
  ){}

  ngOnInit(){
    this.seguros$ = this.seguroService.listar();  
  }
}
