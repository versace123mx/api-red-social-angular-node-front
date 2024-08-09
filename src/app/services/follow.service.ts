import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Follow } from "../models/follow";
import { GLOBAL } from "./global";

@Injectable()
export class FollowService{
    public url: string

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url
    }

    addFollow(follow=''):Observable<any>{
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.post(this.url+'/follow/follow',{"idfolow":follow}, {headers})
        
    }

    unFollow(follow=''):Observable<any>{
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.delete(this.url+'/follow/unfollow/'+follow, {headers})
        
    }

    getFollowing(id = '',page = 0):Observable<any>{
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.get(this.url+'/follow/followin/'+id+'?pagina='+page, {headers})
    }

    getFollowed(id = '',page = 0):Observable<any>{
        let data = JSON.parse(localStorage.getItem('data') ?? '{}')
        let headers = new HttpHeaders().set('Content-Type','application/json')
                                        .set('x-token',data.token)
        return this._http.get(this.url+'/follow/followers/'+id+'?pagina='+page, {headers})
    }

}