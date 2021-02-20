import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { Router } from '@angular/router'
import { Autenticacao } from '../../autenticacao.service'
import { Bd } from '../../bg.service'
import { CarrinhoService } from '../../carrinho.service'
import { ItemCarrinho } from '../../shared/item-carrinho.model'

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
  animations:[
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, }),
        animate('500ms 300ms ease-in-out')// duração, delay e aceleração
      ])

    ])
  
  ]

})
export class CardapioComponent implements OnInit {
 @Output() public mostraOferta: EventEmitter<any> = new EventEmitter()
 @Output() public verificacarrinho: EventEmitter<any> = new EventEmitter<any>()
 @Output() public mostraCarrinho: EventEmitter<any> = new EventEmitter<any>()

  public estado:string = 'criado'
  public add:string = 'criado'
  public itemCarrinho: any =[]
  public email:string
  public publicacoes: any
  public valoroferta: number
  constructor(private bd: Bd,
             public router: Router,
             public autenticacao: Autenticacao,
             public carrinhoService: CarrinhoService) { }


  ngOnInit() {
    this.atualizarTimeLIne()
    this.itemCarrinho = this.carrinhoService.exibirItens()
   
  }

  public mostrarCarrinho(): void{
    this.mostraCarrinho.emit()

  }

  public remover(item: ItemCarrinho):void{
    this.carrinhoService.removeritem(item)
    this.verificacarrinho.emit()

  }

  public mostrarOferta(oferta:any): void{
    this.mostraOferta.emit(oferta)
    this.carrinhoService.exibirItens()
  }

  
  
  public atualizarTimeLIne(): void{
    this.bd.consultaPublicacoes('')
    .then((publicacoes: any) =>{
      this.publicacoes = publicacoes
    })
  }

  public adicionarItemCarrinho(item: any): void{
    if(item.oferta != 0){
      this.valoroferta = item.oferta
    }else{
      this.valoroferta = item.valor
    }
  
    item.valor = this.valoroferta
  
    this.carrinhoService.incluirItem(item)
    this.carrinhoService.totalCarrinhoCompras()
    //console.log(this.carrinhoService.exibirItens())
    this.verificacarrinho.emit()
 

    //this.addok = chave === 'aceito' ? true : false
  }


    //console.log(this.itemCarrinho)


  

   
   // this.itemCarrinho = '../../../assets/itf/carrinhop.png'
  

   public festa(){

    window.location.href = "http://pastelpontocomfesta.epizy.com", "_blank";

  }

    


}
