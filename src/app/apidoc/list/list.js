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
var apidoc_service_1 = require('../apidoc.service');
var apidoc_1 = require('../../model/apidoc');
var left_menu_1 = require('../left-menu/left-menu');
var api_main_1 = require('../main/api.main');
var apidoc_2 = require('../../model/apidoc');
var type_modal_1 = require('../modals/type.modal');
var ApiDocList = (function () {
    function ApiDocList(apiDocService, apiMain) {
        var _this = this;
        this.apiDocService = apiDocService;
        this.apiMain = apiMain;
        this.apiPath = new apidoc_2.PathsObject();
        this.definition = new apidoc_2.DefinitionsObject();
        this.apiDoc = new apidoc_1.ApiDefinition();
        this.apiDocService.selectedApi.subscribe(function (apiPath) { return _this.apiPath = apiPath; });
        apiDocService.getApi().subscribe(function (apiDoc) { return _this.apiDoc = apiDoc; });
    }
    ApiDocList.prototype.hasStats = function (index) {
        return false;
    };
    ApiDocList.prototype.goToDetailPage = function (event, operation) {
        event.preventDefault();
        this.apiMain.selectDetailMode(operation);
    };
    ApiDocList = __decorate([
        core_1.Component({
            selector: 'doc-list',
            template: require('./list.html'),
            directives: [left_menu_1.LeftMenu, type_modal_1.TypeModal]
        }),
        __param(1, core_1.Inject(core_1.forwardRef(function () { return api_main_1.ApiMain; }))), 
        __metadata('design:paramtypes', [apidoc_service_1.ApiDocService, api_main_1.ApiMain])
    ], ApiDocList);
    return ApiDocList;
})();
exports.ApiDocList = ApiDocList;
//# sourceMappingURL=list.js.map