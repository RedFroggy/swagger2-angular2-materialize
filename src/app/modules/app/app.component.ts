
import {Component} from '@angular/core';

@Component({
    selector:'swagger-app',
    templateUrl: './app/modules/app/app.html',
})

export class AppComponent {
    constructor() {
        console.log('Application initializing');
    }
}
