import { HttpClient } from '@angular/common/http';
import { isNgContainer } from '@angular/compiler';
import { Injectable, Injector } from '@angular/core';
import Dexie from 'dexie';
import { Observable } from 'rxjs';
import { Seguro } from '../models/Seguro';
import { BaseService } from './base.service';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({
  providedIn: 'root'
})
export class SeguroService extends BaseService<Seguro> {
  constructor(
    protected override injector: Injector
  ){
    super(injector, 'seguros', 'https://localhost:9000/api/seguros');
  }
  
   
}
