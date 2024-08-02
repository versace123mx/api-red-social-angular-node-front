import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  title:string;
  data:any = {}
  validatos:boolean
  url: string

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService
  ){
    this.title = 'NGSocial'
    this.validatos = false,
    this.url = GLOBAL.url
  }

  ngOnInit(){
    this.data = this._userService.getDataUSer()
    if(Object.keys(this.data).length){
      this.data
      this.validatos = true
    }
  }

  ngDoCheck(){
    this.data = this._userService.getDataUSer()
    if(Object.keys(this.data).length){
      this.data
      this.validatos = true
    }
  }

  logout(){
    localStorage.clear();
    this.validatos = false
    this._router.navigate(['/']);
  }

}
