import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthUserService } from "./authuser.service";

@Injectable({
    providedIn:'root'
})

export class PacienteLogopedaService{
    private enlaceApi='http://127.0.0.1:8000/api/logopeda/';

    constructor(private http:HttpClient,private authUser:AuthUserService){}

    obtenerPacientes():Observable<any[]>{
        const idLogopeda=this.authUser.getUsuarioId();
        return this.http.get<any[]>(`${this.enlaceApi}${idLogopeda}/pacientes/`)
    }
}