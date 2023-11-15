import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public  loginservice:LoginService, private route:Router) {
  }

  HandleLogout() {
    this.loginservice.Logout().subscribe({
          next: (data)=>{
            this.route.navigateByUrl("/login")

          }

    }
    )

  }
}
