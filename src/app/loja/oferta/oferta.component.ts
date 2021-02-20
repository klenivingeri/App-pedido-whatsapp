import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { CarrinhoService } from '../../carrinho.service'
import { ActivatedRoute } from '@angular/router'
import { ItemCarrinho } from '../../shared/item-carrinho.model'
@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  animations:[
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, }),
        animate('500ms 0s ease-in-out')// duração, delay e aceleração
      ])

    ]), trigger('animacao-carrinho', [
      state('criado', style({
        opacity: 1 //estado final, original da div
      })),
      transition('void => criado', [
        style({ opacity: 1, transform: 'translate(-150px, 0)' }),
        animate('750ms 0s ease-in-out', keyframes([
          style({ offset: 0.40, opacity:1, transform:'translateX(0)'}),

          style({ offset: 0.60, opacity:1, transform:'translateX(10px)',}),
          style({ offset: 0.82, opacity:1, transform:'rotate(15deg)'}),
          style({ offset: 0.84, opacity:1, transform:'rotate(-10deg)'}),
          style({ offset: 0.86, opacity:1, transform:'translateY(5px)'}),
          style({ offset: 0.88, opacity:1, transform:'rotate(0deg)'}),

          style({ offset: 1, opacity:1, transform:'translateX(0)'})

        ]))// duração, delay e aceleração
      ])

    ])
  ]

})

export class OfertaComponent implements OnInit {
  @Output() public mostrarCarrinho: EventEmitter<any> = new EventEmitter<any>()
  @Output() public verificacarrinho: EventEmitter<any> = new EventEmitter<any>()
  @Input() public mostraoferta: any
  public estado:string = 'criado'
  public valoroferta : number

  public addok : boolean = false //troca o botão
  public chaveValor :boolean = false
  constructor(public carrinhoService: CarrinhoService, public route: ActivatedRoute) { }

  ngOnInit() {

  // console.log(this.mostraoferta)
  }
  ngOnChanges(){
    console.log(this.mostraoferta)
    if(this.mostraoferta.oferta != 0){
      this.valoroferta = this.mostraoferta.oferta
    }else{
      this.valoroferta = this.mostraoferta.valor
    }
  }



  public sair():void{
    if(this.addok == true){
      this.addok = false
    }
  }

  public adicionar():void{
    this.mostraoferta.quantidade += 1

  
  }
  
  public remover():void{
    
    this.mostraoferta.quantidade -= 1
    if(this.mostraoferta.quantidade === 0){
      this.mostraoferta.quantidade =1

  
    }
  }





  public mostraCarrinho():void{
    this.mostrarCarrinho.emit()
   }
  
   public adicionarItemCarrinho(item: any): void{
    item.valor = this.valoroferta
    console.log(item)
    this.carrinhoService.incluirItem(item)
    this.carrinhoService.totalCarrinhoCompras()
    //console.log(this.carrinhoService.exibirItens())
    this.verificacarrinho.emit()
    if(this.addok == false){
      this.addok = true
    }
    //this.addok = chave === 'aceito' ? true : false
  }
  

}
