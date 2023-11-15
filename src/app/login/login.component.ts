
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit{

  LoginFormGroup!: FormGroup;
  errorMessage!:string

  constructor(private  fb:FormBuilder,private loginService:LoginService,private router:Router) {
  }
  ngOnInit(): void {
    this.LoginFormGroup=this.fb.group({
      username: this.fb.control(""),
      password:this.fb.control(""),
    })

  }

  HandleLogin() {
    let username = this.LoginFormGroup.value.username
    let password =this.LoginFormGroup.value.password
    this.loginService.login(username,password).subscribe({
      next :(appUser)=>{
        this.loginService.authenticateUsers(appUser).subscribe({
          next:(data)=>{
            this.router.navigateByUrl("/admin");
          }
        });

      },
      error : (err)=>{
        this.errorMessage=err

    }
    })


  }
}
