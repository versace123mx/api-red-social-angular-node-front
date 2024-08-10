import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class UserGuard implements CanActivate{

    user: any

    constructor(
        private _router: Router,
        private _userService: UserService
    ) {
        this.user = this._userService.getDataUSer()
    }

    canActivate() {
        
        let identity = this.user
        if (identity && (identity.role == 'role_user' || identity.role == 'role_admin')) {
            return true
        } else {
            this._router.navigate(['/login'])
            return false
        }
    }

}