import {Directive, AfterViewInit, ElementRef} from '@angular/core';

@Directive({
    selector: 'ul[materialize-collapsible]'
})
export class MaterializeCollapsibleDirective implements AfterViewInit {
    constructor(private el: ElementRef) {}
    ngAfterViewInit(): void {
        setTimeout(() => {
            $(this.el.nativeElement).collapsible({
                accordion : false
            });
        });
    }
}
