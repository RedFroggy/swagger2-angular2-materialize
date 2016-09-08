import {NgModule} from "@angular/core";
import {MaterializeInputFile} from "./input-file/materialize-input-file";
import {BodyModal} from "./modals/body-modal";
import {ChartModal} from "./modals/chart-modal";
import {TypeModal} from "./modals/type.modal";
import {SimpleMaterializeSelect} from "./select/simple-materialize-select";
import {MultipleMaterializeSelect} from "./select/multiple-materialize-select";
import {SharedModule} from "../shared.module";
import {CommonModule} from "@angular/common";
import {MaterializeCollapsible} from "./directives/materialize-collapsible";
import {MaterializeCollection} from "./directives/materialize-collection";
import {MaterializeHeader, MaterializeCollapseButton} from "./directives/materialize-header";

@NgModule ({
    imports: [CommonModule, SharedModule],
    declarations:   [MaterializeInputFile, BodyModal, ChartModal, TypeModal, SimpleMaterializeSelect, MultipleMaterializeSelect, MaterializeCollapsible, MaterializeCollection, MaterializeHeader, MaterializeCollapseButton],
    exports:        [MaterializeInputFile, BodyModal, ChartModal, TypeModal, SimpleMaterializeSelect, MultipleMaterializeSelect, MaterializeCollapsible, MaterializeCollection, MaterializeHeader, MaterializeCollapseButton],
})
export class MaterializeModule {

}