import { Component, OnInit, ViewChild} from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { Autenticacao }  from '../autenticacao.service'
import { Router } from '@angular/router'
import { CarrinhoService } from '../carrinho.service'
@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css'],
  animations:[
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, }),
        animate('500ms 300ms ease-in-out')// duração, delay e aceleração
      ])

    ]),
    trigger('animacao-carrinho', [
      state('criado', style({
        opacity: 1 //estado final, original da div
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-200px, 0)' }),
        animate('500ms 0s ease-in-out', keyframes([
          style({ offset: 0.40, opacity:1, transform:'translateX(0)'}),

          style({ offset: 0.60, opacity:1, transform:'translateX(5px)',}),
          style({ offset: 0.82, opacity:1, transform:'rotate(10deg)'}),
          style({ offset: 0.84, opacity:1, transform:'rotate(-5deg)'}),
          style({ offset: 0.86, opacity:1, transform:'translateY(5px)'}),
          style({ offset: 0.88, opacity:1, transform:'rotate(0deg)'}),

          style({ offset: 1, opacity:1, transform:'translateX(0)'})

        ]))// duração, delay e aceleração
      ])

    ]),
 

  ]

})
export class LojaComponent implements OnInit {
  @ViewChild('publicacoes') public publicacoes: any
  public mostraoferta: any
  public carrinhototal: number

  //Controladores
  public carrinhoVazio: boolean = true
  public estado:string = 'criado'
  public carrinhoanime = 'visivel'
  public trocaPagina: boolean = false
  public mostraLogo: number = 1
  public mostrarCarrinho: boolean = true 


  constructor(public autenticacao: Autenticacao, public router:Router, public carrinhoService: CarrinhoService) {
    setTimeout(()=>{   this.mostraLogo = 0;
    }, 2500);
   }

  ngOnInit() {
    
  }
 
  public logar(): void{
    this.router.navigate(['/acesso'])
  }
  public atualizarTimeLine(): void{ //crio uma dunção
    this.publicacoes.atualizarTimeLIne()//que chama a função que esta dentro do path publicacoes
  }


  public mostraCarrinho():void{
     this.mostrarCarrinho = false
     
  }
  public voltaCarrinho(mostrarCarrinho): void{
    this.mostrarCarrinho = true
    }

  public mostrarOferta(mostraoferta): void{
    this.mostraoferta = mostraoferta
    this.trocaPagina =  true
    this.verificacarrinho()
   }
  public mostrarLista():void{
    this.trocaPagina =  true
    this.verificacarrinho()
  }




  public verificacarrinho():void{
    this.carrinhototal = this.carrinhoService.exibirItens().length === 0 ? null :  this.carrinhoService.exibirItens().length 
    this.carrinhoanime = this.carrinhoanime === 'visivel' ? 'escondido': 'visivel'

  }



}
