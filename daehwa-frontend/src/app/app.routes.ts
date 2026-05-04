import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guards';
import { roleGuard } from './guards/role.guard';
export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'logopeda',canActivate:[authGuard,roleGuard('L')],loadComponent:()=>import('./logopeda/logopeda.component').then(m=>m.default)},
    {path:'familiar',canActivate:[authGuard,roleGuard('F')],loadComponent:()=>import('./familiar/familiar.component').then(m=>m.default),children:[
        {path:'evaluacion-inicial',loadComponent:()=>import('./logopeda/evaluacion-inicial/evaluacion-inicial.component').then(m=>m.default)},
        {path:'diagnostico-funcional',loadComponent:()=>import('./logopeda/diagnostico-funcional/diagnostico-funcional.component').then(m=>m.default)},
        {path:'plan-intervencion',loadComponent:()=>import('./logopeda/plan-intervencion/plan-intervencion.component').then(m=>m.default)},
        {path:'registro-sesiones',loadComponent:()=>import('./logopeda/registro-sesiones/registro-sesiones.component').then(m=>m.default)},
        {path:'evaluaciones-periodicas',loadComponent:()=>import('./logopeda/evaluaciones-periodicas/evaluaciones-periodicas.component').then(m=>m.default)},
        {path:'calendario',loadComponent:()=>import('./logopeda/calendario/calendario.component').then(m=>m.default)},
        {path:'chat',loadComponent:()=>import('./logopeda/chat/chat.component').then(m=>m.default)},
        {path:'',redirectTo:'evaluacion-inicial',pathMatch:'full'}
    ]},
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'**',redirectTo:'login'}
];
