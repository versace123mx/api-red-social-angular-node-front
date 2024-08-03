import { Component, OnInit } from "@angular/core"; 
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { Follow } from "../../models/follow";
import { UserService } from "../../services/user.service";
import { FollowService } from '../../services/follow.service'
import { GLOBAL } from "../../services/global";



@Component({
    selector:'users',
    templateUrl:'./users.component.html',
    providers:[UserService, FollowService]
    
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
    follows: Array<any>
    totalPage: Array<any>

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private __followService: FollowService
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
        this.follows = []
        this.totalPage = []
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
                    this.follows = response.follows
                    this.totalPage = Array.from({ length: this.total }, (_, i) => i + 1); // Genera un array del 1 al 10

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

    followUser(idUserSeguir:string){

        this.__followService.addFollow(idUserSeguir).subscribe(
            response => {
                //Obtenemos los datos del localstorage actual
                let datosUser = JSON.parse(localStorage.getItem('stats') ?? '{}')
                //realizamos la modificaciones pertinentes
                datosUser.follow = Number(datosUser.follow)+1
                localStorage.setItem('stats',JSON.stringify(datosUser))

                this.follows.push(response.data.followed)
                this.status = response.status
            },
            error => {
                console.log(error)
                this.status = 'error'
            }

        )
    }

    unfollowUser(idUserUnFollow:string){

        this.__followService.unFollow(idUserUnFollow).subscribe(
            response => {
                //Obtenemos los datos del localstorage actual
                const datosUser = JSON.parse(localStorage.getItem('stats') ?? '{}')
                //realizamos la modificaciones pertinentes
                datosUser.follow = Number(datosUser.follow)-1
                localStorage.setItem('stats',JSON.stringify(datosUser))

                //eliminar del arreglo de follows
                const siguiendo = this.follows.filter(e => e != idUserUnFollow);
                this.follows = siguiendo
            },
            error => {
                console.log(error)
                this.status = 'error'
            }

        )
    }

}