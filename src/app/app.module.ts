import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing'

//Modulo custom
import { MessagesModule } from './messages/messages.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { HomeComponent } from './components/home/home.component'
import { UserEditComponent } from './components/user-edit/user-edit.component'
import { UsersComponent } from './components/users/users.component'; 
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { TimelineComponent } from './components/timeline/timeline.component'
import { DateFormatPipe } from './date-format.pipe'
import { ProfileComponent } from './components/profile/profile.component'
import { PublicationsComponent } from './components/publications/publications.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FollowingComponent } from './components/following/following.component'
import { FollowedComponent } from './components/followed/followed.component'

//Servicios
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    DateFormatPipe,
    ProfileComponent,
    PublicationsComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule, // requerido por ngx-toastr
    ToastrModule.forRoot(),   // ToastrModule añadido a la configuración de root
    MessagesModule 
  ],
  providers: [
    appRoutingProviders,
    UserService,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
