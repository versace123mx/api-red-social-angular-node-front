import { Component, OnInit } from "@angular/core"; 
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { GLOBAL } from "../../services/global";


@Component({
    selector:'users',
    templateUrl:'./users.component.html',
    providers:[UserService]
    
})
export class UsersComponent implements OnInit{

    title:string
    user:User
    page:number
    next_page:number
    prev_page:number
    status:string
    total:number
    pages:number
    users:Array<any>
    url: string

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
    ){
        this.title = 'Gente',
        this.user = this._userService.getDataUSer()
        this.page = 0
        this.next_page = 0
        this.prev_page = 0
        this.status = ''
        this.total = 0
        this.pages = 0
        this.users = []
        this.url = GLOBAL.url
    }

    ngOnInit() {
        console.log('users.component ha sido cargado')
        this.actualPage()
    }

    actualPage(){

        this._route.params.subscribe( params  => {

            this.page = +params['page']
            
            if(!this.page){

                this.page = 1
                this.next_page = this.page+1

            }else{
                this.next_page = this.page+1
                this.prev_page = this.page-1

                if(this.prev_page <= 0){
                    this.prev_page = 1
                }
            }

            //Devolver listado usuarios
            this.getUsers(this.page)


        })
    }

    getUsers(page=0){

        this._userService.getUsers(page).subscribe(
            response => {
                console.log(response)
                if(!response.data){
                    this.status = 'error'
                }else{
                    this.status = response.status
                    this.total = response.totalPaginas
                    this.pages = response.totalPaginas
                    this.users = response.data

                    if(page > this.total){
                        this._router.navigate(['/gente',1])
                    }
                }
            },
            error => {
                let errorMessage = <any>error
                console.log(errorMessage)

                if(errorMessage != null){
                    this.status = 'error'
                }
            }

        )
    }

}