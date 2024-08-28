import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private msalService: MsalService) {}

    async ngOnInit() {
        await this.msalService.instance.initialize();
    }

}
