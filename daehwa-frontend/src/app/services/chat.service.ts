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
    
    obtenerMensajes(emisor: number, receptor: number) {
        return this.http.get<Mensaje[]>(`${this.enlaceApi}/chat/${emisor}/${receptor}/`);
    }
    enviarMensaje(mensaje: any) {
        return this.http.post(`${this.enlaceApi}chat/`, mensaje);
    }


}