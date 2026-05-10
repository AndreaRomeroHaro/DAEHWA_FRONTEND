import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Plan_Intervencion } from "../models/Plan_Intervencion";

@Injectable({providedIn:'root'})

export class PlanIntervencionService{
    private enlaceApi='http://127.0.0.1:8000/api/plan-intervencion/';

    constructor(private http:HttpClient){}

    crearPlan_Intervencion(plan_intervencion:Plan_Intervencion):Observable<Plan_Intervencion>{
        return this.http.post<Plan_Intervencion>(this.enlaceApi,plan_intervencion)
    }

    editarPlan_Intervencion(id:number,plan_intervencion:Plan_Intervencion):Observable<Plan_Intervencion>{
    return this.http.post<Plan_Intervencion>(`${this.enlaceApi}${id}/`, plan_intervencion);
    }

    consultarPlan_Intervencion(id:number):Observable<Plan_Intervencion>{
    return this.http.get<Plan_Intervencion>(`${this.enlaceApi}${id}/`);
    }

    listarPlan_Intervencion(idPaciente:number){
        return this.http.get<Plan_Intervencion[]>(`${this.enlaceApi}paciente/${idPaciente}/`);
    }

    eliminarPlan_Intervencion(id:number){
        return this.http.delete(`${this.enlaceApi}${id}/`);
    }
}