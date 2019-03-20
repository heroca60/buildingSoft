import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { Cinventario } from 'src/app/model/cinventario';

@Component({
  selector: 'app-dialog-cantidad',
  templateUrl: './dialog-cantidad.component.html',
  styleUrls: ['./dialog-cantidad.component.css']
})
export class DialogCantidadComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogCantidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cinventario
  ) { }

  ngOnInit() {
  }

  agregarPedido(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
