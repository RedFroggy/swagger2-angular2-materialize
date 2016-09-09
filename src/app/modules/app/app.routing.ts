import {Routes, RouterModule} from '@angular/router';
import {Home} from "./home/home";
import {Settings} from "./settings/settings";
import {ModuleWithProviders} from "@angular/core";

const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'settings', component: Settings},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);