import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteLogopedaService } from '../../services/pacientes-logopeda.service';
@Component({
  selector: 'app-paciente-logopeda',
  imports: [CommonModule],
  templateUrl: './paciente-logopeda.component.html',
  styleUrl: './paciente-logopeda.component.css',
})
export class PacienteLogopedaComponent implements OnInit{

  pacientes:any[]=[];
  constructor(private pacientesService:PacienteLogopedaService,
    private router:Router
  ){}


  ngOnInit(): void {
      this.pacientesService.obtenerPacientes().subscribe(paciente=>this.pacientes=paciente);
  }

  entrarPaciente(idPaciente:number):void{
    this.router.navigate([`/logopeda/paciente/${idPaciente}`]);
  }
}
export default PacienteLogopedaComponent;
