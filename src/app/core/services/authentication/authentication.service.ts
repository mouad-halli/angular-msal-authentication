import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, } from 'rxjs';
import { User } from '../../models/interfaces/user';
import { AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    private userSubject = new BehaviorSubject<User | null>(null)
    public user$ = this.userSubject.asObservable()

    constructor(private msalService: MsalService) {
        this.initializeUser()
    }

    private initializeUser = () => {

        const userJsonString = localStorage.getItem('account')

        if (!userJsonString)
            return this.userSubject.next(this.getUserData())

        const account: AccountInfo = JSON.parse(userJsonString)
        this.msalService.instance.setActiveAccount(account)
        this.userSubject.next({
            firstname: account.name?.split(' ')[0] ?? '',
            lastname: account.name?.split(' ')[1] ?? '',
            email: account.username
        })
    }

    microsoftLoginPopup = () => {
        
        return this.msalService.loginPopup().pipe(
            tap((result: AuthenticationResult) => {

                const { homeAccountId, environment, tenantId,
                    username, localAccountId, name } = result.account

                const user: User = {
                    firstname: name?.split(' ')[0] ?? '',
                    lastname: name?.split(' ')[1] ?? '',
                    email: username
                }

                this.msalService.instance.setActiveAccount(result.account)
                this.userSubject.next(user)

                localStorage.setItem('account', JSON.stringify({
                    homeAccountId, environment, tenantId,
                    username, localAccountId, name
                }))

                return result.account
            })
        )
    }

    logout = () => {
        return this.msalService.logoutPopup().pipe(
            tap(() => {
                this.msalService.instance.setActiveAccount(null)
                this.userSubject.next(null)
                localStorage.removeItem('account')
            })
        )
    }


    isUserLoggedIn = () => {
        return this.msalService.instance.getActiveAccount() != null
    }

    getUserData = (): User | null => {
        const userMsAccount = this.msalService.instance.getActiveAccount()

        if (userMsAccount === null)
            return null

        return {
            firstname: userMsAccount.name?.split(' ')[0] ?? '',
            lastname: userMsAccount.name?.split(' ')[1] ?? '',
            email: userMsAccount.username
        }
    }

}
