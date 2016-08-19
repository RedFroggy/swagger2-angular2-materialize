
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES,RouteConfig,Route} from '@angular/router-deprecated';
import {Header} from './components/header/header';
import {Home} from './components/home/home';
import {Main} from './components/main/main';
import {Settings} from './components/settings/settings';
import {Routes, RouterModule} from '@angular/router'

@Component({
    selector:'swagger-app',
    templateUrl: './app/app.html',
    directives: [Header]
})

export class AppComponent {
    constructor() {
        console.log('Application initializing');
    }
}
