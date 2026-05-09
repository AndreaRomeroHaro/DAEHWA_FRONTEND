import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DiagnosticoFuncional } from '../../models/Diagnostico_Funcional';
import { DiagnosticoFuncionalService } from '../../services/diagnostico-funcional.service';

@Component({
  selector: 'app-diagnostico-funcional',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './diagnostico-funcional.component.html',
  styleUrl: './diagnostico-funcional.component.css',
})
export class DiagnosticoFuncionalComponent implements OnInit {

  diagnosticos: DiagnosticoFuncional[] =[];

  nuevoDiagnostico:DiagnosticoFuncional={
    id_diagnostico:0,
    fecha:new Date(),
    diagnostico_funcional:'',
    recomendaciones:''
  };

  diagnosticoDetalle:number |null=null;
  editar=false;

  constructor(private diagnosticoServicio:DiagnosticoFuncionalService){}
  
  ngOnInit(): void {
      this.cargarDiagnosticos();
  }

  cargarDiagnosticos():void{
    this.diagnosticoServicio.listarDiagnosticos().subscribe(diagnostico=>{this.diagnosticos=diagnostico})
  }

  transformarFecha(fecha:string):void{
    this.nuevoDiagnostico.fecha=new Date(fecha);
  }

  crearDiagnostico():void{
    const peticion= this.editar && this.nuevoDiagnostico.id_diagnostico
                    ?this.diagnosticoServicio.editarDiagnostico(this.nuevoDiagnostico.id_diagnostico,this.nuevoDiagnostico)
                    :this.diagnosticoServicio.crearDiagnostico(this.nuevoDiagnostico);
    
    peticion.subscribe(()=>{
        this.editar=false;
        this.resetearFormulario();
        this.cargarDiagnosticos();
      })
    }

  editarDiagnostico(id:number):void{
    this.diagnosticoServicio.consultarDiagnostico(id).subscribe(diagnostico=>{
      this.nuevoDiagnostico={...diagnostico};
      this.editar=true;
    })
  }

  eliminarDiagnostico(id:number):void{
    this.diagnosticoServicio.eliminarDiagnostico_Funcional(id).subscribe(()=>this.cargarDiagnosticos());
  }
  diagnosticosDetalle(id:number):void{
    this.diagnosticoDetalle=this.diagnosticoDetalle===id?null:id;
  }
  resetearFormulario():void{
      this.nuevoDiagnostico={
      id_diagnostico:0,
      fecha:new Date(),
      diagnostico_funcional:'',
      recomendaciones:''
    }
  }
}
export default DiagnosticoFuncionalComponent;