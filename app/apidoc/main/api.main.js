var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var left_menu_1 = require('../left-menu/left-menu');
var list_1 = require('../list/list');
var detail_1 = require('../detail/detail');
var apidoc_service_1 = require('../apidoc.service');
let ApiMain = class {
    constructor(apiDocService) {
        this.apiDocService = apiDocService;
        this.listMode = false;
    }
    selectListMode(apiPath) {
        this.listMode = true;
        this.apiDocService.selectApiList(apiPath);
    }
    selectDetailMode(operation) {
        this.apiDocService.selectDetailApi(operation);
        this.listMode = false;
    }
};
ApiMain = __decorate([
    core_1.Component({
        selector: 'doc-main',
        directives: [left_menu_1.LeftMenu, list_1.ApiDocList, detail_1.ApiDocDetail],
        template: `
    <div class="row">
        <left-menu></left-menu>
        <div class="col s9">
            <doc-list [hidden]="!listMode"></doc-list>
            <doc-detail [hidden]="listMode"></doc-detail>
        </div>
    </div>`
    }), 
    __metadata('design:paramtypes', [apidoc_service_1.ApiDocService])
], ApiMain);
exports.ApiMain = ApiMain;
