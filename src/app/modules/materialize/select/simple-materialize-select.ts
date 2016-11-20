import {Component, ElementRef, Input, Output, EventEmitter, AfterViewInit, OnChanges} from '@angular/core';
import {MaterializeSelect} from './materialize-select';

import * as _ from 'lodash';

@Component({
    selector: 'materialize-select-simple',
    template: require('./materialize-select.html')
})
export class SimpleMaterializeSelectComponent extends MaterializeSelect implements AfterViewInit, OnChanges {
    @Input() name: string;
    @Input() label: string;
    @Input() model: any;
    @Input() options: [{label: string, value: string}];
    @Input() selected: string;
    @Output('on-change') selectValueChange:  EventEmitter<any> =  new EventEmitter();
    constructor(el:  ElementRef) {
        super(el, false);
    }
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.refresh();
    }
    ngOnChanges(changes: any): void {
        let dropDownSelect: any = $(this.el.nativeElement).find('ul.select-dropdown');
        let options: any = $(dropDownSelect).find('li');

        if (this.selectInput && !_.isEmpty(changes.options.currentValue) && _.isEmpty(options)) {
            this.updateValue(this.selected);
            this.selectInput.material_select();
        }
    }
    onChangeValue(): void {
        console.log(this.selectInput.val());
    }
    isDisabled(option: any): boolean {
        return null;
    }
    isSelected(option: any): boolean {
        if (option.value === this.selected) {
            return true;
        }
    }
}
