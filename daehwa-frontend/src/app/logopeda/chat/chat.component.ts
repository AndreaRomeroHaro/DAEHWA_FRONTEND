import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { AuthUserService } from '../../services/authuser.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {

  mensajes: any[] = [];
  mensajeNuevo = '';

  idFamiliar = 0;     
  idLogopeda = 0; 

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private authUserService: AuthUserService
  ) {}

  ngOnInit(): void {
    this.idFamiliar = Number(this.route.snapshot.paramMap.get('idFamiliar'));
    this.idLogopeda = this.authUserService.getUsuarioId();

    this.cargarMensajes();
  }

  cargarMensajes(): void {
  this.chatService.obtenerMensajes(this.idLogopeda, this.idFamiliar)
    .subscribe(m => this.mensajes = m);
  }


  enviarMensaje(): void {
    if (!this.mensajeNuevo.trim()) return;

    const mensaje = {
      emisor: this.idLogopeda,
      receptor: this.idFamiliar,
      texto: this.mensajeNuevo,
    };

    this.chatService.enviarMensaje(mensaje).subscribe(() => {
      this.mensajeNuevo = '';
      this.cargarMensajes();
    });
  }
}

export default ChatComponent;
