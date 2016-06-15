import {Component,ElementRef,Input,Output,EventEmitter} from '@angular/core';
import {MaterializeSelect} from './materialize-select';

@Component({
    selector:'materialize-select-simple',
    template:require('./materialize-select.html')
})
export class SimpleMaterializeSelect extends MaterializeSelect {
    @Input() name:string;
    @Input() label:string;
    @Input() model:any;
    @Input() options:[{label:string,value:string}];
    @Input() selected:string;
    @Output('on-change') selectValueChange: EventEmitter<any> =  new EventEmitter();
    constructor(el: ElementRef) {
        super(el,false);
    }
    ngAfterViewInit():void {
        super.ngAfterViewInit();
        this.refresh();
    }
    ngOnChanges(changes):void {
        let dropDownSelect:any = $(this.el.nativeElement).find('ul.select-dropdown');
        let options:any = $(dropDownSelect).find('li');

        if(this.selectInput && !_.isEmpty(changes.options.currentValue) && _.isEmpty(options)) {
            this.updateValue(this.selected);
            this.selectInput.material_select();
        }
    }
    onChangeValue():void {
        console.log(this.selectInput.val());
    }
    isDisabled(option:any){}
    isSelected(option:any):boolean {
        if(option.value === this.selected) {
            return true;
        }
    }
}
