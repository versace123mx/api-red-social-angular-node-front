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
    follows:any

    followin:number
    followers:number
    publications:number
    mesiguen:any

    follow:boolean
    iduserLogins:string

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

    getCounters(id:string){
        this._userService.getCounter(id).subscribe(
            response => {
                this.status = 'success'
                //console.log(response.data)
                this.followin = response.data[0].follow
                this.followers = response.data[0].followme
                this.publications = response.data[0].publication
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
                console.log(response)
            },
            error => {
                this.status = 'error'
                console.log(error)
            }

        )
    }

    followUser(id:string){

    }
    unfollowUser(id:string){

    }
}