import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import {
  MatSnackBar,
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatStepper,
  MatDialog,

} from '@angular/material';
import { FacturaService } from 'src/app/services/factura.service';
import { Cfactura } from 'src/app/model/cfactura';
@Component({
  selector: 'app-facturas-cliente',
  templateUrl: './facturas-cliente.component.html',
  styleUrls: ['./facturas-cliente.component.css']
})
export class FacturasClienteComponent implements OnInit {
  //arreglo para los nombres de las columnas del mat-table de clientes
  displayedColumns: string[] = [
    'id',
    'nombre',
    'fecha',
    'actions'
  ];

  //dataSource para cargar los clientes
  dataSource = new MatTableDataSource<Cfactura>();
  //variable para la cantidad de clientes
  dataLength: any;
  //Control del acordion
  panelOpenState = false;
  //esta variable sirve para asignar el nombre del botón
  accionCliente: string = "Guardar"
  //Para la paginación del mat-table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //Para el ordenamieto del mat-table
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ns: FacturaService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Aplicando filtro a mat-table
  applyFilter(filterValue: string) {
    /*Obteniendo todos los clientes del servicio inyectado
    hasta que se empieza a filtrar se cargan los datos*/

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.data);
  }

  //obteniendo clientes de firebase
  getFacturasById(nit: string): void {
    this.ns.getColeccionesById(nit).subscribe(
      data => {
        this.dataSource.data = data;
        this.dataLength = data;
      },
      error => {
        console.log('Algo pasó' + error);
      }
    );
  }

}
