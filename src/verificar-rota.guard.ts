import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Routes } from '@angular/router';
import { ListarSegurosComponent } from './app/components/listar-seguros/listar-seguros.component';
import { CadastroSeguroComponent } from './app/components/cadastro-seguro/cadastro-seguro.component';

@Injectable({
  providedIn: 'root'
})
export class VerificarRotaGuard implements CanActivate {

  constructor(private router: Router, private location: Location) {}

  routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'cadastro' },
    { path: 'cadastro', component: CadastroSeguroComponent },
    { path: 'listar', component: ListarSegurosComponent },
  ];

  canActivate(): boolean {
    const caminho = 'cadastro';
    const rotaExistente = this.routes.find(route => route.path === caminho);
    if (rotaExistente && rotaExistente.component) {
      const urlCompleta = this.location.prepareExternalUrl(caminho);
      console.log(`A rota ${urlCompleta} existe e tem um componente associado.`);
      return true;
    } else {
      console.log(`A rota ${caminho} não existe ou não tem um componente associado.`);
      this.router.navigate(['listar']); // redireciona para a rota 'listar' se a rota 'cadastro' não existir
      return false;
    }
  }
}