import {Routes, RouterModule} from '@angular/router';
import {Home} from "./home/home";
import {Main} from "../main/main";
import {Settings} from "./settings/settings";
import {ModuleWithProviders} from "@angular/core";

const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'settings', component: Settings},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    // {path: 'apis', loadChildren: 'app/modules/main/main.module#MainModule'}
]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);