import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EvaluacionInicial } from '../../models/Evaluacion_Inicial';

@Component({
  selector: 'app-evaluacion-inicial',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './evaluacion-inicial.component.html',
  styleUrl: './evaluacion-inicial.component.css',
})
export class EvaluacionInicialComponent {
  evaluacion:EvaluacionInicial={
    antecedentes_clinicos:'',
    entorno_familiar:'',
    pruebas:'',
    observacion_directa:'',
    archivos_adjuntos:[]
  };

  guardarEvaluacion(){
    console.log('Evaluación inicial guardada:',this.evaluacion)
  }
  subirArchivos(event:any){
    this.evaluacion.archivos_adjuntos=Array.from(event.target.files);
  }
}
export default EvaluacionInicialComponent;