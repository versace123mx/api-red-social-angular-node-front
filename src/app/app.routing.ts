import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Importamos los componentes
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { HomeComponent } from './components/home/home.component'
import { UserEditComponent } from './components/user-edit/user-edit.component'
import { UsersComponent } from './components/users/users.component'; 
import { TimelineComponent } from './components/timeline/timeline.component'
import { ProfileComponent } from './components/profile/profile.component'
import { PublicationsComponent } from './components/publications/publications.component'
import { FollowingComponent } from './components/following/following.component'

const appRoutes: Routes = [
    {path:'', component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'registro', component:RegisterComponent},
    {path:'mis-datos', component:UserEditComponent},
    {path:'gente', component:UsersComponent},
    {path:'gente/:page', component:UsersComponent},
    {path:'timeline', component:TimelineComponent},
    {path:'profile/:id', component:ProfileComponent},
    {path:'publications-user/:id', component:PublicationsComponent},
    {path:'siguiendo/:id/:page', component:FollowingComponent},
    {path:'**', component:HomeComponent},
]

export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)