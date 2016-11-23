import {Directive, ElementRef, HostListener, AfterViewInit} from '@angular/core';
import {ThemeableComponent} from '../../app/themeable.component';

@Directive({
    selector: 'ul[materialize-header]'
})
export class MaterializeHeaderDirective extends ThemeableComponent implements AfterViewInit {
    private activeClass: string;
    constructor(private el: ElementRef) {
        super();
        this.activeClass = this.getThemeOption('activeClass');
    }
    ngAfterViewInit(): void {
        if (location.hash.indexOf('home') !== -1) {
            $(this.el.nativeElement).find('#homeLink').addClass('active').addClass(this.activeClass);
            $(this.el.nativeElement).find('#mobileHomeLink').addClass('active').addClass(this.activeClass);
        }
        if (location.hash.indexOf('apis') !== -1) {
            $(this.el.nativeElement).find('#apiLink').addClass('active').addClass(this.activeClass);
            $(this.el.nativeElement).find('#mobileApiLink').addClass('active').addClass(this.activeClass);
        }
        if (location.hash.indexOf('settings') !== -1) {
            $(this.el.nativeElement).find('#settingsLink').addClass('active').addClass(this.activeClass);
            $(this.el.nativeElement).find('#mobileApiLink').addClass('active').addClass(this.activeClass);
        }
    }
    @HostListener('click', ['$event'])
    onClickList(event: Event): void {
        event.preventDefault();
        $(this.el.nativeElement).parent().find('a.active').removeClass('active').removeClass(this.activeClass);
        $(event.target).parents('li:first').find('a').addClass('active').addClass(this.activeClass);
    }
}

@Directive({
    selector: 'a[materialize-collapse-button]'
})
export class MaterializeCollapseButtonDirective implements AfterViewInit {
    constructor(private el: ElementRef) {}
    ngAfterViewInit(): void {
        $(this.el.nativeElement).sideNav();
    }
}
