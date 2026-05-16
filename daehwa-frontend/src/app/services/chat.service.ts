import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ChatService{
    private enlaceApi='https://daehwa-backend.onrender.com/api/chats/';

    constructor(private http:HttpClient){}
    
    obtenerMensajes(): Observable<any[]> {
        return this.http.get<any[]>(this.enlaceApi);
    }

    enviarMensaje(mensaje: any) {
        return this.http.post(this.enlaceApi, mensaje);
    }
}