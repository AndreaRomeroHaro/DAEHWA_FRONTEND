import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plan_Intervencion } from '../../models/Plan_Intervencion';

@Component({
  selector: 'app-plan-intervencion',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './plan-intervencion.component.html',
  styleUrl: './plan-intervencion.component.css',
})
export class PlanIntervencionComponent {
  plan_intervencion:Plan_Intervencion={
    objetivos_especificos:'',
    contenidos:'',
    frecuencia:1,
    duracion_sesiones:30,
  }

  guardarPlan_Intervencion(){
    console.log('Plan de Intervención guardado',this.plan_intervencion)
  }
}
export default PlanIntervencionComponent;