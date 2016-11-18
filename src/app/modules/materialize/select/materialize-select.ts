
import {ElementRef, EventEmitter, AfterViewInit} from '@angular/core';

export abstract class MaterializeSelect implements AfterViewInit {
    name: string;
    label: string;
    model: any;
    selectValueChange: EventEmitter<any>;
    protected selectInput: any;
    private multiple: boolean;
    constructor(public el: ElementRef, multiple = false) {
        this.multiple = multiple;
    }
    ngAfterViewInit(): void {
        this.selectInput = $(this.el.nativeElement).find('select');

        let divParent: any = $(this.el.nativeElement).find('.input-field');
        divParent.on('change', 'select', () => {
            this.onChangeValue();
            this.updateValue(this.selectInput.val());
        });
    }
    updateValue(value: string|Array<string>): void {
        this.model.selected = value;
        this.selectValueChange.emit(this.model);
    }
    abstract isSelected(option: any): boolean;
    abstract isDisabled(option: any): boolean;
    refresh(): void {
        this.selectInput.material_select();
    }
    abstract onChangeValue(): void;
}
