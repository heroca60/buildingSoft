import { Icliente } from '../interface/icliente';
export class Ccliente implements Icliente {
    id?:string;
    nombre:string;
    direccion:string;
}
