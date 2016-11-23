import {Component} from '@angular/core';
import {ApiDocService} from '../../../services/apidoc.service';
import {Router} from '@angular/router';
import {ThemeableComponent} from '../themeable.component';

@Component({
    selector: 'header',
    template: require('./header.html'),
})
export class HeaderComponent extends ThemeableComponent {
    constructor(private router: Router, private apiDocService: ApiDocService) {
        super();
        $('#mobileHomeLink').addClass('active');
    }
    goToPage($event: Event, ...route: Array<any>): void {
        $event.preventDefault();

        route =
            route[0] === 'apis'
            ? [...route, 1]
            :  route;

        this.router.navigate(route);
    }
    onChangeApi(event: Event): void {
        event.preventDefault();
        $('#modal1').openModal();
    }
    onCloseModal(event: Event): void {
        event.preventDefault();
        $('#modal1').closeModal();
    }
}
