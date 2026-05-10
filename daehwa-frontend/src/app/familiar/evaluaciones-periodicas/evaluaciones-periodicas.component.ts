import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EvaluacionPeriodicaService } from '../../services/evaluaciones-periodica.service';
import { EvaluacionPeriodica } from '../../models/Evaluaciones_Periodicas';

@Component({
  selector: 'app-evaluaciones-periodicas',
  imports: [CommonModule],
  templateUrl: './evaluaciones-periodicas.component.html',
  styleUrl: './evaluaciones-periodicas.component.css',
})
export class EvaluacionesPeriodicasComponent implements OnInit{

  idPaciente!:number;
  evaluaciones:EvaluacionPeriodica[]=[];
  cargando=true;
  error:string|null=null;
  detalleEvaluacion:number|null=null;

  constructor(private route: ActivatedRoute,private evaluacionService:EvaluacionPeriodicaService){}

  ngOnInit(): void {
      this.idPaciente=Number(this.route.snapshot.paramMap.get('idPaciente'));
      this.cargarSesiones();
  }

  cargarSesiones():void{
    this.cargando=true;
    this.error=null;

    this.evaluacionService.listarEvaluacion(this.idPaciente).subscribe({
      next:(data:EvaluacionPeriodica[]) => {
         this.evaluaciones=data;
        this.cargando=false;
      },
     error:()=>{
         this.error="No se puede cargar las sesiones";
         this.cargando=false;
       }
    })

  }

  detalle_Registro(id: number):void{
    this.detalleEvaluacion=this.detalleEvaluacion===id?null:id;
  }

}
export default EvaluacionesPeriodicasComponent;