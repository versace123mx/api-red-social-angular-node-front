import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing'

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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
