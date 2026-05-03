import { inject } from "@angular/core";
import { CanActivateFn,Router } from "@angular/router";
import { AuthUserService } from "../services/auth-user.service";

export const authGuard: CanActivateFn = () =>{
    const auth=inject(AuthUserService);
    const router=inject(Router);

    const token=auth.getToken();

    if(!token){
        router.navigate(['login']);
        return false;
    }
    return true;
}