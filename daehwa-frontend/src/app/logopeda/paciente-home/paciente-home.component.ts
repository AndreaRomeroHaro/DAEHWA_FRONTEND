import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-paciente-home',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './paciente-home.component.html',
  styleUrl: './paciente-home.component.css',
})
export class PacienteHomeComponent {
  idPaciente=0;

  constructor(private route:ActivatedRoute,private router:Router){
    this.idPaciente=Number(this.route.snapshot.paramMap.get('idPaciente'));
  }

  ir(ruta:string){
    this.router.navigate([`/logopeda/paciente/${this.idPaciente}/${ruta}`]);
  }
  
}
export default PacienteHomeComponent;