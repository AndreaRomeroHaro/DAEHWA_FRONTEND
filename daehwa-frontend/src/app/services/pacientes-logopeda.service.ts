import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Paciente } from "../models/Paciente";

@Injectable({
    providedIn:'root'
})
export class PacienteLogopedaService{

    private apiUrl = 'https://daehwa-backend.onrender.com/api';

    constructor(private http:HttpClient){}

    obtenerPacientes(): Observable<Paciente[]> {
      return this.http.get<Paciente[]>(`${this.apiUrl}/pacientes/`);
    }

    obtenerPaciente(idPaciente: number): Observable<Paciente> {
      return this.http.get<Paciente>(`${this.apiUrl}/pacientes/${idPaciente}/`);
    }
}
