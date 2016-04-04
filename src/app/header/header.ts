
import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
    selector:'header',
    template:require('./header.html')
})
export class Header {
    constructor(private router:Router) {}
    goToPage($event:Event,...apis):void {
        $event.preventDefault();
        apis.push({path:1});
        this.router.navigate(apis);
    }
}
