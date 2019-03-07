import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MarcaComponent } from './admin/marca/marca.component';
import { InventarioComponent } from './admin/inventario/inventario.component';
import { PedidoComponent } from './pedido/pedido/pedido.component';


const routes: Routes = [
  //Ruta de inicio
  {path:'',component:HomeComponent},
  //Ruta para marcas
  {path:'marca',component:MarcaComponent},
  //Ruta inventarios
  {path: 'inventario', component:InventarioComponent},
  //Ruta no definida y redireccionando
  {path: 'pedidos', component:PedidoComponent},
  //Ruta no definida y redireccionando  
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
