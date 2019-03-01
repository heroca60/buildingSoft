import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  //flag que evalua si puede crear nuevo registro
  flagCreate:Boolean = false;
  //flag que evalua si pueden listar registros
  flagList:Boolean = false; 
  btnCreate:String = "Nuevo";
  mostrarCreate() {
    if (this.flagCreate == false) {
      this.flagCreate = true;
      this.btnCreate = "Cerrar";
    }else{
      this.flagCreate = false;
      this.btnCreate = "Nuevo";
    }    
  }
  mostrarList() {
   if (this.flagList == false) {
     this.flagList = true;      
   }else{
     this.flagList = false;      
   }    
 }
  constructor() { }

  ngOnInit() {
  }

}
