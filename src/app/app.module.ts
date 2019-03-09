import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


// Firebase Modules
import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { FirestoreSettingsToken } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { MarcaComponent } from './admin/marca/marca.component';
import { CreateMarcaComponent } from './admin/marca/create-marca/create-marca.component';
import { ListMarcaComponent } from './admin/marca/list-marca/list-marca.component';
import { ReadMarcaComponent } from './admin/marca/read-marca/read-marca.component';
import { InventarioComponent } from './admin/inventario/inventario.component';
import { CreateInventarioComponent } from './admin/inventario/create-inventario/create-inventario.component';
import { ListInventarioComponent } from './admin/inventario/list-inventario/list-inventario.component';
import { ReadInventarioComponent } from './admin/inventario/read-inventario/read-inventario.component';
import { VentasComponent } from './cajero/ventas/ventas.component';
import { PedidoComponent } from './pedido/pedido/pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    MarcaComponent,
    CreateMarcaComponent,
    ListMarcaComponent,
    ReadMarcaComponent,
    InventarioComponent,
    CreateInventarioComponent,
    ListInventarioComponent, 
    ReadInventarioComponent, 
    VentasComponent, 
    PedidoComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    //Inicialización de Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }