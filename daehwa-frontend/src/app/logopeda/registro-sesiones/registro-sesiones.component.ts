import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sesion } from '../../models/sesion';

@Component({
  selector: 'app-registro-sesiones',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './registro-sesiones.component.html',
  styleUrl: './registro-sesiones.component.css',
})
export class RegistroSesionesComponent {
  sesiones:Sesion[]=[];

  nuevaSesion:Sesion={
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
  campoMultimediaTemporal:File[]=[];

  subirMultimedia(event:any){
    this.campoMultimediaTemporal=Array.from(event.target.file);
  }

  agregarArea(){
    if(this.campoAreaTemporal.trim()!==''){
      this.nuevaSesion.areas_lenguaje.push(this.campoAreaTemporal.trim());
      this.campoAreaTemporal='';
    }
  }

  registrarSesion(){
    if(!this.nuevaSesion.fecha || !this.nuevaSesion.actividades)
    {
      return;
    }
    this.nuevaSesion.id_sesion=Date.now();
    this.nuevaSesion.multimedia=this.campoMultimediaTemporal;
    this.sesiones.push({...this.nuevaSesion})

    this.nuevaSesion={
      id_sesion:0,
      fecha:new Date(),
      actividades:'',
      areas_lenguaje:[],
      logros:'',
      aspectos_mejorar:'',
      observaciones:'',
      multimedia:[]
    }
    this.campoMultimediaTemporal=[];
  }

  sesionSeleccionada:Sesion|null=null;

  consultarSesion(id:number){
    this.sesionSeleccionada=this.sesiones.find(sesion=>sesion.id_sesion===id)||null;
  }

  eliminarSesion(id:number){
    this.sesiones=this.sesiones.filter(sesion=>sesion.id_sesion!==id);
  }
  actualizarFecha(fecha:string){
    this.nuevaSesion.fecha=new Date(fecha);
  }
}
export default RegistroSesionesComponent;