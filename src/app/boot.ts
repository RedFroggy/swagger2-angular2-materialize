import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {provide} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

import 'rxjs/add/operator/map';
import {ApiDocService} from './services/apidoc.service';

//Styles css
import '../assets/styles/styles.css';

platformBrowserDynamic().bootstrapModule(AppModule);
//
// export function main() {
//     return bootstrap(AppComponent, [
//         HTTP_PROVIDERS,
//         ROUTER_PROVIDERS,
//         ApiDocService,
//         disableDeprecatedForms(),
//         provideForms(),
//         provide(LocationStrategy, {useClass: HashLocationStrategy}),
//     ]);
// }

// document.addEventListener('DOMContentLoaded', () => main());
