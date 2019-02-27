import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {
 //flag que evalua si puede crear nuevas marcas
 flagCreateMarca:Boolean = false;
 //flag que evalua si pueden listar las marcas
 flagListMarca:Boolean = false; 
 btnCreateMarca:String = "Nuevo";
 mostrarCreateMarca() {
   if (this.flagCreateMarca == false) {
     this.flagCreateMarca = true;
     this.btnCreateMarca = "Cerrar";
   }else{
     this.flagCreateMarca = false;
     this.btnCreateMarca = "Nuevo";
   }    
 }
 mostrarListMarca() {
  if (this.flagListMarca == false) {
    this.flagListMarca = true;      
  }else{
    this.flagListMarca = false;      
  }    
}
  constructor() { }

  ngOnInit() {
  }

}
