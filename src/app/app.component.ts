
import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES,RouteConfig,Route,Router} from 'angular2/router';
import {Header} from './components/header/header';
import {Home} from './components/home/home';
import {ApiDocDetail} from './components/detail/detail';
import {Main} from './components/main/main';

@Component({
    selector:'swagger-app',
    template:require('./app.html'),
    directives: [ROUTER_DIRECTIVES,Header]
})
@RouteConfig([
    new Route({path: '/home', component: Home, name: 'Home',useAsDefault: true}),
    new Route({path: '/apis/...', component: Main, name: 'Apis'})
])
export class AppComponent {
    constructor() {
        console.log('Application initializing');
    }
}
