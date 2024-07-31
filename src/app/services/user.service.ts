import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { GLOBAL } from "./global";

@Injectable()
export class UserService{
    public url:string;
    public token:string

    constructor(public _http:HttpClient){
        this.url = GLOBAL.url
        this.token = ''
    }

    register(user:User): Observable<any>{
        let params = JSON.stringify(user)
        let headers = new HttpHeaders().set('Content-Type','application/json')

        return this._http.post(this.url+'/user',params, {headers})
    }

    singup(user:User,token=false): Observable<any>{
        

        //esto al parecer no funcion apara nada y habria que quitarlo, hayq ue ver hasta donde lo deja el vistor
        if(token){
            user = Object.assign(user, {token});
            console.log(user)
        }

        let params = JSON.stringify(user)
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'/login',params, {headers})
    }

    getDataUSer(){
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        if(data){
            return this.token = data
        }
    }
}