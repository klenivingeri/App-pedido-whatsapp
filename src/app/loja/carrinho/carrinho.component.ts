import { Injectable }  from '@angular/core'
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarrinhoService } from '../../carrinho.service'
import { ItemCarrinho } from '../../shared/item-carrinho.model'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Bd } from '../../bg.service'
declare function encodeURIComponent(uriComponent: any): string; 
@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})

export class CarrinhoComponent implements OnInit {
  @Output() public voltaCarrinho: EventEmitter<boolean> = new EventEmitter()
  @Output() public verificacarrinho: EventEmitter<any> = new EventEmitter<any>()
  public itensCarrinho: ItemCarrinho[] = [] 
  public itensDoCarrinho: string = ''
  public textowhatsap : string = ''
  public pagCarrinho = true
  public email: string
  public avisoDomingo: string
  public dadosJSONObj: any = ''
 

  //controle de horario
  public hora: any
  public fechado:boolean
  public abertura :string
  public fechamento :string
  public aberturaf :string
  public fechamentof :string
  public aberturad :string
  public fechamentod :string


  public formulario : FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]),
    'modalidade': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]),
    'retirada': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]),
    'bairro': new FormControl(null),
    'rua': new FormControl(null),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
    'troco': new FormControl(null, Validators.required),
    'trocoSN' : new FormControl(null,Validators.required),
    'complemento': new FormControl(null),
    'cep': new FormControl(null),
    'formaPagamento': new FormControl(null, Validators.required),
  })
  constructor(public carrinhoService: CarrinhoService, public bd: Bd) { }



  


  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
    this.atualizarTime()
    //console.log(this.itensCarrinho)

  }

// Localizar endereço CEP:
public getDadosEnderecoPorCEP(cep:any):void{
  let url = 'https://viacep.com.br/ws/'+cep+'/json/unicode/'

  let xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', url)

  xmlHttp.onreadystatechange = () =>{
    //Verifica se estamos pegando o dado no retorno 4, e se não ouve erros 200
    if( xmlHttp.readyState == 4  && xmlHttp.status == 200){
      
      let dadosJSONText = xmlHttp.responseText // retorna um texto
      this.dadosJSONObj = JSON.parse(dadosJSONText) //transforma em objeto 


    }
  }
  xmlHttp.send()
}

  public adicionarItemCarrinho(item:any):void{
   // console.log(item)
    //this.carrinhoService.incluirItem(item)
    //this.carrinhoService.totalCarrinhoCompras()
  }

  public adicionar(item: ItemCarrinho):void{
    this.carrinhoService.adicionarQuantidade(item)
  }
  
  public remover(item: ItemCarrinho):void{
    this.carrinhoService.removerQuantidade(item)
    this.verificacarrinho.emit()
  

  }

  public voltadocarrinho():void{
    this.voltaCarrinho.emit(true)
    
  }

  //Controle de formulario
  public imprimeItens(){

    this.itensCarrinho.map((item:ItemCarrinho) =>{
      this.itensDoCarrinho  += encodeURIComponent(` *${item.quantidade}* -  ${item.titulo} \n`)
    })
  

  }


  public trocaPag(){
    this.pagCarrinho = false
  }




  public whatsapEnvio(){
    let celular: number = 5516992194491;
    let texto: any = "Texto que eu vou enviar \n com quebras de \n texto.";
    window.location.href = "https://api.whatsapp.com/send?phone=" + celular + "&text=" + this.textowhatsap, "_blank";

  }


  // Se tentar em viar vai sinalizar ao usuario que esses campos ainda não foram preenchidos
  public confirmarCompra(): void {

    console.log(this.formulario)

    if(this.formulario.value.modalidade == 'Entregar pedido'){
      if( this.formulario.get('nome').valid &&
          this.formulario.get('modalidade').valid &&
          this.formulario.get('bairro').valid &&
          this.formulario.get('rua').valid &&
          this.formulario.get('numero').valid &&
          this.formulario.get('formaPagamento').valid){
            if(!this.formulario.value.complemento){
              this.formulario.value.complemento ='sem complemento'
              console.log(this.formulario.value.complemento)
            }
            if(this.formulario.value.cep && this.formulario.value.cep.length >= 8){
              
              this.formulario.value.rua = this.dadosJSONObj.logradouro
              this.formulario.value.bairro = this.dadosJSONObj.bairro
            }

              if(!this.formulario.value.trocoSN){
                  this.formulario.value.trocoSN = 'Não'
                }else{
                  this.formulario.value.trocoSN = this.formulario.value.troco
                }

                if( !this.formulario.value.bairro ||
                    this.formulario.value.bairro.length < 2 &&
                    !this.formulario.value.rua ||
                    this.formulario.value.rua.length < 2){
                      alert('Por favor verificar os campos Bairro: e Rua:')
                  }else{
                
                  this.imprimeItens()    
                  this.textowhatsap  += encodeURIComponent(`*Nova solicitação de pedido via site*\n-----------------------------------------------------\n*Nome: ${this.formulario.value.nome.trim()}*\n*Pagamento:* ${this.formulario.value.formaPagamento}\n-----------------------------------------------------\n*Lista de Pedidos:*\n`) + this.itensDoCarrinho + encodeURIComponent(`\n-----------------------------------------------------\n*${ this.formulario.value.modalidade}:*\n ${this.formulario.value.rua} *nº${this.formulario.value.numero}*\n *Bairro:* ${this.formulario.value.bairro}\n*Complemento:* ${this.formulario.value.complemento}\n*Vai precisar de troco:* ${this.formulario.value.trocoSN}\n-----------------------------------------------------\n*Valor Total:* ${(this.carrinhoService.totalCarrinhoCompras()+ 10.00).toFixed(2).replace(".",",")}\n `)
                  this.whatsapEnvio()
              
        }
      } 
    }else if(this.formulario.value.modalidade == 'Retirar pedido no local'){
      if( this.formulario.get('nome').valid  &&
          this.formulario.get('modalidade').valid  &&
          this.formulario.get('retirada').valid &&
          this.formulario.get('formaPagamento').valid){
            this.imprimeItens()  
            this.textowhatsap  += encodeURIComponent(`*Nova solicitação de pedido via site*\n-----------------------------------------------------\n*Nome: ${this.formulario.value.nome.trim()}*\n*Pagamento:* ${this.formulario.value.formaPagamento}\n-----------------------------------------------------\n*Lista de Pedidos:*\n`) + this.itensDoCarrinho + encodeURIComponent(`\n-----------------------------------------------------\n*${ this.formulario.value.modalidade}:*\n${this.formulario.value.retirada}\n-----------------------------------------------------\n*Valor Total:* ${this.carrinhoService.totalCarrinhoCompras().toFixed(2).replace(".",",")}\n`)
            this.whatsapEnvio()
        }
    }
/*
    else if(this.formulario.status === 'INVALID'){
    // console.log('formulario esta INVALIDO')
    this.formulario.get('nome').markAsTouched()
    this.formulario.get('modalidade').markAsTouched()
    this.formulario.get('retirada').markAsTouched()
    this.formulario.get('bairro').markAsTouched()
    this.formulario.get('rua').markAsTouched()
    this.formulario.get('numero').markAsTouched()
    this.formulario.get('troco').markAsTouched()
    this.formulario.get('trocoSN').markAsTouched()
    this.formulario.get('complemento').markAsTouched()
    this.formulario.get('formaPagamento').markAsTouched()      
    }

    */

    this.formulario.get('nome').markAsTouched()
    this.formulario.get('modalidade').markAsTouched()
    this.formulario.get('retirada').markAsTouched()
    this.formulario.get('bairro').markAsTouched()
    this.formulario.get('rua').markAsTouched()
    this.formulario.get('numero').markAsTouched()
    this.formulario.get('troco').markAsTouched()
    this.formulario.get('trocoSN').markAsTouched()
    this.formulario.get('complemento').markAsTouched()
    this.formulario.get('formaPagamento').markAsTouched()

  }

    
   
  public duvidas():void{

    let celular: number = 5516993140835;
    let texto: any = "Texto que eu vou enviar \n com quebras de \n texto.";
    window.location.href = "https://api.whatsapp.com/send?phone=" + celular + "&text=" + "Eu tenho uma duvida", "_blank";


  }

  public atualizarTime(): void{
    this.bd.consultaHora(this.email)
    .then((hora: any) =>{
      this.hora = hora
     console.log(this.hora.length)
     this.abertura = this.hora[0].abre
     this.fechamento = this.hora[0].fechamento
     this.aberturaf = this.hora[0].abref
     this.fechamentof = this.hora[0].fechamentof
     this.aberturad = this.hora[0].abred
     this.fechamentod = this.hora[0].fechamentod

     let s1 = parseInt(this.hora[0].abre.replace(":","").substring(1, 4))
     let s2 = parseInt(this.hora[0].fechamento.replace(":",""))
     let ss1 = this.hora[0].abref.replace(":","").substring(1, 4);
     let ss2 = this.hora[0].fechamentof.replace(":","")
     let sss1 = this.hora[0].abred.replace(":","").substring(1, 4);
     let sss2 = this.hora[0].fechamentod.replace(":","")


     var data = new Date();
     var diaSemana = parseInt(data.getDay().toString())
     var hr   = data.getHours().toString()         // 0-23
     var min  = data.getMinutes().toString()
      
     if(parseInt(min) <10){
       min = "0" + min
     }
     var hrAtual = parseFloat(hr+min)
     
     //controle de dia, e qual hora vai abrir e fechar o carinho de compras
     if(diaSemana >= 1 || diaSemana <= 5){
      console.log(min)
       console.log(hrAtual)
       if(hrAtual >= s1 && hrAtual <= s2 ){
      this.fechado = false
        }else{
          this.fechado = true
        }
     }else if(diaSemana == 6){
      if(hrAtual >= ss1 && hrAtual <= ss2 ){
        this.fechado = false
          }else{
            this.fechado = true
          }
     }else{
      if(hrAtual >= sss1 && hrAtual <= sss2 ){
        this.fechado = false
          }else{
            this.fechado = true
          }
     }
     
    })



  }

}
