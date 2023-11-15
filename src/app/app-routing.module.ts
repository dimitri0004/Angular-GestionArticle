import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArticlesComponent} from "./articles/articles.component";


import {LoginComponent} from "./login/login.component";
import {HeaderComponent} from "./header/header.component";
import {AuthicatedGuard} from "./guards/authenticated.guard";

const routes: Routes = [
  {path:"login", component : LoginComponent},
  {path:"", component : LoginComponent},
  {path:"admin", component:HeaderComponent,canActivate: [AuthicatedGuard], children:[
      {path:"articles", component : ArticlesComponent},

    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
