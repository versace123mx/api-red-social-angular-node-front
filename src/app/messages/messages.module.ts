import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Rutas
import { MensagesRoutingModule } from './messages.routing';

//Componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';

//Servicios
import { UserService } from '../services/user.service';
import { UserGuard } from '../services/user.guard';

@NgModule({
    declarations: [
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MensagesRoutingModule
    ],
    providers: [
        UserService,
        UserGuard
    ],
    exports:[
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SendedComponent
    ]
})
export class MessagesModule { }
