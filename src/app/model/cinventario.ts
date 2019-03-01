import { Iinventario } from '../interface/iinventario';

export class Cinventario implements Iinventario {
    id?: string;
    codigo:string;
    nombre: string;
    descripcion: string;
    marca: string;
    categoria: string
    precio: number;    

    
}
