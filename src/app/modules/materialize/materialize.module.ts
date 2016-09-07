import {NgModule} from "@angular/core";
import {MaterializeInputFile} from "./input-file/materialize-input-file";
import {BodyModal} from "./modals/body-modal";
import {ChartModal} from "./modals/chart-modal";
import {TypeModal} from "./modals/type.modal";
// import {MaterializeSelect} from "./select/materialize-select";
import {SimpleMaterializeSelect} from "./select/simple-materialize-select";
import {MultipleMaterializeSelect} from "./select/multiple-materialize-select";
// import {ValuesPipe} from "../../pipes/pipes";
import {SharedModule} from "../shared.module";
import {CommonModule} from "@angular/common";

@NgModule ({
    imports: [CommonModule, SharedModule],
    declarations:   [MaterializeInputFile, BodyModal, ChartModal, TypeModal, SimpleMaterializeSelect, MultipleMaterializeSelect],
    exports:        [MaterializeInputFile, BodyModal, ChartModal, TypeModal, SimpleMaterializeSelect, MultipleMaterializeSelect],
})
export class MaterializeModule {

}