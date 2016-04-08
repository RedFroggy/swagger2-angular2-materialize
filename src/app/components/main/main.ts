import {Component} from 'angular2/core';
import {LeftMenu} from '../left-menu/left-menu';
import {ApiDocList} from '../list/list';
import {ApiDocDetail} from '../detail/detail';
import {ApiDocService} from '../../services/apidoc.service';
import {PathsObject,OperationObject} from '../../model/apidoc';
import {RouteConfig,Route,ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector:'doc-main',
    directives:[LeftMenu,ROUTER_DIRECTIVES],
    template:`
    <div class="row">
        <left-menu></left-menu>
        <router-outlet></router-outlet>
    </div>`
})
@RouteConfig([
    new Route({path: '/:path', component: ApiDocList, name: 'ApiDocList', useAsDefault: true}),
    new Route({path: '/:path/detail/:operation', component: ApiDocDetail, name: 'ApiDocDetail',})
])
export class Main {}
