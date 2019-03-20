import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ifirebase } from '../interface/ifirebase';
import { Cfactura } from '../model/cfactura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService implements Ifirebase {
  facturasCollections: AngularFirestoreCollection<Cfactura>;
  facturas: Observable<Cfactura[]>;
  ruta: string;
  constructor(private afs: AngularFirestore) { }

  //Select all
  getColecciones(): Observable<Cfactura[]> {
    this.facturasCollections = this.afs.collection('facturas');
    return this.facturas = this.facturasCollections.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Cfactura;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      })
      )
  }


  //Select byId
  getColeccionesById(nit: string): Observable<Cfactura[]> {
    var path: string;
    path = 'clientes/' + nit + '/facturas';
    console.log(path);
    this.facturasCollections = this.afs.collection(path,
      ref => ref.where('facturado', '==', false));
    return this.facturas = this.facturasCollections.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Cfactura;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      })
      )
  }
  //Insert
  postColeccion(objeto: Cfactura) {
    this.ruta = 'clientes/' + objeto.nit + '/facturas';
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
      this.facturasCollections.doc(objeto.id).update(
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
      this.facturasCollections.doc(objeto.id).delete();
    } catch (error) {
      console.log(error);
    }
  }
}
