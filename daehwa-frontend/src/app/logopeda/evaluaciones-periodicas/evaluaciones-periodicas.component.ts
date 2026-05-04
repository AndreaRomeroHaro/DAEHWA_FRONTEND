import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EvaluacionPeriodica } from '../../models/Evaluaciones_Periodicas';
import { EvaluacionPeriodicaService } from '../../services/evaluaciones-periodica.service';

@Component({
  selector: 'app-evaluaciones-periodicas',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './evaluaciones-periodicas.component.html',
  styleUrl: './evaluaciones-periodicas.component.css',
})
export class EvaluacionesPeriodicasComponent implements OnInit{
  evaluaciones: EvaluacionPeriodica[]=[];

  nuevaEvaluacion:EvaluacionPeriodica={
    id_evaluacion:0,
    fecha:new Date(),
    areas:'',
    instrumentos:[],
    cambios:'',
    puntuacion:0
  }

  evaluacionSeleccionada:EvaluacionPeriodica|null=null;
  editar=false;

  constructor(private evaluacion_servicio:EvaluacionPeriodicaService){}

  ngOnInit(): void {
      this.cargarEvaluaciones();
  }

  cargarEvaluaciones():void{
    this.evaluacion_servicio.listarEvaluacion().subscribe(evaluacion=>{this.evaluaciones=evaluacion;});
  }
  
  actualizarFecha(fecha:string):void{
    this.nuevaEvaluacion.fecha=new Date(fecha);
  }

  actualizarInstrumentos(instrumentos:string):void{
    this.nuevaEvaluacion.instrumentos=instrumentos.split(',').map(i=>i.trim());
  }

  crearEvaluacion():void{
    if(this.editar && this.nuevaEvaluacion.id_evaluacion){
      this.evaluacion_servicio.editarEvaluacion(this.nuevaEvaluacion.id_evaluacion,this.nuevaEvaluacion).subscribe(()=>{
        this.editar=false;
        this.resetearFormulario();
        this.cargarEvaluaciones();
      });
    }else{
      this.evaluacion_servicio.crearEvaluacion(this.nuevaEvaluacion).subscribe(()=>{
        this.resetearFormulario();
        this.cargarEvaluaciones();
      });
    }
  }

  editarEvaluacion(id:number):void{
    this.evaluacion_servicio.consultarEvaluacion(id).subscribe(evaluacion=>{
      this.nuevaEvaluacion={...evaluacion};
      this.editar=true;
    })
  }
  consultarEvaluacion(id:number):void{
    this.evaluacion_servicio.consultarEvaluacion(id).subscribe(evaluacion=>{
      this.evaluacionSeleccionada=evaluacion;
    });
  }

  resetearFormulario():void{
    this.nuevaEvaluacion={
      id_evaluacion:0,
      fecha:new Date(),
      areas:'',
      instrumentos:[],
      cambios:'',
      puntuacion:0
    }
  }

  // generarGrafica():void{

  // }
}
export default EvaluacionesPeriodicasComponent;