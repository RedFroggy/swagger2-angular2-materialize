/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/materialize-css/index.d.ts" />
/// <reference path="../../node_modules/@types/chartjs/index.d.ts" />
/// <reference path="../../node_modules/@types/lodash/index.d.ts" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/add/operator/map';
import {AppModule} from './modules/app/app.module';


//Styles css
import '../assets/styles/styles.css';

function main() {
    platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
