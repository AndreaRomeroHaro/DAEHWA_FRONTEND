import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistroSesion } from '../../models/Registro_Sesiones';
import { RegistroSesionService } from '../../services/registro-sesiones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro-sesiones',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './registro-sesiones.component.html',
  styleUrl: './registro-sesiones.component.css',
})
export class RegistroSesionesComponent implements OnInit {
  sesiones:RegistroSesion[]=[];

  nuevaSesion:RegistroSesion={
    id_sesion:0,
    fecha:new Date(),
    actividades:'',
    areas:[],
    logros:'',
    aspectos_mejorar:'',
    observaciones:'',
    multimedia:[]
  };

  registroDetalle:number |null=null;
  editar=false;

  idPaciente=0;

  constructor(private sesionServicio:RegistroSesionService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.idPaciente=Number(this.route.snapshot.paramMap.get('idPaciente'))  
    this.cargarSesiones();
  }

  cargarSesiones():void{
    this.sesionServicio.listarRegistro_Sesiones(this.idPaciente)
    .subscribe(sesion => {
      this.sesiones = sesion;
    });
  }
  
  transformarFecha(fecha:string):void{
    this.nuevaSesion.fecha=new Date(fecha);
  }

  transformarAreas(areas:string):void{
    this.nuevaSesion.areas=areas.split(', ').map(area=>area.trim());
  }

  crearSesion():void{
    const peticion=this.editar && this.nuevaSesion.id_sesion 
    ? this.sesionServicio.editarRegistro_Sesiones(this.nuevaSesion.id_sesion,this.nuevaSesion)
    : this.sesionServicio.crearRegistro_Sesiones(this.nuevaSesion);
  
    peticion.subscribe(()=>{
      this.editar=false;
      this.resetearFormulario();
      this.cargarSesiones();
    })
  }

  editarSesion(id:number):void{
    this.sesionServicio.consultarRegistro_Sesiones(id).subscribe(sesion=>{
      this.nuevaSesion={...sesion};
      this.editar=true;
    })
  }

  eliminarSesion(id:number):void{
    this.sesionServicio.eliminarRegistro_Sesiones(id).subscribe(()=>{
      this.cargarSesiones();
    })
  }

  detallesSesion(id:number):void{
    this.registroDetalle=this.registroDetalle===id ? null:id;
  }
  
  subirMultimedia(event:any):void{
    const archivos=event.target.files;
    this.nuevaSesion.multimedia=Array.from(archivos)
  }

  resetearFormulario():void{
    this.nuevaSesion={
      id_sesion:0,
      fecha:new Date(),
      actividades:'',
      areas:[],
      logros:'',
      aspectos_mejorar:'',
      observaciones:'',
      multimedia:[]
    };
  }
}
export default RegistroSesionesComponent;