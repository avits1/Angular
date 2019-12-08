import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
// import { ThingsComponent } from './things/things.component';
// import { AddFormComponent } from './add-form/add-form.component';
// import { TableComponent } from './table/table.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AddFormSyncComponent } from './add-form-sync/add-form-sync.component';
import { TableSyncComponent } from './table-sync/table-sync.component';
import { TestFormComponent } from './test-form/test-form.component';



// project files were split to 2 parts:
// 1. Basic Input / Output / EventEmitter :
//    ThingsComponent , AddFormComponent, TableComponent
// 2. Service Snyc funcs (share-thing.service.ts) :
//    AddFormSyncComponent, TableSyncComponent, ShareThingService


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  // {path:'things',component:ThingsComponent},  
  // {path:'add-form',component:AddFormComponent},
  // {path:'add-form/:id',component:AddFormComponent},
  // {path:'table',component:TableComponent},  
  {path:'add-form-sync',component:AddFormSyncComponent},
  {path:'add-form-sync/:id',component:AddFormSyncComponent},
  {path:'table-sync',component:TableSyncComponent},     
  {path:'test-form',component:TestFormComponent},  
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
