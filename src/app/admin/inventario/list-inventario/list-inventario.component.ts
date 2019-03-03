import { Component, OnInit, ViewChild } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';
import { Cinventario } from '../../../model/cinventario';
import { MatPaginator,MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-list-inventario',
  templateUrl: './list-inventario.component.html',
  styleUrls: ['./list-inventario.component.css']
})
export class ListInventarioComponent implements OnInit {
  inventarios: Cinventario[];
  displayedColumns: string[] = ['id', 'codigo',
    'nombre', 'descripcion', 'marca', 'categoria', 'precio'];

  constructor(private ns: InventarioService) {
  }  
  ngOnInit() {
    this.getInventarios();    
  }

  getInventarios(): void {
    this.ns.getInventarios().subscribe(inventarios => this.inventarios = inventarios);
  }

}
