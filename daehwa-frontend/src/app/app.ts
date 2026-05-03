import { Component, OnInit,inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthUserService } from './services/auth-user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private auth=inject(AuthUserService);
  ngOnInit(): void {
      this.auth.cargarUsuarioDesdeStorage();
  }
}
