import {Component} from '@angular/core';

@Component({
    selector:'doc-main',
    template:`
    <div class="row">
        <left-menu></left-menu>
        <router-outlet></router-outlet>
    </div>`
})

export class Main {}
