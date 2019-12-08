import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ThingsComponent } from './things/things.component';
import { OthersComponent } from './others/others.component';
import { OtherFormComponent } from './other-form/other-form.component';
import { ThingsTableComponent } from './things-table/things-table.component';
import { ThingFormComponent } from './thing-form/thing-form.component';
import { OthersCompComponent } from './others-comp/others-comp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ThingsComponent,
    OthersComponent,    
    OtherFormComponent,
    ThingsTableComponent,
    ThingFormComponent,
    OthersCompComponent,
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
