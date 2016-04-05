
import {ElementRef,Input,EventEmitter,Output,AfterViewInit} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

export abstract class MaterializeSelect implements AfterViewInit {
    name:string;
    label:string;
    model:any;
    selectValueChange: EventEmitter<any>;
    protected selectInput:any;
    private multiple:boolean;
    constructor(public el: ElementRef,multiple:boolean = false) {
        this.multiple = multiple;
    }
    ngAfterViewInit():void {
        this.selectInput = $(DOM.querySelector(this.el.nativeElement,'select'));

        let divParent:any = $(DOM.querySelector(this.el.nativeElement,'.input-field'));
        divParent.on('change', 'select', () => {
            this.onChangeValue();
            this.updateValue(this.selectInput.val());
        });
    }
    updateValue(value:string|Array<string>):void {
        this.model.selected = value;
        this.selectValueChange.emit(this.model);
    }
    isSelected(value:string):boolean {
        return false;
    }
    abstract onChangeValue():void;
}
