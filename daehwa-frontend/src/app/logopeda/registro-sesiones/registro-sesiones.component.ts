import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistroSesion } from '../../models/Registro_Sesiones';
import { RegistroSesionService } from '../../services/registro-sesiones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro-sesiones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-sesiones.component.html',
  styleUrl: './registro-sesiones.component.css',
})
export class RegistroSesionesComponent implements OnInit {

  sesiones: RegistroSesion[] = [];

  nuevaSesion: RegistroSesion = {
    id: 0,
    paciente: 0,
    fecha: '',
    actividades: '',
    areas_lenguaje: '',
    logros: '',
    aspectos_mejorar: '',
    observaciones: '',
    multimedia: null
  };

  registroDetalle: number | null = null;
  editar = false;
  idPaciente = 0;

  constructor(
    private sesionServicio: RegistroSesionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('idPaciente'));
    this.nuevaSesion.paciente = this.idPaciente;
    this.cargarSesiones();
  }

  cargarSesiones(): void {
    this.sesionServicio.listarRegistro_Sesiones()
      .subscribe(sesion => this.sesiones = sesion);
  }

  crearSesion(): void {
    const peticion = this.editar
      ? this.sesionServicio.editarRegistro_Sesiones(this.nuevaSesion.id, this.nuevaSesion)
      : this.sesionServicio.crearRegistro_Sesiones(this.nuevaSesion);

    peticion.subscribe(() => {
      this.editar = false;
      this.resetearFormulario();
      this.cargarSesiones();
    });
  }

  editarSesion(id: number): void {
    this.sesionServicio.consultarRegistro_Sesiones(id).subscribe(sesion => {
      this.nuevaSesion = { ...sesion };
      this.editar = true;
    });
  }

  eliminarSesion(id: number): void {
    this.sesionServicio.eliminarRegistro_Sesiones(id).subscribe(() => {
      this.cargarSesiones();
    });
  }

  detallesSesion(id: number): void {
    this.registroDetalle = this.registroDetalle === id ? null : id;
  }

  subirMultimedia(event: any): void {
    const archivo = event.target.files[0];
    this.nuevaSesion.multimedia = archivo;
  }

  resetearFormulario(): void {
    this.nuevaSesion = {
      id: 0,
      paciente: this.idPaciente,
      fecha: '',
      actividades: '',
      areas_lenguaje: '',
      logros: '',
      aspectos_mejorar: '',
      observaciones: '',
      multimedia: null
    };
  }
}

export default RegistroSesionesComponent;
