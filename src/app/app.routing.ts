import {Routes, RouterModule} from '@angular/router';
import {Home} from "./components/home/home";
import {Main} from "./components/main/main";
import {Settings} from "./components/settings/settings";

const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'settings', component: Settings},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
]

export const routing = RouterModule.forRoot(routes);