import { NgModule }       from '@angular/core';
import {ApiDocDetail} from "./detail/detail";
import {ApiDocList} from "./list/list";
import {mainRouting} from "./main.routing";
import {Main} from "./main";
import {SharedModule} from "../shared.module";
import {CommonModule} from "@angular/common";
import {MaterializeModule} from "../materialize/materialize.module";
import {FormsModule} from "@angular/forms";
import {DataTypeLink} from "./data-type/data-type-link";
import {LeftMenu} from "./left-menu/left-menu";
import {SearchFilterPipe, TagFilterPipe, CountPipe} from "../../pipes/pipes";

@NgModule({
    declarations: [ Main, ApiDocDetail, ApiDocList, DataTypeLink, LeftMenu,
                    CountPipe, TagFilterPipe, SearchFilterPipe ],
    imports:      [CommonModule, mainRouting, MaterializeModule, FormsModule, SharedModule],
})
export class MainModule {}