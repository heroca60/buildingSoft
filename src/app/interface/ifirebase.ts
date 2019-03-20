import { Observable } from "rxjs";

export interface Ifirebase {
    //método para obtener todos
    getColecciones(): Observable<any[]>;
    postColeccion(objeto: any): any;
    putColeccion(objeto: any): any;
    deleteColeccion(objeto: any): any;
}
