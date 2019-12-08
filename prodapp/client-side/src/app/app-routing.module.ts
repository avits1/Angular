import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmptyPageComponent } from './empty-page/empty-page.component';

const routes: Routes = [
  {path:'',component:EmptyPageComponent},        
  {path:'home',component:EmptyPageComponent},  
  {path:'product-form',component:ProductFormComponent},
  {path:'product-form/:prod_id',component:ProductFormComponent},
  {path:'products-table',component:ProductsTableComponent}, 
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
