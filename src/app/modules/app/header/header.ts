import {Component} from '@angular/core';
import {ApiDocService} from '../../../services/apidoc.service';
import {Router} from '@angular/router';

@Component({
    selector: 'header',
    template: require('./header.html'),
})
export class HeaderComponent {
    constructor(private router: Router, private apiDocService: ApiDocService) {}
    goToPage($event: Event, ...route: Array<any>): void {
        $event.preventDefault();

        route =
            route[0] === 'apis'
            ? [...route, 1]
            :  route;

        console.log(this.router.navigate(route));
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
