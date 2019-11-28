import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
// import { ContactComponent } from './contact/contact.component';
// import { UsersComponent } from './users/users.component';
// import { AddFormComponent } from './add-form/add-form.component';
// import { TableComponent } from './table/table.component';
// import { MovieComponent } from './movie/movie.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AddFormSyncComponent } from './add-form-sync/add-form-sync.component';
import { TableSyncComponent } from './table-sync/table-sync.component';
import { TestFormComponent } from './test-form/test-form.component';

// import { AddFormAsyncComponent } from './add-form-async/add-form-async.component';
// import { TableAsyncComponent } from './table-async/table-async.component';

// project files were split to 3 parts:
// 1. Basic Input / Output / EventEmitter :
//    UsersComponent , AddFormComponent, TableComponent
// 2. Service Snyc funcs (share-user.service.ts) :
//    AddFormSyncComponent, TableSyncComponent, ShareUserService
// 3 Service with Observeble and Async funcs (user-async.service.ts) :
//    AddFormAsyncComponent, TableAsyncComponent, UserAsyncService


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
//   {path:'contact',component:ContactComponent},
  // {path:'users',component:UsersComponent},  
  // {path:'add-form',component:AddFormComponent},
  // {path:'add-form/:id',component:AddFormComponent},
  // {path:'table',component:TableComponent},  
  {path:'add-form-sync',component:AddFormSyncComponent},
  {path:'add-form-sync/:id',component:AddFormSyncComponent},
  {path:'table-sync',component:TableSyncComponent},     
  {path:'test-form',component:TestFormComponent},
  // {path:'movie',component:MovieComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
