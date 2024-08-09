import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Message } from "../models/message";

@Injectable()
export class MessageService{
    url:string


    constructor(private _http:HttpClient){
        this.url = GLOBAL.url
    }

    //Enviar Mensaje
    addMessage(message=''):Observable<any>{
        let params = JSON.stringify(message)
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.post(this.url+'/message/sendMessage', params, {headers})
    }

    //Listar los mensajes recividos
    getMessage(page=1):Observable<any>{
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.get(this.url+'/message/showMessageRecived?pagina='+page, {headers})
    } 

    //Listar los mensajes recividos
    listSendMessage(page=1):Observable<any>{
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.get(this.url+'/message/showMessagesSend?pagina='+page, {headers})
    } 


}