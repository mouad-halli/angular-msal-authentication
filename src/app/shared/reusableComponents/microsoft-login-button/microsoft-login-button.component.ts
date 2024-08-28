import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';

@Component({
  selector: 'microsoft-login-button',
  templateUrl: './microsoft-login-button.component.html',
  styleUrl: './microsoft-login-button.component.css'
})
export class MicrosoftLoginButtonComponent {

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private authService: AuthenticationService
    ) {
        this.matIconRegistry.addSvgIcon(
            'microsoft-icon-svg',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/microsoft-logo.svg')
        )
    }

    login() {
        this.authService.microsoftLoginPopup().subscribe({
            next: (userAccount) => console.log('logged in successfully', userAccount),
            error: (error) => console.log('error happened when login in', error)
        })
    }

}
