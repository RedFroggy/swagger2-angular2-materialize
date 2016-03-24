import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS,HashLocationStrategy,LocationStrategy} from 'angular2/router';
import {provide} from 'angular2/core';

import 'rxjs/add/operator/map';
import {ApiDocService} from './apidoc/apidoc.service';

bootstrap(AppComponent,[
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    ApiDocService,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
