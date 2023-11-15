import {CanActivate, Router} from '@angular/router';
import {LoginService} from "../services/login.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthicatedGuard implements CanActivate{

  constructor(
      private loginService: LoginService,
      private router: Router
  ) {}

  public canActivate():  boolean{

    let log = this.loginService.IsAuthenticate()
    if (log==false){
     this.router.navigateByUrl("/login")
      return false
    }else{
      return true

    }




  }

}
