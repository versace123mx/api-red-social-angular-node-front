import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { GLOBAL } from "../../services/global";
import { User } from "../../models/user";
import { Publication } from "../../models/publication";

@Component({
    selector:'sidebar',
    templateUrl: './sidebar.component.html',
    providers:[UserService]
})
export class SidebarComponent implements OnInit{
    public url: string
    public user:User
    public stats: { follow: number, followme: number, publication: number };
    public title:string
    public publication:Publication

    constructor(private _userService: UserService){
        this.url = GLOBAL.url;
        this.user = this._userService.getDataUSer()
        this.stats = this._userService.getStats()
        this.title = 'Hola mundo'
        this.publication = new Publication('','','')
    }

    ngOnInit(){
        console.log('Componente side bar cargado')
    }

    ngDoCheck(){
        this.stats = this._userService.getStats();
    }

    onSubmit(){
        console.log(this.publication)
    }
}