import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../services/user.service";
import { GLOBAL } from "../../services/global";
import { User } from "../../models/user";
import { Publication } from "../../models/publication";
import { PublicationService } from "../../services/publication.service";
import { UploadService } from "../../services/upload.service";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [UserService, PublicationService,UploadService]
})
export class SidebarComponent implements OnInit {
    public url: string
    public user: any
    public stats: { follow: number, followme: number, publication: number };
    public title: string
    public publication: Publication
    public status: string
    public msg: string
    public filesToUpload: Array<File>;

    constructor(private _userService: UserService, 
                private _publicationService: PublicationService,
                private _uploadService: UploadService,
                private _router: Router) {
        this.url = GLOBAL.url;
        this.user = this._userService.getDataUSer()
        this.stats = this._userService.getStats()
        this.title = 'Hola mundo'
        this.publication = new Publication('', '')
        this.status = ''
        this.msg = ''
        this.filesToUpload = []
    }

    ngOnInit() {
        console.log('Componente side bar cargado')
    }

    ngDoCheck() {
        this.stats = this._userService.getStats();
    }

    onSubmit(form: any) {
        //console.log(this.publication)
        this._publicationService.addPublication(this.publication).subscribe(
            response => {
                this.status = 'success'
                //console.log(response)
                this.msg = response.msg

                //Obtenemos los datos del localstorage actual para obtener ul token
                let datosUser = JSON.parse(localStorage.getItem('data') ?? '{}')

                //Obtenemos los datos del localstorage actual
                let datosPublication = JSON.parse(localStorage.getItem('stats') ?? '{}')
                //realizamos la modificaciones pertinentes
                datosPublication.publication = Number(datosPublication.publication)+1
                localStorage.setItem('stats', JSON.stringify(datosPublication))

                //Verificamos si se ha cargado imagen para subirla de lo contrario no hacemos la peticion
                if(this.filesToUpload.length){
                    //Dice el victor que aqui tendria que ir la carga de la imagen
                    this._uploadService.makeFileRequest(this.url+'/publication/uploadfile/'+response.data.uid,this.filesToUpload,datosUser.token,'archivo')
                    .then((result:any) => {
                        //datosUser.imagen = result.data
                        //this.newImagen = result.data
                        //volvemos a actualiza el localstorga
                        //localStorage.setItem('data',JSON.stringify(datosUser))
                    })
                }
                
                form.reset();
                this._router.navigate(['/timeline'])

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

    fileChangeEvent(fileInput:any){
        //console.log(fileInput.target.files[0])
        this.filesToUpload = <Array<File>>fileInput.target.files;
        //console.log(this.filesToUpload)
    }
}