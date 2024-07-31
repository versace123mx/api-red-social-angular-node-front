import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user'
import { UserService } from '../../services/user.service'

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    title:string;
    user:User
    status: String
    msg: String
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = "Identificate"
        this.user = new User("","","","","","role_user","",true,"")
        this.status = ''
        this.msg = ''
    }
    ngOnInit() {
        console.log("Componente cargado")
    }
    onSubmit(){
        this._userService.singup(this.user).subscribe({
            next: (response) => {
                this.status = response.status

                //Persistir datos del usuario
                localStorage.setItem('data',JSON.stringify(response.data))

                this._router.navigate(['/'])//Cuando el usuario se logue lo redireccionamos al home
            },
            error: (error) => {
                this.status = error.error.status
                this.msg = error.error.msg
            },
            complete: () => {
                console.log('Request completed');
            }
        })
    }
}
