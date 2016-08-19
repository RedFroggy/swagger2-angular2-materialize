import {Routes, RouterModule} from '@angular/router';
import {ApiDocList} from "../list/list";
import {ApiDocDetail} from "../detail/detail";
import {Main} from "./main";

const mainRoutes: Routes = [
    {   path: 'apis',
        component: Main,
        children: [
            {path: ':path/detail/:operation', component: ApiDocDetail},
            {path: ':path', component: ApiDocList}
        ]
    }
]

export const mainRouting = RouterModule.forChild(mainRoutes);