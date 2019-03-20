import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import { Cinventario } from 'src/app/model/cinventario';
import { InventarioService } from 'src/app/services/inventario.service';
import { DialogCantidadComponent } from '../../pedido/dialog-cantidad/dialog-cantidad.component';

@Component({
  selector: 'app-inventario-pedido',
  templateUrl: './inventario-pedido.component.html',
  styleUrls: ['./inventario-pedido.component.css']
})
export class InventarioPedidoComponent implements OnInit {
  //arreglo para los nombres de las columnas del mat-table de clientes
  displayedColumnsInventario: string[] = [
    'codigo',
    'nombre',
    'descripcion',
    'marca',
    'categoria',
    'existencia',
    'precio',
    'actions'
  ];
  flagProgress: boolean = false;
  //dataSource para cargar el inventario
  dataSourceInventario = new MatTableDataSource<Cinventario>();
  //variable para la cantidad de inventarios
  dataInventariosLength: any;
  data: Cinventario;
  @ViewChild(MatPaginator) paginatorInventario: MatPaginator;
  @ViewChild(MatSort) sortInventario: MatSort;
  constructor(private is: InventarioService, public dialog: MatDialog) {
    this.data = new Cinventario;
  }

  ngOnInit() {
    //obteniendo todos los inventarios del servicio inyectado
    this.getInventarios();
    this.dataSourceInventario.paginator = this.paginatorInventario;
    this.dataSourceInventario.sort = this.sortInventario;
  }

  //Abriendo el Dialog para ingresar la cantidad de productos
  openDialog(
    id: any,
    codigo: number,
    nombre: string,
    descripcion: string,
    marca: string,
    categoria: string,
    existencia: number,
    precio: number): void {
    this.dialog.open(DialogCantidadComponent, {
      width: '350px',
      data: { codigo, nombre, descripcion, marca, categoria, existencia, precio }
    });
  }

  applyFilterInventarios(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceInventario.filter = filterValue;
  }

  //obteniendo inventarios de firebase
  getInventarios(): void {
    this.is.getInventarios().subscribe(data => {
      this.dataSourceInventario.data = data;
      this.dataInventariosLength = data;
    });
  }
}