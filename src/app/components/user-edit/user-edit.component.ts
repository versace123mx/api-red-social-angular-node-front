import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    providers:[UserService]
})
export class UserEditComponent implements OnInit{
    public title;
    public user:User;
    public identity;
    public token;
    public status: string

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Actualizar mis datos'
        this.user = new User("","","","","","role_user","",true,""),
        this.identity = this.user,
        this.token = this._userService.getStats()
        this.status = ''
    }

    ngOnInit(){
        console.log(this.user)
        console.log('user-edit component se ha cargado')
    }
}