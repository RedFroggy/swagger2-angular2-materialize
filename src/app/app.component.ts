
import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES,RouteConfig,Route,Router} from 'angular2/router';
import {Header} from './header/header';
import {Home} from './home/home';
import {ApiDocDetail} from './apidoc/detail/detail';
import {ApiMain} from './apidoc/main/api.main';

@Component({
    selector:'swagger-app',
    template:require('./app.html'),
    directives: [ROUTER_DIRECTIVES,Header]
})
@RouteConfig([
    new Route({path: '/home', component: Home, name: 'Home',useAsDefault: true}),
    new Route({path: '/apis/...', component: ApiMain, name: 'Apis'})
])
export class AppComponent {
    constructor() {
        console.log('Application initializing');
    }
}
