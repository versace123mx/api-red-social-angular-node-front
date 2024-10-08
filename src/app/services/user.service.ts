import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { GLOBAL } from "./global";

@Injectable()
export class UserService{
    public url:string;
    public user:string
    public stats:string

    constructor(public _http:HttpClient){
        this.url = GLOBAL.url
        this.user = ''
        this.stats = ''
    }

    register(user:User): Observable<any>{
        let params = JSON.stringify(user)
        let headers = new HttpHeaders().set('Content-Type','application/json')

        return this._http.post(this.url+'/user',params, {headers})
    }

    singup(user:User): Observable<any>{
        
        let params = JSON.stringify(user)
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url+'/login',params, {headers})

    }

    getDataUSer(){
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        if(data){
            return this.user = data
        }
    }

    getCounter(id:string): Observable<any>{
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.get(this.url+'/follow/followsCount?id='+id, {headers})
    }

    getStats(){
        let stats = JSON.parse(localStorage.getItem('stats') ?? '{}')
        //hayq ue ver que devuel stats con usuario que no tengan publicaciones o seguidores
        if (stats) {
            return this.stats = stats;
        }

    }

    updateUser(user:User):Observable<any>{
        const params = JSON.stringify(user)
        const data = JSON.parse(localStorage.getItem('data') ?? '{}')
        const headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.put(this.url+'/update',params, {headers})
    }

    getUsers(page=0):Observable<any>{
        
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.get(this.url+'/list?pagina='+page, {headers})
    }

    getUser(id=''):Observable<any>{
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.get(this.url+'/profile/'+id, {headers})
    }
}