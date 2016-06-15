
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES,RouteConfig,Route} from '@angular/router-deprecated';
import {Header} from './components/header/header';
import {Home} from './components/home/home';
import {Main} from './components/main/main';
import {Settings} from './components/settings/settings';

@Component({
    selector:'swagger-app',
    template:require('./app.html'),
    directives: [ROUTER_DIRECTIVES,Header]
})
@RouteConfig([
    new Route({path: '/home', component: Home, name: 'Home',useAsDefault: true}),
    new Route({path: '/apis/...', component: Main, name: 'Apis'}),
    new Route({path: '/settings', component: Settings, name:'Settings'})
])
export class AppComponent {
    constructor() {
        console.log('Application initializing');
    }
}
