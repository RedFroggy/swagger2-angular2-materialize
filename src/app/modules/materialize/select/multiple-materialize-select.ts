import {Component, ElementRef, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {MaterializeSelect} from './materialize-select';

@Component({
    selector: 'materialize-select-multiple',
    template: require('./materialize-select.html')
})
export class MultipleMaterializeSelectComponent extends MaterializeSelect implements AfterViewInit {
    @Input() name: string;
    @Input() label: string;
    @Input() model: any;
    @Input() options: [{label: string, value: string, selected: boolean, disabled: boolean}];
    @Output('on-change') selectValueChange: EventEmitter<any> =  new EventEmitter();
    @Input() selected: string;
    constructor(el: ElementRef) {
        super(el, true);
    }
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.refresh();
        if (this.selected) {
            setTimeout(() => {
                this.updateValue([this.selected]);
                this.setValue();
            }, 0);
        }
    }
    setValue(): void {
        let ul = this.selectInput.prev();
        ul.children('li').toArray().forEach((li: any, i: number) => {
            $(li).removeClass('active');
            let value: string = this.selectInput.children('option').toArray()[i].value;
            if (value === this.selected) {
                $(li).addClass('active');
                this.selectInput.val([this.selected]);
                this.refresh();
            }
        });
    }
    isSelected(option: any): boolean {
        if (option.selected) {
            return true;
        }
    }
    isDisabled(option: any): boolean {
        if (option.disabled) {
            return true;
        }
    }
    onChangeValue(): void {
        let newValuesArr: any = [], ul = this.selectInput.prev();
        ul.children('li').toArray().forEach((li: any, i: number) => {
            if ($(li).hasClass('active')) {
                newValuesArr.push(this.selectInput.children('option').toArray()[i].value);
            }
        });
        if (newValuesArr.hasOwnProperty('selected')) {
            this.selectValueChange.emit(newValuesArr);
        }
        this.selectInput.val(newValuesArr);
    }
}
