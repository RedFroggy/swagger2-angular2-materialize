import { NgModule }       from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValuesPipe } from '../pipes/pipes';

@NgModule({
    imports: [CommonModule],
    declarations: [ValuesPipe],
    exports: [ValuesPipe]
})
export class SharedModule {}
