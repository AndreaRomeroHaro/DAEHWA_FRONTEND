import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DiagnosticoFuncional } from "../models/Diagnostico_Funcional";

@Injectable({providedIn:'root'})
export class DiagnosticoFuncionalService {

  private enlaceApi='http://127.0.0.1:8000/api/diagnostico-funcional';
  
  constructor(private http:HttpClient){}
  crearDiagnostico(diagnostico:DiagnosticoFuncional):Observable<DiagnosticoFuncional>{
    return this.http.post<DiagnosticoFuncional>(this.enlaceApi,diagnostico)
  }

  editarDiagnostico(id:number,diagnostico:DiagnosticoFuncional):Observable<DiagnosticoFuncional>{
    return this.http.post<DiagnosticoFuncional>(`${this.enlaceApi}${id}/`, diagnostico)
  }

  consultarDiagnostico(id:number):Observable<DiagnosticoFuncional>{
    return this.http.get<DiagnosticoFuncional>(`${this.enlaceApi}${id}/`);
  }

  listarDiagnosticos():Observable<DiagnosticoFuncional[]>{
    return this.http.get<DiagnosticoFuncional[]>(this.enlaceApi);
  }
}