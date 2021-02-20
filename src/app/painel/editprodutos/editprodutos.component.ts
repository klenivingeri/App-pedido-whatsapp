import { Injectable} from '@angular/core'
import { Component, OnInit, EventEmitter, Output,Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Progresso } from '../../progresso.service'

import *  as firebase from 'firebase'
import { Bd } from '../../bg.service'

import { Observable } from 'rxjs/Observable' 
import { Subject } from 'rxjs/Subject'
import 'rxjs/RX'  // para utilizar o interval

@Component({
  selector: 'app-editprodutos',
  templateUrl: './editprodutos.component.html',
  styleUrls: ['./editprodutos.component.css']
})
export class EditprodutosComponent implements OnInit {
  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()
  @Output() public mostraLista: EventEmitter<any>  = new EventEmitter()
  @Input() public editaProduto: any
  public email:string
  public uploadok: boolean = false
  private imagem: any
  public valor: string
  public nome: string 
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number
  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null),
    'descricao': new FormControl(null),
    'modelo': new FormControl(null),
    'valor': new FormControl(null),
    'img': new FormControl(null),
    'oferta': new FormControl(null),
  })
  constructor( private bd: Bd, public progresso: Progresso
    ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{ // com base no token que armazenamos
      this.email = user.email // recupera o email do usuario simples assim
      

  })
}




public mostrarLista():void{
    this.mostraLista.emit()
   
}

  public uploadProdutos(): void{

  

    if(!this.formulario.value.nome){
      this.formulario.value.nome = this.editaProduto.titulo
    }
    if(!this.formulario.value.modelo){
      this.formulario.value.modelo = this.editaProduto.modelo
    }
    if(!this.formulario.value.valor){
      this.formulario.value.valor = this.editaProduto.valor
    }
    if(!this.formulario.value.descricao){
      this.formulario.value.descricao = this.editaProduto.descricao
    }
    if(!this.formulario.value.nome){
      this.formulario.value.nome = this.editaProduto.titulo
    }

    let troca = this.formulario.value.valor.replace(",",".")
    let trocaoferta = this.formulario.value.oferta.replace(",",".")

    this.bd.upload({
      email: this.email,
      titulo: this.formulario.value.nome,
      modelo: this.formulario.value.modelo,
      valor: troca,
      descricao: this.formulario.value.descricao,
      key: this.editaProduto.key,
      quantidade: 1,
      img: this.imagem,
      oferta: trocaoferta
    })
    this.ok()

    
  }


  public preparaImagemUpload(event: Event): void{ 
   
    let img: any = (<HTMLInputElement>event.target).files //1
    if(img){
      this.imagem = img
      console.log('ok')
    }
    
  }

  public reseta(): void{
    this.progressoPublicacao = 'pendente'
    this.valor = null
  }

  public ok():void{
    this.uploadok = true
  }


}
