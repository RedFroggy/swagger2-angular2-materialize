import {Component} from '@angular/core';
import {LeftMenu} from './left-menu/left-menu';

@Component({
    selector:'doc-main',
    directives:[LeftMenu],
    template:`
    <div class="row">
        <left-menu></left-menu>
        <router-outlet></router-outlet>
    </div>`
})

export class Main {}
