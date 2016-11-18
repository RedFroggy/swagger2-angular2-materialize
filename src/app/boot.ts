import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppModule} from './modules/app/app.module';

import 'rxjs/add/operator/map';

// Styles css
import '../assets/styles/styles.css';

function main() {
    if (process.env.ENV === 'production') {
        enableProdMode();
    }
    platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
