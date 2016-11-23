
import {Component} from '@angular/core';
import {ThemeableComponent} from './themeable.component';

@Component({
    selector: 'swagger-app',
    template: require('./app.html'),
})

export class AppComponent extends ThemeableComponent {
    constructor() {
        super();
        console.log('Application initializing');
    }
}
