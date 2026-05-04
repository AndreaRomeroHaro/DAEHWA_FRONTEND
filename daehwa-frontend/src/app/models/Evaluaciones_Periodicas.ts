export interface EvaluacionPeriodica {
    id_evaluacion:number;
    fecha:Date;
    areas:string;
    instrumentos:string[];
    cambios:string;
    puntuacion:number;
}