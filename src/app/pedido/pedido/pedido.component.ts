import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ccliente } from '../../model/ccliente';
import { ClienteService } from '../../services/cliente.service';
import {
  MatSnackBar,
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatStepper
} from '@angular/material';

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
  displayedColumns: string[] = [
    'id',
    'nombre',
    'direccion',
    'actions'
  ];
  dataSource = new MatTableDataSource<Ccliente>();
  dataLength: any;
  //Control del acordion
  panelOpenState = false;
  accionCliente:string = "Guardar"

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _formBuilder: FormBuilder,
    private ns: ClienteService,
    private snackBar: MatSnackBar) {
    this.cliente = new Ccliente();
  }

  ngOnInit() {
    this.clienteFormGroup = this._formBuilder.group({
      nit: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    });
    this.pedidoFormGroup = this._formBuilder.group({
      adress: ['', Validators.required]
    });
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

  agregarPedido(id:any, nombre:any, direccion:any, stepper:MatStepper): void {
      this.clienteFormGroup.setValue({
        nit: id,
        nombre: nombre,
        direccion: direccion
      })
      console.log(this.clienteFormGroup.get('nit').value,+" - "+this.clienteFormGroup.get('nombre').value+" - "+this.clienteFormGroup.get('direccion').value)
      this.accionCliente = "Modificar";
      stepper.next();
  }

}