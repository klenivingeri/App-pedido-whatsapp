import { Injectable }  from '@angular/core'
import * as firebase from 'firebase'
import { on } from 'process'
import { resolve } from 'url'
import { Progresso } from './progresso.service'

@Injectable()
export class Bd{
    public carrinho: any = []
    constructor(private progresso: Progresso){ }

   /* public atualizar(publicacao: any): void{ // console.log(publicacao)
        firebase.database().ref(`Cadastro_produto/`)
            .push({ titulo: publicacao.titulo,
                modelo : publicacao.modelo,
                valor: publicacao.valor,
                descricao: publicacao.descricao,
                quantidade: publicacao.quantidade,
                })         
                
                .then((resposta:any)  =>{
                    let nomeImagem = resposta.key
    
                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.img)// put é um verbo http
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,//ele escuta o carregamento da imagem
                        (snapshot: any)=>{ // serve como um observable
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot //console.log(snapshot)// acompanhamento do progresso de upload
                        },
                        (error) =>{
                            this.progresso.status =  'erro'
                            this.progresso.estado = error
                            console.log(error)
                        },
                        () =>{
                            this.progresso.status = 'concluido'//finalização do processo  
                        }
                    ) 
                })     
    }

*/
    public publicar(publicacao: any): void{ // console.log(publicacao)
        firebase.database().ref(`Cadastro_produto`)
            .push({ titulo: publicacao.titulo,
                modelo : publicacao.modelo,
                valor: publicacao.valor,
                descricao: publicacao.descricao,
                quantidade: publicacao.quantidade,
                oferta: publicacao.oferta
                })         
                .then((resposta:any)  =>{
                    let nomeImagem = resposta.key

    
                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.img)// put é um verbo http
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,//ele escuta o carregamento da imagem
                        (snapshot: any)=>{ // serve como um observable
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot //console.log(snapshot)// acompanhamento do progresso de upload
                        },
                        (error) =>{
                            this.progresso.status =  'erro'
                            this.progresso.estado = error
                            console.log(error)
                        },
                        () =>{
                            this.progresso.status = 'concluido'//finalização do processo  
                        }
                    ) 
                })     
    }

//recuperado os dados do e-mail logado
public consultaPublicacoes(emaiUsuario: string): Promise<any>{
        
    return new Promise((resolve, reject) =>{

        //Consulta as publicações (database)
        firebase.database().ref(`Cadastro_produto/`)
        .orderByKey()
        .once('value')
        .then((snapshot: any ) =>{
           //console.log(snapshot.val()) // email

            let publicacoes: Array<any> = []

            // Ordenando o Array
            //a cada nova interação ele guardar um valor no Array publicacoes acima
            snapshot.forEach((childSnapshot: any) =>{ // forEach devolve as publicacoes do usuario
                let publicacao = childSnapshot.val()
                publicacao.key = childSnapshot.key
                publicacoes.push(publicacao) 
            })
            
            //resolve(publicacoes)
            return publicacoes.reverse() //nativo de array js, e esse simplesmente inferte a ordem
        })
        .then(( publicacoes) =>{
            
            publicacoes.forEach((publicacao) => {
                //console.log(publicacao.key)
                
                // consultar a url da imagem (storage)
                firebase.storage().ref()
                .child(`imagens/${publicacao.key}`) // dentro da path imagens pega os links
                .getDownloadURL() // faz o download
                .then((url: string) =>{ //executa o codigo abaixo
                    publicacao.url_imagem = url 
                    //console.log(publicacao.url_imagem)
                
                        //consultar nome
                        
                })
            })
            resolve(publicacoes)
        })
    })    
}

    public excluirProduto(key:string): Promise<any>{

        alert(`O arquivo:${key} foi deletado`);
        return new Promise((resolve, reject) =>{
        firebase.database().ref(`Cadastro_produto/${key}`).remove()
        .then((reposta:any) =>{
            firebase.storage().ref().child(`imagens/${key}`).delete()

            resolve(key)
        })
        .catch((erro: Error)=>{})
    }) 
        
    }

    public upload(publicacao: any): void{ // console.log(publicacao)
        firebase.database().ref(`Cadastro_produto/${publicacao.key}`).update({
            descricao: publicacao.descricao,
            modelo: publicacao.modelo,
            quantidade: publicacao.quantidade,
            titulo: publicacao.titulo,
            valor: publicacao.valor,
            oferta: publicacao.oferta
        })

    }



    // Controle do relogio ----------------------------------------------------------------
    public horario(horario: any){
        firebase.database().ref(`horario_funcionamento`)
            .push({ abre: horario.abre,
                    fechamento: horario.fecha,
                    abref: horario.abref,
                    fechamentof: horario.fechaf,
                    abred: horario.abred,
                    fechamentod: horario.fechad,
                })
    }

    public uploadHr(hora: any): void{ // console.log(publicacao)
        firebase.database().ref(`horario_funcionamento/${hora.key}`).update({
                    abre: hora.abre,
                    fechamento: hora.fecha,
                    abref: hora.abref,
                    fechamentof: hora.fechaf,
                    abred: hora.abred,
                    fechamentod: hora.fechad,
        })

    }


    public consultaHora(emaiUsuario: string): Promise<any>{
    return new Promise((resolve, reject) =>{

        //Consulta as publicações (database)
        firebase.database().ref(`horario_funcionamento/`)
        .orderByKey()
        .once('value')
        .then((snapshot: any ) =>{
           //console.log(snapshot.val()) // email

            let horas: Array<any> = []

            // Ordenando o Array
            //a cada nova interação ele guardar um valor no Array publicacoes acima
            snapshot.forEach((childSnapshot: any) =>{ // forEach devolve as publicacoes do usuario
                let hora = childSnapshot.val()
                hora.key = childSnapshot.key
                horas.push(hora) 
            })
            
            //resolve(publicacoes)
            return horas.reverse() //nativo de array js, e esse simplesmente inferte a ordem
        })
        .then(( horas) =>{
            resolve(horas)
        })
    })    
    
    }



    //pega o item de oferta
    public pegaOferta(key: string): Promise<any>{
        return new Promise((resolve, reject) =>{
    
            //Consulta as publicações (database)
            firebase.database().ref(`Cadastro_produto/`)
            .orderByKey()
            .once('value')
            .then((snapshot: any ) =>{
               //console.log(snapshot.val()) // email
    
                let horas: Array<any> = []
    
                // Ordenando o Array
                //a cada nova interação ele guardar um valor no Array publicacoes acima
                snapshot.forEach((childSnapshot: any) =>{ // forEach devolve as publicacoes do usuario
                    let hora = childSnapshot.val()
                    hora.key = childSnapshot.key
                    horas.push(hora) 
                })
                
                //resolve(publicacoes)
                return horas.reverse() //nativo de array js, e esse simplesmente inferte a ordem
            })
            .then(( horas) =>{
                resolve(horas)
            })
        })    
        
        }

}














/*

once : tira uma foto do status atual
on : fica olhando sem parar

push : colocas todos os arquivos dentro de um mesmo path 
*/