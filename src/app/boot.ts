import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {provide} from '@angular/core';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';

import 'rxjs/add/operator/map';
import {ApiDocService} from './services/apidoc.service';

//Styles css
import '../assets/styles/styles.css';

export function main() {
    return bootstrap(AppComponent, [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        ApiDocService,
        provide(LocationStrategy, {useClass: HashLocationStrategy}),
    ]);
}

document.addEventListener('DOMContentLoaded', () => main());
