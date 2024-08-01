import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GLOBAL } from "../../services/global";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { UploadService } from "src/app/services/upload.service";

@Component({
    selector: 'user-edit',
    templateUrl: './user-edit.component.html',
    providers:[UserService,UploadService]
})
export class UserEditComponent implements OnInit{
    title;
    user:User;
    identity;
    token;
    status: string;
    msg:string;
    filesToUpload: Array<File>;
    url: string

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService
    ){
        this.title = 'Actualizar mis datos'
        this.user = this._userService.getDataUSer(),
        this.identity = this.user,
        this.token = this._userService.getStats()
        this.status = ''
        this.msg = ''
        this.filesToUpload = []
        this.url = GLOBAL.url
    }

    ngOnInit(){
        console.log(this.user)
        console.log('user-edit component se ha cargado')
    }

    onSubmit(userEditForm:any){
        this._userService.updateUser(this.user).subscribe({
            next: (response) => {

                //Obtenemos los datos del localstorage actual
                let datosUser = JSON.parse(localStorage.getItem('data') ?? '{}')

                //realizamos la modificaciones pertinentes
                datosUser.name = response.data.name
                datosUser.surname = response.data.surname

                this.msg = response.msg
                this.status = response.status
                //userEditForm.reset()

                //Dice el victor que aqui tendria que ir la carga de la imagen
                this._uploadService.makeFileRequest(this.url+'/update-image',this.filesToUpload,datosUser.token,'archivo')
                .then((result:any) => {
                    datosUser.imagen = result.data

                    //volvemos a actualiza el localstorga
                    localStorage.setItem('data',JSON.stringify(datosUser))
                })
            },
            error: (error) => {
                console.log(error);
                console.log(error.status);
                console.log(error.error.msg)
                
                if(error.status){
                    this.msg = error.error.msg
                    this.status = 'error'   
                }else if(error.error.msg){
                    this.msg = error.error.msg
                    this.status = 'error'
                }
            },
            complete: () => {
                console.log('Request completed - edit info');
            }
        })
    }

    
    
    fileChangeEvent(fileInput:any){
        //console.log(fileInput.target.files[0])
        this.filesToUpload = <Array<File>>fileInput.target.files;
        //console.log(this.filesToUpload)
    }
}