import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Mensaje } from "../models/Chat";

@Injectable({
    providedIn:'root'
})
export class ChatService{
    private enlaceApi='http://127.0.0.1:8000/api/chat/';

    constructor(private http:HttpClient){}
    
    obtenerMensajes(emisor: number, receptor: number) {
        return this.http.get<Mensaje[]>(`${this.enlaceApi}${emisor}/${receptor}/`);
    }
    enviarMensaje(mensaje: any) {
        return this.http.post(`${this.enlaceApi}`, mensaje);
    }
}