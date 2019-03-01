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

  postInventario(n: Cinventario) {
    try {
      this.afs.collection('inventario').add({
        codigo:n.codigo,
        nombre:n.nombre,
        descripcion:n.descripcion,
        marca:n.marca,
        categoria:n.categoria,
        precio:n.precio
      });
    } catch (error) {
      console.log(error)
    }
  }

  putInventario(n: Cinventario) {
    try {
      this.inventariosCollections.doc(n.id).update(
        { 
          codigo:n.codigo,
          nombre:n.nombre,
          descripcion:n.descripcion,
          marca:n.marca,
          categoria:n.categoria,
          precio:n.precio
        });
    } catch (error) {
      console.log(error);
    }
  }

  deleteInventario(n: Cinventario) {
    try {
      this.inventariosCollections.doc(n.id).delete();
    } catch (error) {
      console.log(error);
    }
  }
}
