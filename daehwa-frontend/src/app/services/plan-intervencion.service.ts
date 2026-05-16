import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PlanIntervencion } from "../models/Plan_Intervencion";

@Injectable({ providedIn: 'root' })
export class PlanIntervencionService {

  private enlaceApi = 'https://daehwa-backend.onrender.com/api/planes-intervencion/';

  constructor(private http: HttpClient) {}

  crearPlanIntervencion(plan: PlanIntervencion): Observable<PlanIntervencion> {
    return this.http.post<PlanIntervencion>(this.enlaceApi, plan);
  }

  editarPlanIntervencion(id: number, plan: PlanIntervencion): Observable<PlanIntervencion> {
    return this.http.put<PlanIntervencion>(`${this.enlaceApi}${id}/`, plan);
  }

  consultarPlanIntervencion(id: number): Observable<PlanIntervencion> {
    return this.http.get<PlanIntervencion>(`${this.enlaceApi}${id}/`);
  }

  listarPlanIntervencion(): Observable<PlanIntervencion[]> {
    return this.http.get<PlanIntervencion[]>(this.enlaceApi);
  }

  eliminarPlanIntervencion(id: number) {
    return this.http.delete(`${this.enlaceApi}${id}/`);
  }
}
