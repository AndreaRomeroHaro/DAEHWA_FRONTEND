import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistroSesion } from '../../models/Registro_Sesiones';
import { RegistroSesionService } from '../../services/registro-sesiones.service';

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
    areas_lenguaje:[],
    logros:'',
    aspectos_mejorar:'',
    observaciones:'',
    multimedia:[]
  };

  campoAreaTemporal:string='';
  sesionSeleccionada:RegistroSesion |null=null;
  editar=false;

  constructor(private sesionServicio:RegistroSesionService){}

  ngOnInit(): void {
      this.cargarSesiones();
  }

  cargarSesiones():void{
    this.sesionServicio.listarRegistro_Sesiones().subscribe(sesion=>{this.sesiones=sesion;});
  }
  
  actualizarFecha(fecha:string):void{
    this.nuevaSesion.fecha=new Date(fecha);
  }

  agregarArea():void{
    if(this.campoAreaTemporal.trim()!==''){
      this.nuevaSesion.areas_lenguaje.push(this.campoAreaTemporal.trim())
    }
  }
  eliminarArea(area:number):void{
    this.nuevaSesion.areas_lenguaje.splice(area,1);
  }

  subirMultimedia(event:any):void{
    const archivos=event.target.files;
    this.nuevaSesion.multimedia=Array.from(archivos)
  }

  crearSesion():void{
    if(this.editar && this.nuevaSesion.id_sesion){
      this.sesionServicio.editarRegistro_Sesiones(this.nuevaSesion.id_sesion,this.nuevaSesion).subscribe(()=>{
        this.editar=false;
        this.resetearFormulario();
        this.cargarSesiones();
      });
    }else{
      this.sesionServicio.crearRegistro_Sesiones(this.nuevaSesion).subscribe(()=>{
        this.resetearFormulario();
        this.cargarSesiones();
      });
    }
  }

  editarSesion(id:number):void{
    this.sesionServicio.consultarRegistro_Sesiones(id).subscribe(sesion=>{
      this.nuevaSesion={...sesion};
      this.editar=true;
    })
  }
  consultarSesion(id:number):void{
    this.sesionServicio.consultarRegistro_Sesiones(id).subscribe(sesion=>{
      this.sesionSeleccionada=sesion;
    });
  }

  resetearFormulario():void{
    this.nuevaSesion={
      id_sesion:0,
      fecha:new Date(),
      actividades:'',
      areas_lenguaje:[],
      logros:'',
      aspectos_mejorar:'',
      observaciones:'',
      multimedia:[]
    };
  }
}
export default RegistroSesionesComponent;