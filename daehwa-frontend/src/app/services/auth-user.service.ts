import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject,tap } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class AuthUserService{
    private apiUrl='http://127.0.0.1:8000/api/login/'

    private usuarioSubject = new BehaviorSubject<any>(null);
    usuario$=this.usuarioSubject.asObservable();

    constructor (private http: HttpClient){

    }

    login(email:string, password:string){
        return this.http.post<any>(this.apiUrl,{email,password}).pipe
            (tap(res=>{localStorage.setItem('token',res.token);
                    this.usuarioSubject.next(res.usuario);
                    localStorage.setItem('usuario',JSON.stringify(res.usuario));
            })
        );
    }

    cargarUsuarioDesdeStorage(){
        const usuario=localStorage.getItem('usuario');
        if(usuario){
            this.usuarioSubject.next(JSON.parse(usuario))
        }
    }

    obtenerUsuarioActual(){
        return this.usuarioSubject.value;
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.usuarioSubject.next(null);
    }

    estaLogeado():boolean{
        return !!localStorage.getItem('token');
    }
    
    getToken(){
        return localStorage.getItem('token')
    }
}