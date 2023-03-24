import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import Dexie from 'dexie';
import { Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends {id: string}> {
  private db: any;
  protected http: HttpClient;
  protected onlineOfflineService: OnlineOfflineService;

  constructor(
    protected injector: Injector,
    protected nomeTabela: string,
    protected urlApi: string
  ) {
    this.http = this.injector.get(HttpClient);
    this.onlineOfflineService = this.injector.get(OnlineOfflineService);
    this.ouvirStatusConexao();
    this.criarDatabase(); 
  }

  private criarDatabase() {
    this.db = new Dexie('database');
    this.db.version(1).stores({
      [this.nomeTabela]: 'id'
    });
  }

   private salvarAPI(tabela: T ) {

    console.log('mandando pra API');
    this.http.post(this.urlApi, tabela)
      .subscribe(
      () => {
        alert('tabela salvo com sucesso!');
      },
      err => console.error('Erro ao salvar tabela', err)
    );
  }

   private salvarIndexedDb(tabela: T) {
    this.db[this.nomeTabela]
      .add(tabela)
      .then(async () => {
        const todostabelas: T[] = await this.db[this.nomeTabela].toArray();
        console.log('item salvo no IndexedDb', todostabelas);
      })
      .catch((err: any) => console.log('erro ao incluir item no IndexedDb', err));
  }

  private async enviarItensdoIndexedDb() {
    const todostabelas: T[] = await this.db[this.nomeTabela].toArray();
    console.log(todostabelas);
    todostabelas.forEach(async (item: T) => {

      await this.salvarAPI(item);

      this.db[this.nomeTabela].delete(item.id).then(() => {
        console.log(`tabela com a placa ${item.id} deletado do IndexedDb`);
      });
    });
  }

  public cadastrar(tabela: T){// dentro dos parenteses esta o que ele recebera de parametros
    if (this.onlineOfflineService.isOnline) {
      this.salvarAPI(tabela);
    } else {
      this.salvarIndexedDb(tabela);
    }
  }

  listar(): Observable<T[]>{
    return this.http.get<T[]>(this.urlApi);
  }

  private ouvirStatusConexao() {
    this.onlineOfflineService.trocaConexao.subscribe(online => {
      if(online){
        this.enviarItensdoIndexedDb();
      } else {
        console.log('estou offline');
      }
    });
  }
}
