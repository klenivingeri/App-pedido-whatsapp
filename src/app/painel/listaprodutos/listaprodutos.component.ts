import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router'
import { Autenticacao } from  '../../autenticacao.service'
import { Bd } from  '../../bg.service'

@Component({
  selector: 'app-listaprodutos',
  templateUrl: './listaprodutos.component.html',
  styleUrls: ['./listaprodutos.component.css']
})
export class ListaprodutosComponent implements OnInit {
  public publicacoes: any
  public email:string
 @Output() public mostraEditar: EventEmitter<any>  = new EventEmitter()

  constructor(private bd: Bd, public router : Router, public autenticacao: Autenticacao, ) { }

  ngOnInit() {
    this.atualizarTimeLIne()
  }

 
  public mostrarEditar(produto: any):void{
    this.mostraEditar.emit(produto)
    
  }

  
  public atualizarTimeLIne(): void{
    this.bd.consultaPublicacoes(this.email)
    .then((publicacoes: any) =>{
      this.publicacoes = publicacoes
      //console.log(publicacoes)
    })
  }

  public excluirProduto(key:string):void{
    let ok = confirm("Deletar arquivo?");
    if(ok){
      this.bd.excluirProduto(key)
      this.atualizarTimeLIne()
    }

  }
}
