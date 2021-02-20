import { Routes } from '@angular/router'

import { AcessoComponent } from './acesso/acesso.component'
import { PainelComponent } from './painel/painel.component'
import { AddprodutosComponent } from './painel/addprodutos/addprodutos.component'
import { AutenticacaoGuard } from './autenticacao-guard.service'
import { LojaComponent } from './loja/loja.component'
import { OfertaComponent } from './loja/oferta/oferta.component'
import { CarrinhoComponent } from './loja/carrinho/carrinho.component'


export const ROUTES: Routes =[

    { path: '', component: LojaComponent},
    { path: 'loja', component: LojaComponent},
    { path: 'loja/oferta:key', component: OfertaComponent},
    { path: 'loja/oferta:', component: CarrinhoComponent},
    { path: 'loja/carrinho', component: CarrinhoComponent},
    { path: 'acesso', component: AcessoComponent},
    { path: 'painel', component: PainelComponent, canActivate:[ AutenticacaoGuard ]},
    { path: 'painel/addproduto', component: AddprodutosComponent}

]
//{ path: 'painel', component: PainelComponent, canActivate:[ AutenticacaoGuard ]},
//    { path: 'painel', component: PainelComponent, canActivate: [ AutenticacaoGuard]},