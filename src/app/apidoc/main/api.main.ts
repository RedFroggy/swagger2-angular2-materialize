import {Component} from 'angular2/core';
import {LeftMenu} from '../left-menu/left-menu';
import {ApiDocList} from '../list/list';
import {ApiDocDetail} from '../detail/detail';
import {ApiDocService} from '../apidoc.service';
import {PathsObject,OperationObject} from '../../model/apidoc';

@Component({
    selector:'doc-main',
    directives:[LeftMenu,ApiDocList,ApiDocDetail],
    template:`
    <div class="row">
        <left-menu></left-menu>
        <div class="col s9">
            <doc-list [hidden]="!listMode"></doc-list>
            <doc-detail [hidden]="listMode"></doc-detail>
        </div>
    </div>`
})
export class ApiMain {
    private listMode:boolean = false;
    constructor(private apiDocService:ApiDocService) {}
    selectListMode(apiPath:PathsObject):void {
        this.listMode = true;
        this.apiDocService.selectApiList(apiPath);
    }
    selectDetailMode(operation:OperationObject):void {
        this.apiDocService.selectDetailApi(operation);
        this.listMode = false;
    }
}
