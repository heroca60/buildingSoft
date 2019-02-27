import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { MarcaComponent } from './admin/marca/marca.component';
import { CreateMarcaComponent } from './admin/marca/create-marca/create-marca.component';
import { ListMarcaComponent } from './admin/marca/list-marca/list-marca.component';
import { ReadMarcaComponent } from './admin/marca/read-marca/read-marca.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,    
    HomeComponent, MarcaComponent, CreateMarcaComponent, ListMarcaComponent, ReadMarcaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
