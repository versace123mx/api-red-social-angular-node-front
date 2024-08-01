import { Injectable } from "@angular/core";
import { GLOBAL } from "./global";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class UploadService{
    url: string

    constructor(public _http:HttpClient){
        this.url = GLOBAL.url
    }
    makeFileRequest(url:string,files:Array<File>,token:string, name:string){
        return new Promise((resolve, reject) => {
            let formData : any = new FormData();
            let xhr = new XMLHttpRequest()

            for(let i=0; i < files.length; i++){
                formData.append(name,files[i], files[i].name)
            }

            xhr.onreadystatechange = function () {
                if( xhr.readyState == 4 ){
                    if( xhr.status == 200){
                        resolve(JSON.parse(xhr.response))
                    }else{
                        reject(xhr.response)
                    }
                }
            }
            xhr.open('PUT',url,true);
            xhr.setRequestHeader('x-token',token);
            xhr.send(formData)
        })
    }
}