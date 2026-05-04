export interface Sesion{
    id_sesion:number;
    fecha:Date;
    actividades:string;
    areas_lenguaje:string[];
    logros:string;
    aspectos_mejorar:string;
    observaciones:string;
    multimedia:File[];
}