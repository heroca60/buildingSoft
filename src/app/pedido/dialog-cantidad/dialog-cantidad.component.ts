import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { Cdetallefactura } from 'src/app/model/cdetallefactura';

@Component({
  selector: 'app-dialog-cantidad',
  templateUrl: './dialog-cantidad.component.html',
  styleUrls: ['./dialog-cantidad.component.css']
})
export class DialogCantidadComponent implements OnInit {
  cantidad:number;
  cantidadFormGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogCantidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cdetallefactura,
    private _formBuilder: FormBuilder    
  ) { }

  ngOnInit() {  
    this.cantidadFormGroup =  this._formBuilder.group({
      cantidad: ['',Validators.required]
    });
    this.cantidadFormGroup.setValue({
      cantidad: 1
    }) 
  }

  agregarPedido(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
