import {Component,ElementRef,Input,Output,EventEmitter} from 'angular2/core';
import {MaterializeSelect} from './materialize-select';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {Control} from 'angular2/common';

/// <reference path="..\..\..\typings\main\ambient\jquery\index.d.ts" />

@Component({
    selector:'materialize-select-multiple',
    template:require('./materialize-select.html')
})
export class MultipleMaterializeSelect extends MaterializeSelect {
    @Input() model:any;
    @Input() options:[{label:string,value:string}];
    @Input() selected:string;
    @Output() selectValueChange: EventEmitter<any> =  new EventEmitter();
    constructor(el: ElementRef) {
        super(el,true);
    }
    ngAfterViewInit():void {
        super.ngAfterViewInit();
        this.selectInput.material_select();
        if(this.selected) {
            setTimeout(() => {
                this.updateValue([this.selected]);
                this.setValue();
            }, 0);
        }
    }
    setValue():void {
        let ul = this.selectInput.prev();
        ul.children('li').toArray().forEach((li, i) => {
            $(li).removeClass('active');
            let value:string = this.selectInput.children('option').toArray()[i].value;
            if(value === this.selected) {
                $(li).addClass('active');
                this.selectInput.val([this.selected]);
                this.selectInput.material_select();
            }
        });
    }
    onChangeValue():void {
        let newValuesArr = [], ul = this.selectInput.prev();
        ul.children('li').toArray().forEach((li, i) => {
            if ($(li).hasClass('active')) {
                newValuesArr.push(this.selectInput.children('option').toArray()[i].value);
            }
        });
        this.selectInput.val(newValuesArr);
    }
}
