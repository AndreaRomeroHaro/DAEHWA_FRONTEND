import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EvaluacionPeriodica } from '../../models/Evaluaciones_Periodicas';
import { EvaluacionPeriodicaService } from '../../services/evaluaciones-periodica.service';
import { Chart } from 'chart.js/auto';

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

  evaluacionDetalle: number | null=null;
  grafica: Chart | null=null;
  editar=false;

  constructor(private evaluacion_servicio:EvaluacionPeriodicaService){}

  ngOnInit(): void {
      this.cargarEvaluaciones();
  }

  cargarEvaluaciones():void{
    this.evaluacion_servicio.listarEvaluacion().subscribe(evaluacion=>{this.evaluaciones=evaluacion;});
  }
  
  transformarFecha(fecha:string):void{
    this.nuevaEvaluacion.fecha=new Date(fecha);
  }

  transformarInstrumentos(instrumentos:string):void{
    this.nuevaEvaluacion.instrumentos=instrumentos.split(',').map(i=>i.trim());
  }

  crearEvaluacion():void{
    const peticion=this.editar&&this.nuevaEvaluacion.id_evaluacion ?
    this.evaluacion_servicio.editarEvaluacion(this.nuevaEvaluacion.id_evaluacion,this.nuevaEvaluacion):
    this.evaluacion_servicio.crearEvaluacion(this.nuevaEvaluacion);

    peticion.subscribe(()=>{
      this.editar=false;
      this.resetearFormulario();
      this.cargarEvaluaciones();
    })
  }

  editarEvaluacion(id:number):void{
    this.evaluacion_servicio.consultarEvaluacion(id).subscribe(evaluacion=>{
      this.nuevaEvaluacion={...evaluacion};
      this.editar=true;
    })
  }

  eliminarEvaluacion(id:number):void{
    this.evaluacion_servicio.eliminarEvaluacion(id).subscribe(()=>{
      this.cargarEvaluaciones();
    })
  }

  detallesEvaluacion(id:number):void{
    this.evaluacionDetalle=this.evaluacionDetalle=== id ? null:id;
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

  generarGrafica(){
      const ejeXFecha=this.evaluaciones.map(evaluacion=>new Date(evaluacion.fecha).toLocaleDateString());
      const ejeYPuntuacion=this.evaluaciones.map(evaluacion=>evaluacion.puntuacion);

      if(this.grafica)
      {
        this.grafica.destroy();
      }

      this.grafica=new Chart('graficaEvolucion',{
        type:'line',
        data:{
          labels:ejeXFecha,
          datasets:[
          {
            label:'Puntacion',
            data:ejeYPuntuacion,
            borderColor:'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension:0.3
          }
          ]
        },
      })
  }
}
export default EvaluacionesPeriodicasComponent;