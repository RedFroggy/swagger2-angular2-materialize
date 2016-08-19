import { NgModule }       from '@angular/core';
import {ApiDocDetail} from "../detail/detail";
import {ApiDocList} from "../list/list";
import {mainRouting} from "./main.routing";
import {Main} from "./main";
import {SharedModule} from "../../shared.module";

@NgModule({
    declarations: [Main, ApiDocDetail, ApiDocList],
    imports:      [mainRouting, SharedModule],
})
export class MainModule {}