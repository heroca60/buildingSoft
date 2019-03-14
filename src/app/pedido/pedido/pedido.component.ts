import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ccliente } from '../../model/ccliente';
import { ClienteService } from '../../services/cliente.service';
import {
  MatSnackBar,
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatStepper,
  MatDialog,
  
} from '@angular/material';

import { Cinventario } from 'src/app/model/cinventario';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  cliente: Ccliente;  
  clientes: Ccliente[];
  isLinear = true;
  clienteFormGroup: FormGroup;
  pedidoFormGroup: FormGroup;
  flagProgress: boolean = false;
  //arreglo para los nombres de las columnas del mat-table de clientes
  displayedColumns: string[] = [
    'id',
    'nombre',
    'direccion',
    'actions'
  ];
 
  //dataSource para cargar los clientes
  dataSource = new MatTableDataSource<Ccliente>();
 
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
  

  cantidad: any;


  constructor(private _formBuilder: FormBuilder,
    //inyectando el servicio de ClienteServicio
    private ns: ClienteService,
    //inyectando el servicio de InventarioServicio
   
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.cliente = new Ccliente();
    
  }

  ngOnInit() {
    //form de validación de los datos del cliente
    this.clienteFormGroup = this._formBuilder.group({
      nit: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    });
    this.pedidoFormGroup = this._formBuilder.group({
      adress: ['', Validators.required]
    });

    //Obteniendo todos los clientes del servicio inyectado
    this.getClientes();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  //obteniendo clientes de firebase
  getClientes(): void {
    this.ns.getClientes().subscribe(data => {
      this.dataSource.data = data;
      this.dataLength = data;
    });
  }

 


  onSubmitCliente(): void {
    if (this.clienteFormGroup.status == "VALID" && this.accionCliente == "Guardar") {
      this.cliente.id = this.clienteFormGroup.get('nit').value;
      this.cliente.nombre = this.clienteFormGroup.get('nombre').value;
      this.cliente.direccion = this.clienteFormGroup.get('direccion').value;
      //activando barra de progreso de transaccion
      this.flagProgress = true;
      //mandando el objeto inventario para la insercion      
      this.ns.postCliente(this.cliente);
      //Mensaje de transacción realizada
      this.openSnackBar("Transacción exitosa", "Guardar");
      this.flagProgress = false;
    } else {
      this.flagProgress = false;
    }
  }

  agregarPedido(id: any, nombre: any, direccion: any, stepper: MatStepper): void {
    this.clienteFormGroup.setValue({
      nit: id,
      nombre: nombre,
      direccion: direccion
    })
    console.log(this.clienteFormGroup.get('nit').value, +" - " + this.clienteFormGroup.get('nombre').value + " - " + this.clienteFormGroup.get('direccion').value)
    this.accionCliente = "Modificar";
    stepper.next();
  }

  
}


