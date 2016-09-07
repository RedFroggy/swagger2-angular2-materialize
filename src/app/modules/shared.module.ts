import { NgModule }       from '@angular/core';
import {SimpleMaterializeSelect} from "./materialize/select/simple-materialize-select";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BodyModal} from "./materialize/modals/body-modal";
import {MultipleMaterializeSelect} from "./materialize/select/multiple-materialize-select";
import {MaterializeInputFile} from "./materialize/input-file/materialize-input-file";
import {ValuesPipe} from "../pipes/pipes";

@NgModule({
    imports: [CommonModule],
    declarations: [
        ValuesPipe
        // SimpleMaterializeSelect,
        // MultipleMaterializeSelect,
        // MaterializeInputFile,
        // BodyModal,

    ],
    exports: [
        // SimpleMaterializeSelect, MultipleMaterializeSelect, MaterializeInputFile, BodyModal,
        ValuesPipe]
})
export class SharedModule {}