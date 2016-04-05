import {Directive,ElementRef,HostListener,AfterViewInit} from 'angular2/core';
import {Router} from 'angular2/router';

@Directive({
    selector:'ul[materialize-header]'
})
export class MaterializeHeader implements AfterViewInit {
    constructor(private el:ElementRef,private router:Router) {}
    ngAfterViewInit():void {
        if(this.router.lastNavigationAttempt.indexOf('home') !== -1) {
            $(this.el.nativeElement).find('#homeLink').addClass('active red darken-4');
            $(this.el.nativeElement).find('#mobileHomeLink').addClass('active red darken-4');
        }
        if(this.router.lastNavigationAttempt.indexOf('apis') !== -1) {
            $(this.el.nativeElement).find('#apiLink').addClass('active red darken-4');
            $(this.el.nativeElement).find('#mobileApiLink').addClass('active red darken-4 white-text');
        }
    }
    @HostListener('click', ['$event'])
    onClickList(event:Event):void {
        event.preventDefault();
        $(this.el.nativeElement).find('a.active').removeClass('active red darken-4');
        $(event.target).parents('li:first').find('a').addClass('active red darken-4');
    }
}

@Directive({
    selector:'a[materialize-collapse-button]'
})
export class MaterializeCollapseButton implements AfterViewInit {
    constructor(private el:ElementRef) {}
    ngAfterViewInit():void {
        $(this.el.nativeElement).sideNav();
    }
}
