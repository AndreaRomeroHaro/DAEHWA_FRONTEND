import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Diagnostico } from '../../models/Diagnostico';

@Component({
  selector: 'app-diagnostico-funcional',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './diagnostico-funcional.component.html',
  styleUrl: './diagnostico-funcional.component.css',
})
export class DiagnosticoFuncionalComponent {
  diagnostico:Diagnostico={
    fecha:'',
    diagnostico_funcional:'',
    recomendaciones:''
  };

  guardarDiagnostico(){
    console.log('Diagnóstico guardado:',this.diagnostico);
  }
}
export default DiagnosticoFuncionalComponent;