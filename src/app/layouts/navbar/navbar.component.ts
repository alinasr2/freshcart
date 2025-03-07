import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, inject, input } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogin = input<boolean>(true);
  private readonly authService = inject(AuthService);
  logOut():void
  {
    this.authService.logOut();
  }
}
