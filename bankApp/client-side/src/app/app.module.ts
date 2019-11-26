import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ClientsComponent } from './clients/clients.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { AccountsCompComponent } from './accounts-comp/accounts-comp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ClientsComponent,
    AccountsComponent,    
    AccountFormComponent,
    ClientsTableComponent,
    ClientFormComponent,
    AccountsCompComponent,
    PageNotFoundComponent,
    LoginFormComponent,
    HomeComponent
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
