import {Component,ElementRef,Input,Output,EventEmitter} from 'angular2/core';
import {MaterializeSelect} from './materialize-select';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {Control} from 'angular2/common';

@Component({
    selector:'materialize-select-simple',
    template:require('./materialize-select.html')
})
export class SimpleMaterializeSelect extends MaterializeSelect {
    @Input() model:any;
    @Input() options:[{label:string,value:string}];
    @Input() selected:string;
    @Output() selectValueChange: EventEmitter<any> =  new EventEmitter();
    constructor(el: ElementRef) {
        super(el,false);
    }
    ngOnChanges(changes):void {
        let dropDownSelect:any = DOM.querySelector(this.el.nativeElement,'ul.select-dropdown');
        let options:any = $(dropDownSelect).find('li');

        if(this.selectInput && !_.isEmpty(changes.options.currentValue) && _.isEmpty(options)) {
            this.updateValue(this.selected);
            this.selectInput.material_select();
        }
    }
    onChangeValue():void {}
    isSelected(value:string):boolean {
        return value === this.selected;
    }
}
