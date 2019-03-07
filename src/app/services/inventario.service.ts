import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Cinventario } from '../model/cinventario';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  inventariosCollections: AngularFirestoreCollection<Cinventario>;
  inventarios: Observable<Cinventario[]>;

  constructor(private afs: AngularFirestore) { }
  //Función que retorna un arreglo de documentos desde Firebase
  getInventarios(): Observable<Cinventario[]> {
    this.inventariosCollections = this.afs.collection('inventario');
    return this.inventarios = this.inventariosCollections.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Cinventario;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      })
      )
  }

  postInventario(inventario: Cinventario) {
    var promesa = new Promise((resolve, reject) => {
      try {
        this.afs.collection('inventario').add({
          codigo: inventario.codigo,
          nombre: inventario.nombre,
          descripcion: inventario.descripcion,
          marca: inventario.marca,
          categoria: inventario.categoria,
          existencia: inventario.existencia,
          precio: inventario.precio
        });
        resolve();
      } catch (error) {
        reject();
        console.log(error)
      }
    })
    return promesa;
  }

  putInventario(inventario: Cinventario) {
    try {
      this.inventariosCollections.doc(inventario.id).update(
        {
          codigo: inventario.codigo,
          nombre: inventario.nombre,
          descripcion: inventario.descripcion,
          marca: inventario.marca,
          categoria: inventario.categoria,
          precio: inventario.precio
        });
    } catch (error) {
      console.log(error);
    }
  }

  deleteInventario(inventario: Cinventario) {
    try {
      this.inventariosCollections.doc(inventario.id).delete();
    } catch (error) {
      console.log(error);
    }
  }
}
