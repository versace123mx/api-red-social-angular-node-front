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
    selector: 'add',
    templateUrl: './add.component.html',
    providers:[FollowService,MessageService,UserService]
})
export class AddComponent implements OnInit{
    public title: string
    public message: Message
    public follows:Array<any>
    user:any
    url: string
    status:string
    msg:string

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _followService: FollowService,
        private _messageService: MessageService,
        private _userService: UserService
    ){
        this.user = this._userService.getDataUSer()
        this.title = 'Enviar mensaje'
        this.message = new Message(this.user.id,'','',)
        this.follows = []
        this.url = GLOBAL.url
        this.status = ''
        this.msg = ''
    }

    ngOnInit(): void {
        console.log('Componente add cargado')
        this.getFollowersList()
    }

    onSubmit(form:any){
        console.log(this.message)
        this._messageService.addMessage(this.message).subscribe({
            next: (response) => {
                console.log(response)
                this.status = 'success'
                this.msg = 'Mensage enviado correctamente'
                form.reset()
            },
            error: (error) => {
                console.log(error);
                this.status = 'error'
                this.msg = 'Error al enviar el mensage'
            },
            complete: () => {
                console.log('Request completed - edit info');
            }
        }

    )
    }

    getFollowersList(){
        this._followService.getFollowersList().subscribe({
                next: (response) => {
                    console.log(response)
                    this.follows = response.data
                },
                error: (error) => {
                    console.log(error);
                    this.status = 'error'
                    this.msg = 'Error al enviar el mensage'
                },
                complete: () => {
                    console.log('Request completed - edit info');
                }
            }
        )
    }
}