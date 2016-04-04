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
var apidoc_service_1 = require('../apidoc.service');
var apidoc_1 = require('../../model/apidoc');
var router_1 = require('angular2/router');
var left_menu_1 = require('../left-menu/left-menu');
var apidoc_2 = require('../../model/apidoc');
var type_modal_1 = require('../modals/type.modal');
var ApiDocList = (function () {
    function ApiDocList(apiDocService, router, routeParams) {
        var _this = this;
        this.apiDocService = apiDocService;
        this.router = router;
        this.routeParams = routeParams;
        this.apiPath = new apidoc_2.PathsObject();
        this.definition = new apidoc_2.DefinitionsObject();
        this.apiDoc = new apidoc_1.ApiDefinition();
        apiDocService.getApi().subscribe(function (apiDoc) {
            _this.apiDoc = apiDoc;
            _this.pathId = parseInt(routeParams.get('path'));
            _this.apiPath = apiDoc.paths[_this.pathId - 1];
            if (!_this.apiPath) {
                _this.router.navigate(['ApiDocList', { path: 1 }]);
            }
        });
    }
    ApiDocList.prototype.hasStats = function (index) {
        return false;
    };
    ApiDocList.prototype.goToDetailPage = function (event, index) {
        event.preventDefault();
        this.router.navigate(['ApiDocDetail', { path: this.pathId, operation: index + 1 }]);
    };
    ApiDocList = __decorate([
        core_1.Component({
            selector: 'doc-list',
            template: require('./list.html'),
            directives: [left_menu_1.LeftMenu, type_modal_1.TypeModal]
        }), 
        __metadata('design:paramtypes', [apidoc_service_1.ApiDocService, router_1.Router, router_1.RouteParams])
    ], ApiDocList);
    return ApiDocList;
})();
exports.ApiDocList = ApiDocList;
//# sourceMappingURL=list.js.map