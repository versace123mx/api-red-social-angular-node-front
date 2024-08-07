import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user'
import { UserService } from '../../services/user.service'
import { Follow } from "../../models/follow";
import { FollowService } from '../../services/follow.service'
import { GLOBAL } from "../../services/global";

@Component({
    selector:'profile',
    templateUrl:'./profile.component.html',
    providers:[UserService, FollowService]
    
})
export class ProfileComponent implements OnInit{
    
    title: string
    url: string
    user:any
    stats: string
    status:string
    msg:string
    identity: string
    userProfile:any
    total:number
    pages:number
    users:Array<any>
    follows:Array<any>

    followin:number
    followers:number
    publications:number
    mesiguen:any

    follow:boolean
    iduserLogins:string
    userReviewfollowers:number

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private __followService: FollowService
    ){
        this.title = 'Profile'
        this.url = GLOBAL.url
        this.user = this._userService.getDataUSer()
        this.stats = this._userService.getStats()
        this.status = ''
        this.msg = ''
        this.identity = ''
        this.userProfile = {}
        this.total = 0
        this.pages = 0
        this.users = []
        this.follows = []
        this.followin = 0
        this.followers = 0
        this.publications = 0
        this.follow = false
        this.iduserLogins = ''
        this.mesiguen = []
        this.userReviewfollowers = 0

        //Esto se usua, por que si entras a Gente, luego ves el perfil de otra persona y luego quieres
        //entrar al perfil del user logueado este no recargaba sus publicaciones
        this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
    }

    ngOnInit(){
        console.log('profile.component cargado correctamente')
        this.loadPage()
    }
    
    loadPage(){
        this._route.params.subscribe(params => {
            let id = params['id']
            this.getUser(id)
            this.getCounters(id)
            this.getUserss()
        })
    }
    getUser(id:string){
        this._userService.getUser(id).subscribe(
            response => {
                this.status = 'success'
                this.msg = response.msg
                this.userProfile = response.data //datos en un arreglo de objetos de todos los usuarios exceto el logueado
                console.log(this.userProfile)
            },
            error => {
                this.status = 'error'
                this._router.navigate(['/profile/',this.user.id])
            }

        )
    }

    //aqui tengo que mandar el storage del usuario que se esta revisando el perfil
    getCounters(id:string){
        this._userService.getCounter(id).subscribe(
            response => {
                this.status = 'success'
                localStorage.setItem('statsUserReview',JSON.stringify(response.data[0]))
                const datosUserReview = JSON.parse(localStorage.getItem('statsUserReview') ?? '{}')
                console.log(datosUserReview)
                this.followin = datosUserReview.follow
                this.followers = datosUserReview.followme //cuando lo sigo
                this.publications = datosUserReview.publication
            },
            error => {
                this.status = 'error'
                console.log(error)
            }

        )
    }

    getUserss(){
        this._userService.getUsers(1).subscribe(
            response => {
                this.status = 'success'
                const datosUserIdLogin = JSON.parse(localStorage.getItem('data') ?? '{}')
                this.iduserLogins = datosUserIdLogin.id
                this.follows = response.follows //areglo con los id de los usuarios que siguen al usuario logueado  
                this.mesiguen = response.followers          
                //console.log(this.follows)
            },
            error => {
                this.status = 'error'
                console.log(error)
            }

        )
    }

    followUser(idUserSeguir:string){

        this.__followService.addFollow(idUserSeguir).subscribe(
            response => {
                //Obtenemos los datos del localstorage actual
                let datosUser = JSON.parse(localStorage.getItem('statsUserReview') ?? '{}')
                //realizamos la modificaciones pertinentes
                datosUser.followme = Number(datosUser.followme)+1
                localStorage.setItem('statsUserReview',JSON.stringify(datosUser))

                datosUser = JSON.parse(localStorage.getItem('statsUserReview') ?? '{}')
                this.followers = datosUser.followme
                this.follows.push(idUserSeguir)
                this.status = response.status


                //Modificar el followin original del usuario logueado
                datosUser = JSON.parse(localStorage.getItem('stats') ?? '{}')
                datosUser.follow = Number(datosUser.follow)+1
                localStorage.setItem('stats',JSON.stringify(datosUser))
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
                let datosUser = JSON.parse(localStorage.getItem('statsUserReview') ?? '{}')
                //realizamos la modificaciones pertinentes
                datosUser.followme = Number(datosUser.followme)-1
                localStorage.setItem('statsUserReview',JSON.stringify(datosUser))

                //quitamos el follow de la parte visual del usuario que se busco
                datosUser = JSON.parse(localStorage.getItem('statsUserReview') ?? '{}')
                this.followers = datosUser.followme

                //eliminar del arreglo de follows
                const siguiendo = this.follows.filter(e => e != idUserUnFollow);
                this.follows = siguiendo


                //Modificar el followin original del usuario logueado
                datosUser = JSON.parse(localStorage.getItem('stats') ?? '{}')
                datosUser.follow = Number(datosUser.follow)-1
                localStorage.setItem('stats',JSON.stringify(datosUser))

            },
            error => {
                console.log(error)
                this.status = 'error'
            }

        )
    }
}