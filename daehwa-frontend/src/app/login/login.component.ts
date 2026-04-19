import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthUserService } from "../../services/auth-user.service";

@Component({
    selector: 'app-login',
    standalone:true,
    imports: [CommonModule,FormsModule],
    templateUrl:'./login.component.html',
    styleUrl:'./login.component.css'
})
export class LoginComponent{
    email='';
    password='';
    error='';

    constructor(private auth:AuthUserService,private router:Router){

    }
    login(){
            this.auth.login(this.email,this.password).subscribe({next:res=>{
                const usuario=res.usuario;

                if (usuario.rol==='L'){
                    this.router.navigate(['/logopeda']);
                }else if(usuario.rol==='F'){
                    this.router.navigate(['/familiar']);
                }
            },
            error:()=>{
                this.error='Email o contraseña invalidos';
            }
        });
    }
}