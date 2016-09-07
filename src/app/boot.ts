import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/add/operator/map';
import {AppModule} from "./modules/app/app.module";


//Styles css
import '../assets/styles/styles.css';

platformBrowserDynamic().bootstrapModule(AppModule);