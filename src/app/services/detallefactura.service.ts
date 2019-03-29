import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ifirebase } from '../interface/ifirebase';
import { Cfactura } from '../model/cfactura';
import { Cdetallefactura } from '../model/cdetallefactura';

@Injectable({
  providedIn: 'root'
})
export class DetallefacturaService implements Ifirebase {
  detalleFacturaCollections: AngularFirestoreCollection<Cdetallefactura>;
  detallesFactura: Observable<Cdetallefactura[]>;
  ruta: string;
  constructor(private afs: AngularFirestore) { }

  //Select all
  getColecciones(): Observable<Cdetallefactura[]> {
    this.detalleFacturaCollections = this.afs.collection('facturas');
    return this.detallesFactura = this.detalleFacturaCollections.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Cdetallefactura;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      })
      )
  }


  //Select byId
  getColeccionesById(nit: string): Observable<Cdetallefactura[]> {
    var path: string;
    path = 'clientes/' + nit + '/facturas';
    console.log(path);
    this.detalleFacturaCollections = this.afs.collection(path,
      ref => ref.where('facturado', '==', false));
    return this.detallesFactura = this.detalleFacturaCollections.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Cdetallefactura;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      })
      )
  }
  //Insert un nuevo detalle a la factura
  postColeccion(objeto: Cdetallefactura) {
    this.ruta = 'clientes/' + objeto.nit + '/facturas/'+'idDocumento'+'/detalle' ;
    var date = new Date();
    var utcDate = date.toUTCString();
    try {
      this.afs.collection(this.ruta).add({
        serie: "NULL",
        numero: "NULL",
        nit: objeto.nit,
        nombre: objeto.nombre,
        fecha: utcDate,
        total: 0,
        facturado: false
      });
    } catch (error) {
      console.log(error)
    }
  }

  //Update
  putColeccion(objeto: any) {
    try {
      this.detalleFacturaCollections.doc(objeto.id).update(
        {
          //nit: cliente.id,
          //nombre: cliente.nombre,
          //descripcion: cliente.direccion,
        });
    } catch (error) {
      console.log(error);
    }
  }

  //delete
  deleteColeccion(objeto: any) {
    try {
      this.detalleFacturaCollections.doc(objeto.id).delete();
    } catch (error) {
      console.log(error);
    }
  }
}
