import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GLOBAL } from "../../services/global";
import { Publication } from "../../models/publication";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { UploadService } from "src/app/services/upload.service";
import { PublicationService } from "src/app/services/publication.service";

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    providers:[UserService,UploadService,PublicationService]
})
export class TimelineComponent implements OnInit{

    title:string
    url:string
    user:User
    page:number
    status:string
    total:number
    pages:number
    msg:string
    public stats: { follow: number, followme: number, publication: number };
    public publications:any
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService
    ){
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
    }

    ngOnInit(){
        console.log("componente timeline cargado correctamente")
        this.getPublications(this.page)
    }

    getPublications(page=0){
        this._publicationService.getPublications(page).subscribe(
            response => {
                console.log(response)
                if(!response.data){
                    this.status = 'error'
                }else{

                    this.status = response.status //estatus de la respuesta en este caso seria success
                    this.total = response.totalRegistros //total de paginas del paginado entregado desde el api
                    this.pages = response.totalPaginas //total de paginas del paginado entregado desde el api
                    this.publications = response.data//datos en un arreglo de objetos de todos los usuarios exceto el logueado
                    
                    if(page > this.pages){
                        this._router.navigate(['/home'])
                    }
                    /*
                    this.follows = response.follows//arreglo que tiene los id de los usuarios que ya sigo como usuario logueado
                    this.totalPage = Array.from({ length: this.total }, (_, i) => i + 1); // Genera un array para la paginacion numerada 1,2,3,4
                    */
                }
            },
            error => {
                let errorMessage = <any>error
                if(errorMessage != null){
                    this.status = 'error'
                    this.msg = error.error.msg
                }
            }
        )
    }


}