import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Mensaje } from "../models/Chat";

@Injectable({
    providedIn:'root'
})
export class ChatService{
    private enlaceApi='http://127.0.0.1:8000/api/evaluacion-inicial/';

    constructor(private http:HttpClient){}
    
    obtenerMensajesPaciente(idPaciente: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.enlaceApi}paciente/${idPaciente}/`);
    }
    enviarMensaje(mensaje: any): Observable<any> {
        return this.http.post<any>(`${this.enlaceApi}`, mensaje);
    }

}