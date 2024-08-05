import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GLOBAL } from "../../services/global";
import { Publication } from "../../models/publication";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { UploadService } from "src/app/services/upload.service";

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    providers:[UserService,UploadService]
})
export class TimelineComponent implements OnInit{

    title:string
    url:string
    user:User
    public stats: { follow: number, followme: number, publication: number };
    public publication:Publication

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = "Timeline"
        this.url = GLOBAL.url
        this.user = this._userService.getDataUSer()
        this.stats = this._userService.getStats()
        this.publication = new Publication('','')
    }

    ngOnInit(){
        console.log("componente timeline cargado correctamente")
    }

    onSubmit(){
        console.log(this.publication)
    }
}