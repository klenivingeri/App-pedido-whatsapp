import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from '../autenticacao.service'
import { Bd } from '../bg.service'
import { Horario } from '../shared/horario.model'
import *  as firebase from 'firebase'


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  @ViewChild('publicacoes') public publicacoes: any
   public editaProduto: any
   public lista : boolean = true
   public abertura: any     = '00:00'
   public fechamento: any   = '00:00'
   public aberturaf: any    = '00:00'
   public fechamentof: any  = '00:00'
   public aberturad: any    = '00:00'
   public fechamentod: any  = '00:00'
   public hora: any
   public email:string
   public controlaform: any
   
  
  constructor(public autenticacao: Autenticacao, public bd: Bd) { }

  ngOnInit() {
    this.atualizarTime()
    firebase.auth().onAuthStateChanged((user)=>{ // com base no token que armazenamos
      this.email = user.email /* recupera o email do usuario simples assim*/    })

    
  }

  public mostraLista():void{
    this.lista = true
  
  }

  public mostraEditar(produto):void{
    this.editaProduto = produto
    this.lista = false

  }
  public atualizarTimeLine(): void{ //crio uma função
    this.publicacoes.atualizarTimeLIne()//que chama a função que esta dentro do path publicacoes
    
  }


  //Controla hora
  public Abertura(num: string):void{
    this.abertura = num
    console.log(this.abertura)
  }
  public Fechamento(num: string):void{
    this.fechamento = num
    console.log(this.fechamento)
  }
  public AberturaF(num: string):void{
    this.aberturaf = num
    console.log(this.aberturaf)
  }
  public FechamentoF(num: string):void{
    this.fechamentof = num
    console.log(this.fechamentof)
  }

  public AberturaD(num: string):void{
    this.aberturad = num
    console.log(this.aberturad)
  }
  public FechamentoD(num: string):void{
    this.fechamentod = num
    console.log(this.fechamentod)
  }
  
    public confirmaTime(){
      alert('Gravado')
    
      
      if(this.hora.length == 1){

        this.hora.map((hora:any) =>{
          if(this.abertura == '00:00'){
            this.abertura = hora.abre
          }
          if(this.fechamento == '00:00'){
            this.fechamento = hora.fechamento
          }
          if(this.aberturaf == '00:00'){
            this.aberturaf = hora.abref
          }
          if(this.fechamentof == '00:00'){
            this.fechamentof = hora.fechamentof
          }
          if(this.aberturad == '00:00'){
            this.aberturad = hora.abred
          }
          if(this.fechamentod == '00:00'){
            this.fechamentod = hora.fechamentod
          }
        })


        this.bd.uploadHr({
          email: this.email,
          key: this.hora[0].key,
          abre:this.abertura,
          fecha:this.fechamento,
          abref:this.aberturaf,
          fechaf:this.fechamentof,
          abred:this.aberturad,
          fechad:this.fechamentod
        })
        console.log('entrei')
      }else{
      this.bd.horario({
        email:this.email,
        abre:this.abertura,
        fecha:this.fechamento,
        abref:this.aberturaf,
        fechaf:this.fechamentof,
        abred:this.aberturad,
        fechad:this.fechamentod,})
      }
        
    }
  

    public atualizarTime(): void{
      this.bd.consultaHora(this.email)
      .then((hora: any) =>{
        this.hora = hora
       console.log(this.hora.length)
       
       
       this.hora.length == 0 ? this.controlaform = true : this.controlaform = false
      })
  


    }
}
