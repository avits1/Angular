import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
import { ThingsComponent } from './things/things.component';
import { ThingFormComponent } from './thing-form/thing-form.component';
import { ThingsTableComponent } from './things-table/things-table.component';

import { LoginFormComponent } from './login-form/login-form.component';

import { OtherFormComponent } from './other-form/other-form.component';
import { OthersCompComponent } from './others-comp/others-comp.component';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
    // {path:'',null:null},    
    {path:'',component:HomeComponent},        
    {path:'home',component:HomeComponent},    
    {path:'things',component:ThingsComponent},
    {path:'thing-form',component:ThingFormComponent},
    {path:'thing-form/:rec_id',component:ThingFormComponent},
    {path:'things-table',component:ThingsTableComponent}, 
    {path:'login-form',component:LoginFormComponent},    
    {path:'other-form',component:OtherFormComponent},         
    {path:'other-form/:id',component:OtherFormComponent},           
    {path:'others-comp',component:OthersCompComponent},
    {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
