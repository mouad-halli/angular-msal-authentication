import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { MicrosoftLoginButtonComponent } from './shared/reusableComponents/microsoft-login-button/microsoft-login-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MsalModule, MsalService, MsalRedirectComponent, MSAL_INSTANCE } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, msalGuardConfig, msalInterceptorConfig } from './config/msal-config';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MicrosoftLoginButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MsalModule.forRoot(new PublicClientApplication(msalConfig), msalGuardConfig, msalInterceptorConfig),
  ],
  providers: [
    provideHttpClient(),
    {
        provide: MSAL_INSTANCE,
        useFactory: () => new PublicClientApplication(msalConfig),
    },
    MsalService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
