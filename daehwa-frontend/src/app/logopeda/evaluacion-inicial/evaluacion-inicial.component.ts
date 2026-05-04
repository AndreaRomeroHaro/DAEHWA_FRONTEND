import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EvaluacionInicial } from '../../models/Evaluacion_Inicial';
import { EvaluacionInicialService } from '../../services/evaluacion-inicial.service';

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

  evaluacionSeleccionada:EvaluacionInicial|null=null;
  editar=false;

  constructor(private evaluacionServicio:EvaluacionInicialService){}

  ngOnInit(): void {
      this.cargarEvaluaciones();
  }

  cargarEvaluaciones():void{
    this.evaluacionServicio.listarEvaluacion().subscribe(evaluacion=>{this.evaluaciones=evaluacion;});
  }

  subirArchivos(event:any):void{
    const archivos=event.target.files;
    this.nuevaEvaluacion.archivos_adjuntos=Array.from(archivos);
  }

  crearEvaluacion():void{
    if(this.editar && this.nuevaEvaluacion.id_evaluacion){
      this.evaluacionServicio.editarEvaluacion(this.nuevaEvaluacion.id_evaluacion,this.nuevaEvaluacion).subscribe(()=>{
        this.editar=false;
        this.resetearFormulario();
        this.cargarEvaluaciones();
      });
    }else{
      this.evaluacionServicio.crearEvaluacion(this.nuevaEvaluacion).subscribe(()=>{
        this.resetearFormulario();
        this.cargarEvaluaciones();
      });
    }
  }

  editarEvaluacion(id:number):void{
    this.evaluacionServicio.consultarEvaluacion(id).subscribe(evaluacion=>{
      this.nuevaEvaluacion={...evaluacion};
      this.editar=true;
    })
  }
  consultarEvaluacion(id:number):void{
    this.evaluacionServicio.consultarEvaluacion(id).subscribe(evaluacion=>{
      this.evaluacionSeleccionada=evaluacion;
    });
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