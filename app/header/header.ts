
import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
    selector:'header',
    templateUrl:'./app/header/header.html'
})
export class Header {
    constructor(private router:Router) {}
    goToPage($event:Event,pageName:string):void {
        $event.preventDefault();
        this.router.navigate([pageName]);
    }
}
