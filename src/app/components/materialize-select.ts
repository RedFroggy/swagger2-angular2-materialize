
import {Component,ElementRef,Input,EventEmitter,Output,AfterViewInit} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

@Component({
    selector:'materialize-select',
    template:require('./materialize-select.html')
})
export class MaterializeSelect implements AfterViewInit {
    @Input() model:any;
    @Input() options:[{label:string,value:string}];
    @Input() multiple:boolean = false;
    @Input() selected:string;
    @Output() selectValueChange: EventEmitter<any> =  new EventEmitter();
    private selectInput:any;
    constructor(private el: ElementRef) {}
    ngAfterViewInit():void {
        this.selectInput = $(DOM.querySelector(this.el.nativeElement,'select'));
        this.selectInput.material_select();

        let divParent:any = $(DOM.querySelector(this.el.nativeElement,'.input-field'));
        divParent.on('change', 'select', () => {
            this.model.selected = this.selectInput.val();
            this.selectValueChange.emit(this.model);
        });
    }
    isSelected(value:string):boolean {
        return value === this.selected;
    }
    ngOnChanges(changes):void {

        let dropDownSelect:any = DOM.querySelector(this.el.nativeElement,'ul.select-dropdown');
        let options:any = $(dropDownSelect).find('li');

        if(this.selectInput && !_.isEmpty(changes.options.currentValue) && _.isEmpty(options)) {
            this.model.selected = this.selected;
            this.selectValueChange.emit(this.model);
            this.selectInput.material_select();
        }
    }
}
