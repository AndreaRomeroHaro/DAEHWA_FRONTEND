import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plan_Intervencion } from '../../models/Plan_Intervencion';
import { PlanIntervencionService } from '../../services/plan-intervencion.service';

@Component({
  selector: 'app-plan-intervencion',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './plan-intervencion.component.html',
  styleUrl: './plan-intervencion.component.css',
})
export class PlanIntervencionComponent implements OnInit{
  
  planes:Plan_Intervencion[]=[];

  nuevoPlan_intervencion:Plan_Intervencion={
    id_plan_intervencion:0,
    objetivos_especificos:'',
    contenidos:'',
    frecuencia:0,
    duracion_sesiones:0,
  }

  detallePlan_Intervencion: number |null=null;
  editar=false;
  
  constructor(private plan_intervencionServicio:PlanIntervencionService){}

  ngOnInit(): void {
      this.cargarPlan_Intervencion();
  }

  cargarPlan_Intervencion():void{
    this.plan_intervencionServicio.listarPlan_Intervencion().subscribe(plan_intervencion=>{this.planes=plan_intervencion;});
  }

  crearPlan_Intervencion():void{
    const peticion=this.editar && this.nuevoPlan_intervencion.id_plan_intervencion
    ? this.plan_intervencionServicio.editarPlan_Intervencion(this.nuevoPlan_intervencion.id_plan_intervencion,this.nuevoPlan_intervencion)
    :this.plan_intervencionServicio.crearPlan_Intervencion(this.nuevoPlan_intervencion);

    peticion.subscribe(()=>{
      this.editar=false;
      this.resetearFormulario();
      this.cargarPlan_Intervencion();
    })
  }

  editarPlan_Intervencion(id:number):void{
    this.plan_intervencionServicio.consultarPlan_Intervencion(id).subscribe(plan_intervencion=>{
      this.nuevoPlan_intervencion={...plan_intervencion};
      this.editar=true;
    })
  }

  eliminarPlan(id:number):void{
    this.plan_intervencionServicio.eliminarPlan_Intervencion(id).subscribe(()=>this.cargarPlan_Intervencion());
  }
  
  detallePlan(id:number):void{
    this.detallePlan_Intervencion=this.detallePlan_Intervencion===id?null:id;
  }

  resetearFormulario():void{
    this.nuevoPlan_intervencion={
      id_plan_intervencion:0,
      objetivos_especificos:'',
      contenidos:'',
      frecuencia:0,
      duracion_sesiones:0,
    }
  }
}
export default PlanIntervencionComponent;