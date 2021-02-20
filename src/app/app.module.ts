import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule }from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AutenticacaoGuard } from './autenticacao-guard.service'
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { Autenticacao } from './autenticacao.service'
import { Bd } from './bg.service'
import { Progresso }from './progresso.service'
import { CarrinhoService } from './carrinho.service'


import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { LoginComponent } from './acesso/login/login.component';
import { PainelComponent } from './painel/painel.component';
import { ListaprodutosComponent } from './painel/listaprodutos/listaprodutos.component';
import { AddprodutosComponent } from './painel/addprodutos/addprodutos.component';
import { EditprodutosComponent } from './painel/editprodutos/editprodutos.component';
import { LojaComponent } from './loja/loja.component';
import { CardapioComponent } from './loja/cardapio/cardapio.component';
import { OfertaComponent } from './loja/oferta/oferta.component';
import { CarrinhoComponent } from './loja/carrinho/carrinho.component';



@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    LoginComponent,
    PainelComponent,
    ListaprodutosComponent,
    AddprodutosComponent,
    EditprodutosComponent,
    LojaComponent,
    CardapioComponent,
    OfertaComponent,
    CarrinhoComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ Autenticacao, AutenticacaoGuard, Bd, Progresso, CarrinhoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
