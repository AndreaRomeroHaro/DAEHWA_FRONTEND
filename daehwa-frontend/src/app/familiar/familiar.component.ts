import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthUserService } from '../services/authuser.service';
@Component({
  selector: 'app-familiar',
  imports: [CommonModule, RouterModule],
  templateUrl: './familiar.component.html',
  styleUrl: './familiar.component.css',
})
export class ComponenteFamiliar {
  idPaciente = 0;

  constructor(private authUserService: AuthUserService) {
    this.idPaciente = this.authUserService.getUsuarioId();
  }

  opciones = [
    { titulo: 'Diagnóstico funcional', ruta: 'diagnostico-funcional', icono: '🧠' },
    { titulo: 'Evaluaciones periódicas', ruta: 'evaluaciones-periodicas', icono: '📊' },
    { titulo: 'Plan de intervención', ruta: 'plan-intervencion', icono: '🎯' },
    { titulo: 'Registro de sesiones', ruta: 'registro-sesiones', icono: '📚' },
    { titulo: 'Chat con logopeda', ruta: 'chat', icono: '💬' },
    { titulo: 'Citas', ruta: 'citas', icono: '📅' }
  ];
}
export default ComponenteFamiliar;
