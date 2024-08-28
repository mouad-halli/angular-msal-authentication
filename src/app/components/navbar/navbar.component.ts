import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../core/models/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    user$

    constructor(private authService: AuthenticationService, private router: Router) {
        this.user$ = this.authService.user$
    }

    logout = () => {

        this.authService.logout().subscribe({
            next: () => console.log('user logged out'),
            error: (error) => console.log('error happened while logging out', error)
            
        })
    }

}
