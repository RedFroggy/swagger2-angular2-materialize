import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home';
import {SettingsComponent} from './settings/settings';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'settings', component: SettingsComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
