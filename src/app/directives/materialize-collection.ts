import {Directive,ElementRef,HostListener} from '@angular/core';

@Directive({
    selector:'ul[materialize-collection]'
})
export class MaterializeCollection {
    constructor(private el:ElementRef) {}
    @HostListener('click', ['$event'])
    onClickList(event:Event):void {
        $(this.el.nativeElement).find('li.active').removeClass('active');
        $(event.target).parents('li:first').addClass('active');
    }
}
