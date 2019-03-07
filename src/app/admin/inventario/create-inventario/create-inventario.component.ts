import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../../services/inventario.service';
import { Cinventario } from '../../../model/cinventario';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-inventario',
  templateUrl: './create-inventario.component.html',
  styleUrls: ['./create-inventario.component.css']
})
export class CreateInventarioComponent implements OnInit {
  inventario: Cinventario;
  //
  inventarioForm = this.fb.group({
    codigo: [''],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    marca: ['', Validators.required],
    categoria: ['', Validators.required],
    existencia: ['', Validators.compose([
      Validators.required,
      Validators.pattern('[0-9]*')
    ])],
    precio: ['', Validators.compose([
      Validators.required,
      Validators.pattern('[0-9]*.[0-9]{2}')
    ])],
  });
  flagProgress: boolean = false;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private ns: InventarioService) {
    this.inventario = new Cinventario;
  }
  ngOnInit() {

  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onSubmit(): void {
    if (this.inventarioForm.status == "VALID") {
      this.inventario.codigo = this.inventarioForm.get('codigo').value;
      this.inventario.nombre = this.inventarioForm.get('nombre').value;
      this.inventario.descripcion = this.inventarioForm.get('descripcion').value;
      this.inventario.marca = this.inventarioForm.get('marca').value;
      this.inventario.categoria = this.inventarioForm.get('categoria').value;
      this.inventario.existencia = this.inventarioForm.get('existencia').value;
      this.inventario.precio = this.inventarioForm.get('precio').value;
      //activando barra de progreso de transaccion
      this.flagProgress = true;
      //mandando el objeto inventario para la insercion
      this.ns.postInventario(this.inventario)
        .then(() => this.openSnackBar("Transacción exitosa", "Guardar"))
        .catch(() => this.openSnackBar("Ocurrió un error", "Error"))
        .finally(() => this.flagProgress = false)
      //this.cleanInputform();
    } else {
      this.flagProgress = false;
    }
  }

  cleanInputform() {
    this.inventarioForm.setValue({
      codigo: '',
      nombre: '',
      descripcion: '',
      marca: '',
      categoria: '',
      existencia: '',
      precio: ''
    })
  }
}
