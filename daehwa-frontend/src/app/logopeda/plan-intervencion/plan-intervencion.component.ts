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
    frecuencia:1,
    duracion_sesiones:30,
  }

  plan_intervencion_seleccionado:Plan_Intervencion|null=null;
  editar=false;
  
  constructor(private plan_intervencionServicio:PlanIntervencionService){}

  ngOnInit(): void {
      this.cargarPlan_Intervencion();
  }

  cargarPlan_Intervencion():void{
    this.plan_intervencionServicio.listarPlan_Intervencion().subscribe(plan_intervencion=>{this.planes=plan_intervencion;});
  }

  crearPlan_Intervencion():void{
    if(this.editar && this.nuevoPlan_intervencion.id_plan_intervencion){
      this.plan_intervencionServicio.editarPlan_Intervencion(this.nuevoPlan_intervencion.id_plan_intervencion,this.nuevoPlan_intervencion).subscribe(()=>{
        this.editar=false;
        this.resetearFormulario();
        this.cargarPlan_Intervencion();
      });
    }else{
      this.plan_intervencionServicio.crearPlan_Intervencion(this.nuevoPlan_intervencion).subscribe(()=>{
        this.resetearFormulario();
        this.cargarPlan_Intervencion();
      });
    }
  }

  editarPlan_Intervencion(id:number):void{
    this.plan_intervencionServicio.consultarPlan_Intervencion(id).subscribe(plan_intervencion=>{
      this.nuevoPlan_intervencion={...plan_intervencion};
      this.editar=true;
    })
  }
  consultarPlan_Intervencion(id:number):void{
    this.plan_intervencionServicio.consultarPlan_Intervencion(id).subscribe(plan_intervencion=>{
      this.plan_intervencion_seleccionado=plan_intervencion;
    });
  }

  resetearFormulario():void{
    this.nuevoPlan_intervencion={
      id_plan_intervencion:0,
      objetivos_especificos:'',
      contenidos:'',
      frecuencia:1,
      duracion_sesiones:30,
    }
  }
}
export default PlanIntervencionComponent;