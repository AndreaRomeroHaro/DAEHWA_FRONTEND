import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EvaluacionInicial } from "../models/Evaluacion_Inicial";

@Injectable({providedIn:'root'})

export class EvaluacionInicialService{
    private enlaceApi='http://127.0.0.1:8000/api/evaluacion-inicial/';

    constructor(private http:HttpClient){}

    crearEvaluacion(evaluacion:EvaluacionInicial):Observable<EvaluacionInicial>{
        return this.http.post<EvaluacionInicial>(this.enlaceApi,evaluacion)
    }

    editarEvaluacion(id:number,evaluacion:EvaluacionInicial):Observable<EvaluacionInicial>{
    return this.http.post<EvaluacionInicial>(`${this.enlaceApi}${id}/`, evaluacion);
    }

    consultarEvaluacion(id:number):Observable<EvaluacionInicial>{
    return this.http.get<EvaluacionInicial>(`${this.enlaceApi}${id}/`);
    }

    listarEvaluacion():Observable<EvaluacionInicial[]>{
    return this.http.get<EvaluacionInicial[]>(this.enlaceApi);
    }

    eliminarEvaluacion_Inicial(id:number){
        return this.http.delete(`${this.enlaceApi}${id}/`);
    }
}