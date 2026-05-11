import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cita } from '../../models/Cita';
import { CitaService } from '../../services/citas.service';

@Component({
  selector: 'app-citas-logopeda',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './citas-logopeda.component.html',
  styleUrl: './citas-logopeda.component.css',
})
export class CitasLogopedaComponent implements OnInit{
  citas: Cita[] = [];

  nuevaCita:Cita={
    id_cita:0,
    fecha_inicio:new Date(),
    fecha_fin:new Date(),
    id_paciente:0,
    estado:'activa'
  };

  detalleCita: number | null=null;
  editar=false;

  constructor(private citasServicio:CitaService){}
  ngOnInit(): void {
      this.cargarCitas();
  }

  cargarCitas():void{
    this.citasServicio.listarCita().subscribe(cita=>this.citas=cita);
  }

  actualizarFechaInicio(fecha:string){
    this.nuevaCita.fecha_inicio=new Date(fecha);
  }
  
  actualizarFechaFin(fecha:string){
    this.nuevaCita.fecha_fin=new Date(fecha);
  }

  crearCita():void{
    const peticion=this.editar&& this.nuevaCita.id_cita
    ?this.citasServicio.editarCita(this.nuevaCita.id_cita,this.nuevaCita)
    :this.citasServicio.crearCita(this.nuevaCita);

    peticion.subscribe(()=>
    {
      this.editar=false;
      this.resetearFormulario();
      this.cargarCitas();
    })
  }

  editarCita(id:number):void{
    this.citasServicio.consultarCita(id).subscribe(cita=>{
      this.nuevaCita={...cita};
      this.editar=true;
    })
  }

  cancelarCita(id:number):void{
    this.citasServicio.cancelarCita(id).subscribe(()=>{
      this.cargarCitas();
    })
  }

  detalle_Cita(id:number):void{
    this.detalleCita=this.detalleCita===id?null:id;
  }

  resetearFormulario():void{
    this.nuevaCita={
      id_cita:0,
      fecha_inicio:new Date(),
      fecha_fin:new Date(),
      id_paciente:0,
      estado:'activa'
    }
  }
}
export default CitasLogopedaComponent;