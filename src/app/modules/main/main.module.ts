import { NgModule }       from '@angular/core';
import {ApiDocDetailComponent} from './detail/detail';
import {ApiDocListComponent} from './list/list';
import {mainRouting} from './main.routing';
import {MainComponent} from './main';
import {SharedModule} from '../shared.module';
import {CommonModule} from '@angular/common';
import {MaterializeModule} from '../materialize/materialize.module';
import {FormsModule} from '@angular/forms';
import {DataTypeLinkComponent} from './data-type/data-type-link';
import {LeftMenuComponent} from './left-menu/left-menu';
import {SearchFilterPipe, TagFilterPipe, CountPipe} from '../../pipes/pipes';

@NgModule({
    declarations: [ MainComponent, ApiDocDetailComponent, ApiDocListComponent, DataTypeLinkComponent, LeftMenuComponent,
                    CountPipe, TagFilterPipe, SearchFilterPipe ],
    imports:      [CommonModule, mainRouting, MaterializeModule, FormsModule, SharedModule],
})
export class MainModule {}
