import { Component, OnInit, DoCheck } from "@angular/core";

@Component({
    selector: 'received',
    templateUrl: './received.component.html'
})
export class ReceivedComponent implements OnInit{
    public title: string

    constructor(){
        this.title = 'Mensajes Recividos'
    }

    ngOnInit(): void {
        console.log('Componente Received Cargado')
    }
}