import { Component, OnInit, DoCheck } from "@angular/core";

@Component({
    selector: 'sended',
    templateUrl: './sended.component.html'
})
export class SendedComponent implements OnInit{
    public title: string

    constructor(){
        this.title = 'Mensajes Enviados'
    }

    ngOnInit(): void {
        console.log('Componente Sended Cargado')
    }
}