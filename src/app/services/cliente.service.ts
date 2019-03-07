import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Ccliente } from '../model/ccliente';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clientesCollections: AngularFirestoreCollection<Ccliente>;
  clientes: Observable<Ccliente[]>;

  constructor(private afs: AngularFirestore) { }

  //Función que retorna un arreglo de documentos desde Firebase
  getClientes(): Observable<Ccliente[]> {
    this.clientesCollections = this.afs.collection('clientes');
    return this.clientes = this.clientesCollections.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Ccliente;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      })
      )
  }

  getByName(start:any): Observable<Ccliente[]> {
    this.clientesCollections = this.afs.collection('clientes',
      ref => ref.
        orderBy('nombre').
        startAt(start));
    return this.clientes = this.clientesCollections.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Ccliente;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      })
      )
  }

  postCliente(cliente: Ccliente) {
    try {
      //inserción con id manual utilizando .doc  .set
      this.afs.collection('clientes').doc(cliente.id).set({
        nombre: cliente.nombre,
        direccion: cliente.direccion
      });
    } catch (error) {
      console.log(error)
    }
  }


  putCliente(cliente: Ccliente) {
    try {
      this.clientesCollections.doc(cliente.id).update(
        {
          nit: cliente.id,
          nombre: cliente.nombre,
          descripcion: cliente.direccion,
        });
    } catch (error) {
      console.log(error);
    }
  }

  deleteCliente(cliente: Ccliente) {
    try {
      this.clientesCollections.doc(cliente.id).delete();
    } catch (error) {
      console.log(error);
    }
  }
}