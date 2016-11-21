import {Routes, RouterModule} from '@angular/router';
import {ApiDocListComponent} from './list/list';
import {ApiDocDetailComponent} from './detail/detail';
import {MainComponent} from './main';
import {ModuleWithProviders} from '@angular/core';

const mainRoutes: Routes = [
    {   path: 'apis',
        component: MainComponent,
        children: [
            {path: ':path/detail/:operation', component: ApiDocDetailComponent},
            {path: ':path', component: ApiDocListComponent}
        ]
    }
];

export const mainRouting: ModuleWithProviders = RouterModule.forChild(mainRoutes);
