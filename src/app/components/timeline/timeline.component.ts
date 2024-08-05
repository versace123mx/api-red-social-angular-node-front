import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GLOBAL } from "../../services/global";
import { Publication } from "../../models/publication";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { UploadService } from "src/app/services/upload.service";
import { PublicationService } from "src/app/services/publication.service";
import * as $ from 'jquery';

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    providers: [UserService, UploadService, PublicationService]
})
export class TimelineComponent implements OnInit {

    title: string
    url: string
    user: User
    page: number
    status: string
    total: number
    pages: number
    msg: string
    itemsPorPage: number
    noMore:boolean;
    public stats: { follow: number, followme: number, publication: number };
    public publications: any


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService
    ) {
        this.title = "Timeline"
        this.url = GLOBAL.url
        this.user = this._userService.getDataUSer()
        this.stats = this._userService.getStats()
        this.publications = []
        this.page = 1
        this.status = ''
        this.total = 0
        this.pages = 0
        this.msg = ''
        this.itemsPorPage = 0
        this.noMore = false;
    }

    ngOnInit() {
        console.log("componente timeline cargado correctamente")
        this.getPublications(this.page)
    }
/*
    ngDoCheck() {
        this.getPublications(this.page)
    }
*/

    getPublications(page = 0, adding = false) {
        this._publicationService.getPublications(page).subscribe(
            response => {
                console.log(response)
                if (!response.data) {
                    this.status = 'error'
                } else {

                    this.status = response.status //estatus de la respuesta en este caso seria success
                    this.total = response.totalRegistros //total de registros entregado desde el api
                    this.pages = response.totalPaginas //total de paginas del paginado entregado desde el api
                    this.itemsPorPage = response.numRegistrosMostrarXPagina // numero de registros entregados por pagina

                    if (!adding) {
                        this.publications = response.data//datos en un arreglo de objetos de todos los usuarios exceto el logueado
                    } else {
                        let arrayA = this.publications;
                        let arrayB = response.data
                        this.publications = arrayA.concat(arrayB);

                        $("html,body").animate({
                            scrollTop: $('body').prop('scrollHeight')
                        })
                    }
                }
            },
            error => {
                let errorMessage = <any>error
                if (errorMessage != null) {
                    this.status = 'error'
                    this.msg = error.error.msg
                }
            }
        )
    }

    viewMore() {
        this.page += 1;
        if (this.page == this.pages) {
            this.noMore = true;
        }
        this.getPublications(this.page, true);
    }

    refresh(event:any){
        this.getPublications(1)
    }
}