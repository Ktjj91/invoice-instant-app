import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {initFlowbite} from 'flowbite';
import {AuthService} from './services/authservice/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements  OnInit {
   authService = inject(AuthService);
  private router:Router = inject(Router);

  ngOnInit(): void {
    initFlowbite();
    console.  log(this.authService.isLoggedIn());
  }



  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }






}
