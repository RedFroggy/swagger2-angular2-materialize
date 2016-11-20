import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'materialize-input-file',
    template: require('./materialize-input-file.html')
})
export class MaterializeInputFileComponent {
    @Input() model: any;
    @Output() changeEmitter: EventEmitter<File> = new EventEmitter<File>();
    onChange(event: any): void {
        let reader: FileReader = new FileReader();
        reader.onloadend = (loadEvent: any) => {
            let file: File = event.target.files[0];
            this.model.selected = {file: file, content: loadEvent.target.result};
            this.changeEmitter.emit(this.model);
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}
