import { Component, OnInit } from "@angular/core"; 
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { Follow } from "../../models/follow";
import { UserService } from "../../services/user.service";
import { FollowService } from '../../services/follow.service'
import { GLOBAL } from "../../services/global";



@Component({
    selector:'following',
    templateUrl:'./following.component.html',
    providers:[UserService, FollowService]
    
})
export class FollowingComponent implements OnInit{

    title:string
    user:any
    page:number
    next_page:number
    prev_page:number
    status:string
    total:number
    pages:number
    users:Array<any>
    url: string
    follows: Array<any>
    followers: Array<any>
    totalPage: Array<any>
    user_id:string
    totalRegistros:number
    totalRegistrosXPagina:number
    msg: string
    userIdRegistrado:string
    username:string

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private __followService: FollowService
    ){
        this.title = 'Following',
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
        this.followers = []
        this.totalPage = []
        this.user_id = ''
        this.totalRegistros = 0
        this.totalRegistrosXPagina = 0
        this.msg = ''
        this.userIdRegistrado = ''
        this.username = ''
    }

    ngOnInit() {
        console.log('following.component ha sido cargado')
        this.actualPage()
    }

    actualPage(){

        this._route.params.subscribe( params  => {

            this.page = +params['page']
            this.user_id = params['id']

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
            this.getFollows(this.user_id,this.page)


        })
    }

    getFollows(id:string,page=0){

        this.__followService.getFollowing(id,page).subscribe(
            response => {
                //console.log(response)
                if(!response.data){
                    this.status = 'error'
                }else{
                    this.status = response.status //estatus de la respuesta en este caso seria success
                    this.total = response.totalPaginas //total de paginas del paginado entregado desde el api
                    this.pages = response.totalPaginas //total de paginas del paginado entregado desde el api
                    this.users = response.data //datos en un arreglo de objetos de todos los usuarios exceto el logueado
                    this.follows = response.follows//arreglo que tiene los id de los usuarios que ya sigo como usuario logueado
                    this.followers = response.followers
                    this.totalPage = Array.from({ length: this.total }, (_, i) => i + 1); // Genera un array para la paginacion numerada 1,2,3,4
                    this.totalRegistros = response.totalRegistros //numero total de registros encontrados
                    this.totalRegistrosXPagina = response.numRegistrosMostrarXPagina //nemero de registros a mostrar por pagina
                    this.userIdRegistrado = this.user.id
                    this.username = response.nameUser[0].name + ' ' + response.nameUser[0].surname
                    //console.log(this.users)
                    //console.log(this.follows)
                    if(page > this.total){
                        this._router.navigate(['/siguiendo',1])
                    }
                }
            },
            error => {
                let errorMessage = error

                if(errorMessage != null){
                    this.status = 'error'
                    this.msg = error.error.msg
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