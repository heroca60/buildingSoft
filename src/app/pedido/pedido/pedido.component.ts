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
import { FacturaService } from 'src/app/services/factura.service';
import { Cfactura } from 'src/app/model/cfactura';
import { FacturasClienteComponent } from '../facturas-cliente/facturas-cliente.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  cliente: Ccliente;
  clientes: Ccliente[];
  factura: Cfactura;  
  isLinear = true;
  step:MatStepper;
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
  //invocando un metodo del hijo desde el padre
  @ViewChild(FacturasClienteComponent) facturas: FacturasClienteComponent;
  cantidad: any;


  constructor(private _formBuilder: FormBuilder,
    //inyectando el servicio de ClienteServicio
    private ns: ClienteService,
    private fs: FacturaService,
    //inyectando el servicio de InventarioServicio

    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.cliente = new Ccliente();
    this.factura = new Cfactura();

  }

  ngOnInit() {
    //form de validación de los datos del cliente
    this.clienteFormGroup = this._formBuilder.group({
      nit: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    });
    this.pedidoFormGroup = this._formBuilder.group({
      adress: ['']
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getClientes();
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

  //Notificando hacerca de la transacción realizada
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  //obteniendo clientes de firebase
  getClientes(): void {
    this.ns.getClientes().subscribe(
      data => {
        this.dataSource.data = data;
        this.dataLength = data;
      }, 
      error =>{
        console.log('Algo pasó' + error);
      }    
    );
  }

  //Almacenando un nuevo cliente
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

  cargarPendientes(id: any, nombre: any, direccion: any, stepper: MatStepper): void {
    this.clienteFormGroup.setValue({
      nit: id,
      nombre: nombre,
      direccion: direccion
    })    
    this.facturas.getFacturasById(this.clienteFormGroup.get('nit').value);   
    this.accionCliente = "Modificar";    
    stepper.next();
    this.facturas.obtenerStep(stepper);
  }


  agregarPedido(id: any, nombre: any, direccion: any, stepper: MatStepper): void {
    this.clienteFormGroup.setValue({
      nit: id,
      nombre: nombre,
      direccion: direccion
    })
    this.factura.nit = this.clienteFormGroup.get('nit').value;
    this.factura.nombre = this.clienteFormGroup.get('nombre').value;
    this.fs.postColeccion(this.factura); 
    this.facturas.getFacturasById(this.clienteFormGroup.get('nit').value);   
    this.accionCliente = "Modificar";    
    stepper.next();
    this.facturas.obtenerStep(stepper);
  }  
}


