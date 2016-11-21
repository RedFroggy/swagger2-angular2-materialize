import {NgModule} from '@angular/core';
import {MaterializeInputFileComponent} from './input-file/materialize-input-file';
import {BodyModalComponent} from './modals/body-modal';
import {ChartModalComponent} from './modals/chart-modal';
import {TypeModalComponent} from './modals/type.modal';
import {SimpleMaterializeSelectComponent} from './select/simple-materialize-select';
import {MultipleMaterializeSelectComponent} from './select/multiple-materialize-select';
import {SharedModule} from '../shared.module';
import {CommonModule} from '@angular/common';
import {MaterializeCollapsibleDirective} from './directives/materialize-collapsible';
import {MaterializeCollectionDirective} from './directives/materialize-collection';
import {MaterializeHeaderDirective, MaterializeCollapseButtonDirective} from './directives/materialize-header';

@NgModule ({
    imports: [CommonModule, SharedModule],
    declarations:   [MaterializeInputFileComponent, BodyModalComponent, ChartModalComponent,
        TypeModalComponent, SimpleMaterializeSelectComponent,
        MultipleMaterializeSelectComponent, MaterializeCollapsibleDirective,
        MaterializeCollectionDirective, MaterializeHeaderDirective, MaterializeCollapseButtonDirective],
    exports:        [MaterializeInputFileComponent, BodyModalComponent, ChartModalComponent,
        TypeModalComponent, SimpleMaterializeSelectComponent, MultipleMaterializeSelectComponent,
        MaterializeCollapsibleDirective, MaterializeCollectionDirective, MaterializeHeaderDirective, MaterializeCollapseButtonDirective],
})
export class MaterializeModule {

}
