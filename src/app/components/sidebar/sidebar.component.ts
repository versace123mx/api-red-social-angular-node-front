import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";
import { UserService } from "../../services/user.service";
import { GLOBAL } from "../../services/global";
import { User } from "../../models/user";
import { Publication } from "../../models/publication";
import { PublicationService } from "../../services/publication.service";
@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService, PublicationService]
})
export class SidebarComponent implements OnInit {
    public url: string
    public user: any
    public stats: { follow: number, followme: number, publication: number };
    public title: string
    public publication: Publication
    public status: string
    public msg: string
    constructor(private _userService: UserService, private _publicationService: PublicationService) {
        this.url = GLOBAL.url;
        this.user = this._userService.getDataUSer()
        this.stats = this._userService.getStats()
        this.title = 'Hola mundo'
        this.publication = new Publication('', '')
        this.status = ''
        this.msg = ''
    }

    ngOnInit() {
        console.log('Componente side bar cargado')
    }

    ngDoCheck() {
        this.stats = this._userService.getStats();
    }

    onSubmit(form: any) {
        console.log(this.publication)
        this._publicationService.addPublication(this.publication).subscribe(
            response => {
                this.status = 'success'
                console.log(response)
                this.msg = response.msg

                //Obtenemos los datos del localstorage actual
                let datosPublication = JSON.parse(localStorage.getItem('stats') ?? '{}')
                //realizamos la modificaciones pertinentes
                datosPublication.publication = Number(datosPublication.publication)+1
                localStorage.setItem('stats', JSON.stringify(datosPublication))


                form.reset();
            },
            error => {
                this.status = 'error'
                console.log(error)
            }

        )
    }

    @Output() sended = new EventEmitter();
    sendPublication(){
        this.sended.emit()
    }
}