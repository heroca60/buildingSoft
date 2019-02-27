import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcaComponent } from './admin/marca/marca.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //Ruta de inicio
  {path:'',component:HomeComponent},
  //Ruta para marcas
  {path:'marca',component:MarcaComponent},
  //Ruta no definida y redireccionando
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
