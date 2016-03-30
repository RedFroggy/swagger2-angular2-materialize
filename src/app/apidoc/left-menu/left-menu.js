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
var pipes_1 = require('../../pipes/pipes');
var api_main_1 = require('../main/api.main');
var LeftMenu = (function () {
    function LeftMenu(apiDocService, apiMain) {
        this.apiDocService = apiDocService;
        this.apiMain = apiMain;
        this.apiDoc = new apidoc_1.ApiDefinition();
    }
    LeftMenu.prototype.ngOnInit = function () {
        var _this = this;
        this.apiDocService.getApi().subscribe(function (apiDoc) {
            _this.apiDoc = apiDoc;
            _this.onSelectApi(null, apiDoc.paths[0]);
        });
    };
    LeftMenu.prototype.onSelectApi = function (event, apiPath) {
        if (event) {
            event.preventDefault();
        }
        this.apiMain.selectListMode(apiPath);
    };
    LeftMenu = __decorate([
        core_1.Component({
            selector: 'left-menu',
            template: require('./left-menu.html'),
            pipes: [pipes_1.ValuesPipe, pipes_1.CountPipe]
        }),
        __param(1, core_1.Inject(core_1.forwardRef(function () { return api_main_1.ApiMain; }))), 
        __metadata('design:paramtypes', [apidoc_service_1.ApiDocService, api_main_1.ApiMain])
    ], LeftMenu);
    return LeftMenu;
})();
exports.LeftMenu = LeftMenu;
//# sourceMappingURL=left-menu.js.map