import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user'

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    title:string;
    user:User;
    nombre: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = "Registrate"
        this.nombre = "Gustavo"
        this.user = new User("","","","","","","role_user","",true,"")
    }
    ngOnInit() {
        console.log("Componente de register")
    }
}
