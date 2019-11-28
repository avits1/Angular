import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
// import { ContactComponent } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
// import { UsersComponent } from './users/users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { AddFormComponent } from './add-form/add-form.component';
// import { TableComponent } from './table/table.component';
// import { Menu2Component } from './menu2/menu2.component';
// import { MovieComponent } from './movie/movie.component';
import { AddFormSyncComponent } from './add-form-sync/add-form-sync.component';
import { TableSyncComponent } from './table-sync/table-sync.component';
import { TestFormComponent } from './test-form/test-form.component';
// import { AddFormAsyncComponent } from './add-form-async/add-form-async.component';
// import { TableAsyncComponent } from './table-async/table-async.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // ContactComponent,       
    MenuComponent,
    LoginComponent,
    FormComponent,
    // UsersComponent,
    PageNotFoundComponent,
    // AddFormComponent,
    // TableComponent,
    // Menu2Component,
    // MovieComponent,
    AddFormSyncComponent,
    TableSyncComponent,
    TestFormComponent
    // AddFormAsyncComponent,
    // TableAsyncComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
