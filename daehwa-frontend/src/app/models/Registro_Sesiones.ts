export interface RegistroSesion{
    id_sesion:number;
    fecha:Date;
    actividades:string
    areas:string[];
    logros:string;
    aspectos_mejorar:string;
    observaciones:string;
    multimedia:File[];
}