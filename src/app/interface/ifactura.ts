export interface Ifactura {
    id?:string;
    serie:string;
    numero:string; 
    nit: string;
    nombre:string;
    fecha: string;
    total: number;
    facturado: boolean;        
}
