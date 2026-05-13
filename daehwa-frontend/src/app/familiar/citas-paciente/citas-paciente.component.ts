import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from '../../services/citas.service';
import { Cita } from '../../models/Cita';

@Component({
  selector: 'app-citas-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas-paciente.component.html',
  styleUrl: './citas-paciente.component.css',
})
export class CitasPacienteComponent implements OnInit {

  citas: Cita[] = [];
  detalleCita: number | null = null;
  idPaciente!: number;

  constructor(
    private citasServicio: CitaService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('idPaciente'));
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citasServicio.listarCita().subscribe({
      next: (data: Cita[]) => {
        this.citas = data.filter((cita: any) => cita.paciente === this.idPaciente || cita.id_paciente === this.idPaciente);
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Ocurrió un error al cargar las citas.');
      }
    });
  }

  detalle_Cita(id: number): void {
    this.detalleCita = this.detalleCita === id ? null : id;
  }

  cancelarCita(id: number): void {
    if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      this.citasServicio.cancelarCita(id).subscribe({
        next: () => {
          this.cargarCitas();
        },
        error: () => {
          alert('No se pudo cancelar la cita. Inténtalo de nuevo.');
        }
      });
    }
  }
}

export default CitasPacienteComponent;