import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user'
import { UserService } from '../../services/user.service'

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService]
})
export class RegisterComponent implements OnInit {
    title:string;
    user:User;
    nombre: string;
    msg:string
    status: string
    errores: Array<any>

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = "Registrate"
        this.nombre = "Gustavo"
        this.user = new User("","","","","","role_user","",true,"")
        this.msg = ''
        this.status = ''
        this.errores = []
    }
    ngOnInit() {
        console.log("Componente de register")
    }

    onSubmit(registerForm:any){
        this._userService.register(this.user).subscribe({
            next: (response) => {
                this.msg = response.msg
                this.status = response.status
                registerForm.reset()
            },
            error: (error) => {
                if(error.error.status){
                    this.msg = error.error.msg
                    this.status = error.error.status    
                }else{
                    this.errores = error.error.errors
                }
            },
            complete: () => {
                console.log('Request completed');
            }
        })
    }
}
