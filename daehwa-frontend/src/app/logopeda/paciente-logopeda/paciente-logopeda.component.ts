import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core'; 
import { PacienteLogopedaService } from '../../services/pacientes-logopeda.service';
import { Paciente } from '../../models/Paciente';

@Component({
  selector: 'app-paciente-logopeda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-logopeda.component.html',
  styleUrl: './paciente-logopeda.component.css',
})
export class PacienteLogopedaComponent implements OnInit {

  pacientes: Paciente[] = [];

  constructor(
    private pacientesService: PacienteLogopedaService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.pacientesService.obtenerPacientes().subscribe({
      next: (datos) => {
        this.pacientes = datos; 
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error("¡Ups! Hubo un error al recibir:", error);
      }
    });
  }

  entrarPaciente(idPaciente: number): void {
    this.router.navigate([`/logopeda/paciente/${idPaciente}`]);
  }
}
export default PacienteLogopedaComponent;
