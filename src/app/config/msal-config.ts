import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { Configuration, InteractionType, LogLevel } from '@azure/msal-browser';
import { environment } from '../../environments/environment.development';

export const msalConfig: Configuration = {
    auth: {
        clientId: environment.msal.clientId, // Your Microsoft app's client ID
        authority: `https://login.microsoftonline.com/${environment.msal.tenantId}`,
        redirectUri: environment.msal.redirectUri, // Your redirect URI
        postLogoutRedirectUri: environment.msal.redirectUri,
        clientCapabilities: ['CP1']
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if (containsPii) {
                    return
                }
                console.log(message)
            },
            logLevel: LogLevel.Info,
            piiLoggingEnabled: false
        },
    },
}

export const msalGuardConfig: MsalGuardConfiguration = {
    interactionType: InteractionType.Popup, // Or InteractionType.Popup
    authRequest: {
      scopes: ['user.read'],
    },
}

export const msalInterceptorConfig: MsalInterceptorConfiguration = {
    interactionType: InteractionType.Popup,
    protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']],
    ])
}