import { Injectable } from '@angular/core';
import {AppUserModel} from "../models/appUser.model";
//import { error } from '@angular/compiler-cli/src/transformers/util';
import {of, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users :AppUserModel[]=[]
  authenticateUser:AppUserModel|undefined
  constructor() {

    this.users.push({id:1,username:"user1", password:"1234", roles:["USER"]},
                    {id:2,username:"user2", password:"1234", roles:["USER"]},
                     {id:3,username:"admin", password:"1234", roles:["USER","ADMIN"]}

    )
  }

  public login(username:string, password:string){
    let appUser = this.users.find(u=>u.username=username)
    if(!appUser) return  throwError(()=>new Error("Bad credentials"))
    if(appUser.password!=password){
        return throwError(()=>new Error("Bad credentials password"))

    }
    return of(appUser)
  }

  public authenticateUsers (appUser :AppUserModel){
    this.authenticateUser=appUser;
    localStorage.setItem("authUser" , JSON.stringify({username: appUser.username,password:appUser.password,roles:appUser.roles, jwt:"JWT-TOKEN"}))
    return of(true)
  }

  public hasRoles(role:string):boolean{
    return this.authenticateUser!.roles.includes(role);
  }

  public IsAuthenticate(){
    return this.authenticateUser!=undefined
  }

  public  Logout(){
    this.authenticateUser=undefined
    localStorage.removeItem("authUser")
    return of(true)
  }
}


