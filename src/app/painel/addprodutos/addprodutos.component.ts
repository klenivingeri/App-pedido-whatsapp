import { Injectable} from '@angular/core'
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Progresso } from '../../progresso.service'

import *  as firebase from 'firebase'
import { Bd } from '../../bg.service'

import { Observable } from 'rxjs/Observable' 
import { Subject } from 'rxjs/Subject'
import 'rxjs/RX'  // para utilizar o interval
@Component({
  selector: 'app-addprodutos',
  templateUrl: './addprodutos.component.html',
  styleUrls: ['./addprodutos.component.css']
})

@Injectable()
export class AddprodutosComponent implements OnInit {
  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()
  public email:string
  private imagem: any
  public valor: string = null
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null ,[Validators.required]),
    'descricao': new FormControl(null,[Validators.required]),
    'modelo': new FormControl(null,[Validators.required]),
    'valor': new FormControl(null,[Validators.required]),
    'img': new FormControl(null,[Validators.required]),
    'oferta': new FormControl(null,[Validators.required])
  })
  constructor( private bd: Bd, public progresso: Progresso
      ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{ // com base no token que armazenamos
      this.email = user.email // recupera o email do usuario simples assim
    })
  }



    public cadastrarProduto(): void{
      console.log(this.formulario.value)

  if( this.formulario.get('nome').valid &&
      this.formulario.get('descricao').valid &&
      this.formulario.get('modelo').valid &&
      this.formulario.get('valor').valid &&
      this.formulario.get('img').touched){
        
        if(this.formulario.value.oferta == null || this.formulario.value.oferta == 0 ){
          this.formulario.value.oferta = 0
        }
            

      this.formulario.value.img = this.imagem[0]
        let troca = this.formulario.value.valor.replace(",",".")
        

          

        this.bd.publicar({
          email: this.email,
          titulo: this.formulario.value.nome,
          modelo: this.formulario.value.modelo,
          valor: troca,
          descricao: this.formulario.value.descricao,
          img: this.formulario.value.img,
          quantidade: 1,
          oferta: this.formulario.value.oferta
        })

        let acompanhamentoUplod = Observable.interval(1500)
        let continua =  new Subject() // passar valores para Observable
        continua.next(true)
        acompanhamentoUplod
        .takeUntil(continua)// enquanto for true faça, se for false pare
        .subscribe(() => {

          console.log( this.progressoPublicacao)
          this.progressoPublicacao =  'andamento'
          this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100)
          if(this.progresso.status === 'concluido'){
            this.progressoPublicacao =  'concluido'
            //emitir um evento do componente parent(home)
            console.log( this.progressoPublicacao)
            this.atualizarTimeLine.emit()
            continua.next(false)
            this.progresso.status = null
            setTimeout(() => { this.reseta()   }, 500);
          }
      }) 
    }    else{
      // console.log('formulario esta INVALIDO')
      this.formulario.get('nome').markAsTouched()
      this.formulario.get('modelo').markAsTouched()
      this.formulario.get('valor').markAsTouched()
      this.formulario.get('descricao').markAsTouched()
      this.formulario.get('img').markAsTouched()  
      this.formulario.get('oferta').markAsTouched() 
      }
    
    
  }
  public preparaImagemUpload(event: Event): void{ 
    this.imagem = (<HTMLInputElement>event.target).files //1
  }

  public reseta(): void{
    this.progressoPublicacao = 'pendente'
    this.valor = null
  }

}

