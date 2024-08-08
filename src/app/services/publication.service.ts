import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Publication } from "../models/publication";
import { GLOBAL } from "./global";

@Injectable()
export class PublicationService{
    public url: string

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url
    }

    addPublication(publication:any):Observable<any>{
        
        let params = JSON.stringify(publication)
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.post(this.url+'/publication/create',params, {headers})
    }

    getPublications(page=0):Observable<any>{

        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.get(this.url+'/publication/show-publication-following?pagina='+page, {headers})
    }

    deletePublication(id:string){
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.delete(this.url+'/publication/delete-publication/'+id, {headers})
    }

    getPublicationsXUser(id='',page=1):Observable<any>{

        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.get(this.url+'/publication/show-publications/'+id+'?pagina='+page, {headers})
    }
}
