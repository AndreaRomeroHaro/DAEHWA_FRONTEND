import { Component, inject,OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthUserService } from "../services/auth-user.service";

@Component({
    selector:'app-navbar',
    standalone:true,
    imports:[CommonModule],
    templateUrl:'./navbar.component.html',
    styleUrl:'./navbar.component.css'
})
export class ComponenteNavbar implements OnInit{
    private auth=inject(AuthUserService);
    private router=inject(Router);

    
}