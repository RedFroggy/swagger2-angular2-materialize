
import {Component} from '@angular/core';

@Component({
    selector:'swagger-app',
    template: require('./app.html'),
})

export class AppComponent {
    constructor() {
        console.log('Application initializing');
    }
}
