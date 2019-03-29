import { Idetallefactura } from "../interface/idetallefactura";

export class Cdetallefactura implements Idetallefactura {
    id?:string;
    nit:string;
    codigo:number;
    nombre:string;
    descripcion:string;
    marca:string;    
    categoria:string;
    cantidad:number;    
    precio:number; 
    subtotal:number;
}
