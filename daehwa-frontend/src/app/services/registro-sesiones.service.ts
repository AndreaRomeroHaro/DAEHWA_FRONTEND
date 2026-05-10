import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegistroSesion } from "../models/Registro_Sesiones";

@Injectable({providedIn:'root'})

export class RegistroSesionService{
    private enlaceApi='http://127.0.0.1:8000/api/registro-sesiones/';

    constructor(private http:HttpClient){}

    crearRegistro_Sesiones(registro_sesiones:RegistroSesion):Observable<RegistroSesion>{
        return this.http.post<RegistroSesion>(this.enlaceApi,registro_sesiones)
    }

    editarRegistro_Sesiones(id:number,registro_sesiones:RegistroSesion):Observable<RegistroSesion>{
    return this.http.post<RegistroSesion>(`${this.enlaceApi}${id}/`, registro_sesiones);
    }

    consultarRegistro_Sesiones(id:number):Observable<RegistroSesion>{
    return this.http.get<RegistroSesion>(`${this.enlaceApi}${id}/`);
    }

    listarRegistro_Sesiones(idPaciente:number){
    return this.http.get<RegistroSesion[]>(`${this.enlaceApi}paciente/${idPaciente}/`);
    }

    eliminarRegistro_Sesiones(id:number){
        return this.http.delete(`${this.enlaceApi}${id}/`);
    }
}