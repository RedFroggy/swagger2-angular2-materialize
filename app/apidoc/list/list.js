var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var pipes_1 = require('../../pipes/pipes');
var apidoc_service_1 = require('../apidoc.service');
var apidoc_1 = require('../../model/apidoc');
var left_menu_1 = require('../left-menu/left-menu');
var api_main_1 = require('../main/api.main');
var apidoc_2 = require('../../model/apidoc');
///<reference path="../../../../../../typings/jquery/jquery.d.ts" />
const TYPE_DEFINITION = '#/definitions/';
let ApiDocList = class {
    constructor(apiDocService, apiMain) {
        this.apiDocService = apiDocService;
        this.apiMain = apiMain;
        this.apiPath = new apidoc_2.PathsObject();
        this.definition = new apidoc_2.DefinitionsObject();
        this.apiDoc = new apidoc_1.ApiDefinition();
        this.apiDocService.selectedApi.subscribe((apiPath) => this.apiPath = apiPath);
        apiDocService.getApi().subscribe((apiDoc) => this.apiDoc = apiDoc);
    }
    hasStats(index) {
        return false;
    }
    onClickParameterType(event, entity) {
        event.preventDefault();
        if (entity) {
            this.definition = this.apiDoc.getDefinitionByEntity(entity);
            console.log(this.definition);
        }
        $('#typeObjectModal').openModal();
    }
    onCloseModal(event) {
        event.preventDefault();
        $('#typeObjectModal').closeModal();
    }
    goToDetailPage(event, operation) {
        event.preventDefault();
        this.apiMain.selectDetailMode(operation);
    }
};
ApiDocList = __decorate([
    core_1.Component({
        selector: 'doc-list',
        templateUrl: './app/apidoc/list/list.html',
        pipes: [pipes_1.ValuesPipe],
        directives: [left_menu_1.LeftMenu]
    }),
    __param(1, core_1.Inject(core_1.forwardRef(() => api_main_1.ApiMain))), 
    __metadata('design:paramtypes', [apidoc_service_1.ApiDocService, api_main_1.ApiMain])
], ApiDocList);
exports.ApiDocList = ApiDocList;
