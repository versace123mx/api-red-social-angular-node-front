import { Component, OnInit, DoCheck } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../../models/user";
import { Follow } from "../../../models/follow";
import { Message } from "../../../models/message";
import { UserService } from "../../../services/user.service";
import { FollowService } from '../../../services/follow.service'
import { MessageService } from "src/app/services/message.service";
import { GLOBAL } from "../../../services/global";


@Component({
    selector: 'sended',
    templateUrl: './sended.component.html',
    providers:[FollowService,MessageService]
})
export class SendedComponent implements OnInit{
    public title: string
    public message: Message
    public follows:Array<any>
    user:any
    url: string
    status:string
    msg:string
    messages:Array<any>
    page:number
    next_page:number
    prev_page:number
    total:number
    pages:number
    users:Array<any>
    totalPage: Array<any>
    userIdRegistrado:string
    totalRegistros:number
    totalRegistrosXPagina:number

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _followService: FollowService,
        private _messageService: MessageService,
        private _userService: UserService
    ){
        this.title = 'Mensajes Enviados'
        this.user = this._userService.getDataUSer()
        this.message = new Message(this.user.id,'','',)
        this.follows = []
        this.url = GLOBAL.url
        this.status = ''
        this.msg = ''
        this.messages = []
        this.page = 0
        this.next_page = 0
        this.prev_page = 0
        this.total = 0
        this.pages = 0
        this.users = []
        this.totalPage = []
        this.userIdRegistrado = ''
        this.totalRegistros = 0
        this.totalRegistrosXPagina = 0
    }

    ngOnInit(): void {
        console.log('Componente Sended Cargado')
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
            this.sendMessagesList(this.page)


        })
    }

    sendMessagesList(page=0){
        this._messageService.listSendMessage(page).subscribe({
            next: (response) =>{
                console.log(response)
                if(!response.data){
                    this.status = 'error'
                }else{
                    this.status = response.status //estatus de la respuesta en este caso seria success
                    this.total = response.totalPaginas //total de paginas del paginado entregado desde el api
                    this.pages = response.totalPaginas //total de paginas del paginado entregado desde el api
                    this.users = response.data //datos en un arreglo de objetos de todos los usuarios exceto el logueado
                    this.follows = response.follows//arreglo que tiene los id de los usuarios que ya sigo como usuario logueado
                    this.totalPage = Array.from({ length: this.total }, (_, i) => i + 1); // Genera un array para la paginacion numerada 1,2,3,4
                    this.userIdRegistrado = this.user.id
                    this.totalRegistrosXPagina = response.numRegistrosMostrarXPagina
                    this.totalRegistros = response.totalRegistros
                    $("html,body").animate({
                        scrollTop: 0
                    })

                    if(page > this.total){
                        this._router.navigate(['/gente',1])
                    }
                }
            },
            error: (error) => {
                let errorMessage = <any>error
                console.log(errorMessage)

                if(errorMessage != null){
                    this.status = 'error'
                }
            }
        })
    }
}