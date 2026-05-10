import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guards';
import { roleGuard } from './guards/role.guard';
export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'logopeda',
        // canActivate:[authGuard,roleGuard('L')],
        loadComponent:()=>import('./logopeda/logopeda.component').then(m=>m.default),children:[
        {path:'pacientes', loadComponent:()=> import('./logopeda/paciente-logopeda/paciente-logopeda.component').then(m => m.default)},
        {path:'paciente/:idPaciente',loadComponent:()=>import('./logopeda/paciente-home/paciente-home.component').then(m => m.default)},
        {path:'paciente/:idPaciente/evaluacion-inicial',loadComponent:()=>import('./logopeda/evaluacion-inicial/evaluacion-inicial.component').then(m=>m.default)},
        {path:'paciente/:idPaciente/diagnostico-funcional',loadComponent:()=>import('./logopeda/diagnostico-funcional/diagnostico-funcional.component').then(m=>m.default)},
        {path:'paciente/:idPaciente/plan-intervencion',loadComponent:()=>import('./logopeda/plan-intervencion/plan-intervencion.component').then(m=>m.default)},
        {path:'paciente/:idPaciente/registro-sesiones',loadComponent:()=>import('./logopeda/registro-sesiones/registro-sesiones.component').then(m=>m.default)},
        {path:'paciente/:idPaciente/evaluaciones-periodicas',loadComponent:()=>import('./logopeda/evaluaciones-periodicas/evaluaciones-periodicas.component').then(m=>m.default)},
        {path:'calendario',loadComponent:()=>import('./logopeda/calendario/calendario.component').then(m=>m.default)},
        {path: 'paciente/:idPaciente/chat',loadComponent: () =>import('./logopeda/chat/chat.component').then(m => m.default)},
        {path:'',redirectTo:'pacientes',pathMatch:'full'}
    ]},
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'**',redirectTo:'login'}
];
