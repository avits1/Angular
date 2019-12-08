import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmptyPageComponent } from './empty-page/empty-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductFormComponent,
    ProductsTableComponent,
    PageNotFoundComponent,
    EmptyPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
