import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../../models/Cita';
import { CitaService } from '../../services/citas.service';

@Component({
  selector: 'app-citas-paciente',
  imports: [CommonModule],
  templateUrl: './citas-paciente.component.html',
  styleUrl: './citas-paciente.component.css',
})
export class CitasPacienteComponent implements OnInit {

  citas: Cita[] = [];
  detalleCita: number | null=null;

  constructor(private citasServicio:CitaService){}

  ngOnInit(): void {
      this.cargarCitas();
  }

  cargarCitas():void{
    this.citasServicio.listarCita().subscribe(cita=>this.citas=cita);
  }

  detalle_Cita(id:number):void{
    this.detalleCita=this.detalleCita===id?null:id;
  }

}
export default CitasPacienteComponent;