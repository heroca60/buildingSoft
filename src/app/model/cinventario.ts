import { Iinventario } from '../interface/iinventario';

export class Cinventario implements Iinventario {
    id?: string;
    codigo: number;
    nombre: string;
    descripcion: string;
    marca: string;
    categoria: string;
    existencia: number;
    precio: number;
}
