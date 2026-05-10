import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mensaje } from '../../models/Chat';
import { ChatService } from '../../services/chat.service';
import { AuthUserService } from '../../services/authuser.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone:true,
  imports:[CommonModule,FormsModule,],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit{
  mensajes:Mensaje[]=[];
  mensajeNuevo='';
  idFamiliar=0;
  idLogopeda:number=0;

  constructor(private chatService:ChatService,private authUser:AuthUserService,private route:ActivatedRoute){}

  ngOnInit(): void {
      this.idLogopeda=this.authUser.getUsuarioId();
      this.idFamiliar=Number(this.route.snapshot.paramMap.get('idFamiliar'));
      this.cargarMensajes();
  }

  cargarMensajes():void{
    this.chatService.obtenerMensaje(this.idFamiliar).subscribe(mensaje=>this.mensajes=mensaje);
  }

  enviarMensaje():void{
    if(!this.mensajeNuevo.trim()){
      return;
    }
    const mensaje:Mensaje={
      id_mensaje:0,
      id_emisor:this.idLogopeda,
      id_receptor:this.idFamiliar,
      texto:this.mensajeNuevo,
      fecha:new Date()
    };

    this.chatService.enviarMensaje(mensaje).subscribe(()=>{
      this.mensajeNuevo='';
      this.cargarMensajes();
    })
  }
}
export default ChatComponent;