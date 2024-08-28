# Microsoft Authentication with Angular

This project demonstrates how to integrate Microsoft authentication into an Angular application using MSAL (Microsoft Authentication Library). The application allows users to log in with their Microsoft accounts and retrieve user data for backend authentication purposes.

## Features

- Microsoft authentication using MSAL
- PKCE (Proof Key for Code Exchange) support
- Reactive user state management
- User data persistence across page reloads

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- Angular CLI (version 14 or higher)
- An Azure AD application registration (for Microsoft authentication)

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mouad-halli/angular-msal-authentication.git
   cd angular-msal-authentication
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```
3. **Configure MSAL**

    Replace YOUR_AZURE_APP_CLIENT_ID and YOUR_AZURE_APP_TENANT_ID and REDIRECT_URI and YOUR_BACKEND_URL in the src/environments/environment.development.ts file with your Azure AD application credentials.
   
   ```javascript
      export const environment = {
        production: false,
        API_URL: 'YOUR_BACKEND_URL',
        msal: {
          clientId: 'YOUR_AZURE_APP_CLIENT_ID',
          tenantId: ' YOUR_AZURE_APP_TENANT_ID',
          redirectUri: 'REDIRECT_URI'
        }
      };
   ```

2. **Run the Application**

   ```bash
   npm run start
   ```

## Authentication Flow

1. **Login**

   Users can log in using their Microsoft account via a popup window. The `AuthenticationService` manages the login process and stores non-sensitive user data in `localStorage`.

2. **Logout**

   Users can log out, which clears the user data from `localStorage` and updates the application state.

3. **User Data**

   The application retrieves user data (name, email, ...) from the active account and displays it in the navbar.

## Services

### AuthenticationService

- **`microsoftLoginPopup()`**: Initiates the login process via a popup.
- **`logout()`**: Logs out the user and clears stored data.
- **`getUserData()`**: Retrieves non-sensitive user data.
- **`isUserLoggedIn()`**: Checks if the user is logged in.

### Navbar Component

To display the user's email in the navbar, use the `AuthenticationService` to fetch user data and manage authentication state.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to contribute to this project.

## Acknowledgments

- [MSAL Angular](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/angular) - Microsoft Authentication Library for Angular
- [Microsoft Identity Platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/) - Authentication and Authorization services
