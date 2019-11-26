import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientsTableComponent } from './clients-table/clients-table.component';

import { LoginFormComponent } from './login-form/login-form.component';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountsCompComponent } from './accounts-comp/accounts-comp.component';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
    // {path:'',null:null},    
    {path:'',component:HomeComponent},        
    {path:'home',component:HomeComponent},    
    {path:'clients',component:ClientsComponent},
    {path:'client-form',component:ClientFormComponent},
    {path:'client-form/:rec_id',component:ClientFormComponent},
    {path:'clients-table',component:ClientsTableComponent}, 
    {path:'login-form',component:LoginFormComponent},
    {path:'accounts',component:AccountsComponent},    
    {path:'account-form',component:AccountFormComponent},         
    {path:'account-form/:id',component:AccountFormComponent},           
    {path:'accounts-comp',component:AccountsCompComponent},
    {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
