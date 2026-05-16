import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthUserService } from "./authuser.service";
import { Paciente } from "../models/Paciente";

@Injectable({
    providedIn:'root'
})

export class PacienteLogopedaService{

    constructor(private http:HttpClient,private authUser:AuthUserService){}

    obtenerPacientes(): Observable<Paciente[]> {
      return this.http.get<Paciente[]>('https://daehwa-backend.onrender.com/api/pacientes/');
  }

  obtenerPaciente(idPaciente: number): Observable<Paciente> {
      return this.http.get<Paciente>(`https://daehwa-backend.onrender.com/api/pacientes/${idPaciente}/`);
  }

}