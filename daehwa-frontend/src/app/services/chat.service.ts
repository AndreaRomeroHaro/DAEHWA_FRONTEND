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
    
    obtenerMensaje(id_familiar:number):Observable<Mensaje[]>{
        return this.http.get<Mensaje[]>(`${this.enlaceApi}mensajes/${id_familiar}`);
    }

    enviarMensaje(mensaje:Mensaje):Observable<Mensaje>{
        return this.http.post<Mensaje>(`${this.enlaceApi}enviar/}`,mensaje)
    }

}