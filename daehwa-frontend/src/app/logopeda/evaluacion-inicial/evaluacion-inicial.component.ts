import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EvaluacionInicial } from '../../models/Evaluacion_Inicial';
import { EvaluacionInicialService } from '../../services/evaluacion-inicial.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evaluacion-inicial',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './evaluacion-inicial.component.html',
  styleUrl: './evaluacion-inicial.component.css',
})
export class EvaluacionInicialComponent implements OnInit{
  
  evaluaciones:EvaluacionInicial[]=[];
  
  nuevaEvaluacion:EvaluacionInicial={
    id_evaluacion:0,
    antecedentes_clinicos:'',
    entorno_familiar:'',
    pruebas:'',
    observacion_directa:'',
    archivos_adjuntos:[]
  };

  evaluacionDetalle:number |null=null;
  editar=false;
  idPaciente=0;

  constructor(private evaluacionServicio:EvaluacionInicialService,private route:ActivatedRoute){}

  ngOnInit(): void {
      this.idPaciente = Number(this.route.snapshot.paramMap.get('idPaciente'));
      this.cargarEvaluaciones();
  }

  cargarEvaluaciones():void{
    this.evaluacionServicio.listarEvaluacion(this.idPaciente).subscribe(evaluacion =>{this.evaluaciones = evaluacion;}); 
  }

  subirArchivos(event:any):void{
    const archivos=event.target.files;
    this.nuevaEvaluacion.archivos_adjuntos=Array.from(archivos);
  }

  crearEvaluacion():void{
    const peticion=this.editar&&this.nuevaEvaluacion.id_evaluacion
    ?this.evaluacionServicio.editarEvaluacion(this.nuevaEvaluacion.id_evaluacion,this.nuevaEvaluacion)
    :this.evaluacionServicio.crearEvaluacion(this.nuevaEvaluacion);

    peticion.subscribe(()=>{
      this.editar=false;
      this.resetearFormulario();
      this.cargarEvaluaciones();
    })
  }

  editarEvaluacion(id:number):void{
    this.evaluacionServicio.consultarEvaluacion(id).subscribe(evaluacion=>{
      this.nuevaEvaluacion={...evaluacion};
      this.editar=true;
    })
  }

  eliminarEvaluacion(id:number):void{
    this.evaluacionServicio.eliminarEvaluacion_Inicial(id).subscribe(()=>this.cargarEvaluaciones());
  }

  detalleEvaluacion(id:number):void{
    this.evaluacionDetalle=this.evaluacionDetalle===id ?null:id;
  }

  resetearFormulario():void{
      this.nuevaEvaluacion={
      id_evaluacion:0,
    antecedentes_clinicos:'',
    entorno_familiar:'',
    pruebas:'',
    observacion_directa:'',
    archivos_adjuntos:[]
    }
  }
}
export default EvaluacionInicialComponent;