
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES,RouteConfig,Route} from '@angular/router-deprecated';
import {Header} from './header/header';
import {Home} from './home/home';
import {Main} from '../main/main';
import {Settings} from './settings/settings';
import {Routes, RouterModule} from '@angular/router'

@Component({
    selector:'swagger-app',
    templateUrl: './app/modules/app/app.html',
    directives: [Header]
})

export class AppComponent {
    constructor() {
        console.log('Application initializing');
    }
}
