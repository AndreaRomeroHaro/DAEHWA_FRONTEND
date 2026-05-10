import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlanIntervencionService } from '../../services/plan-intervencion.service';
import { Plan_Intervencion } from '../../models/Plan_Intervencion';

@Component({
  selector: 'app-plan-intervencion',
  imports: [CommonModule],
  templateUrl: './plan-intervencion.component.html',
  styleUrl: './plan-intervencion.component.css',
})
export class PlanIntervencionComponent implements OnInit {
  idPaciente!:number;
  plan_intervencion:Plan_Intervencion|null=null;
  cargando=true;
  error:string|null=null;

  constructor(private route: ActivatedRoute,private planService:PlanIntervencionService){}

  ngOnInit(): void {
    this.idPaciente=Number(this.route.snapshot.paramMap.get('idPaciente'));
    this.cargarSesiones();
    this.cargando=false;   
  }

  cargarSesiones():void{
    this.cargando=true;
      this.error=null;

    this.planService.consultarPlan_Intervencion(this.idPaciente).subscribe({
        next: (data:Plan_Intervencion) => {
          this.plan_intervencion=data;
          this.cargando=false;
        },
        error:()=>{
          this.error="No se puede cargar las sesiones"
      }
      })
    }
}
export default PlanIntervencionComponent;