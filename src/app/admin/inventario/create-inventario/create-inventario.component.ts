import { Component, OnInit } from '@angular/core';
//import { InventarioService } from '../../../services/inventario.service';
//import { Cinventario } from '../../../model/cinventario';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-inventario',
  templateUrl: './create-inventario.component.html',
  styleUrls: ['./create-inventario.component.css']
})
export class CreateInventarioComponent implements OnInit {
  inventarioForm = this.fb.group({
    codigo: [''],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    marca: ['', Validators.required],
    categoria: ['', Validators.required],
    precio: ['', Validators.required]
  });
  flagProgress: boolean = false;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
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
      this.flagProgress = true;
      this.openSnackBar("Transacción exitosa","Guardar");
    } else {
      this.flagProgress = false;
    }

  }

}
